from rest_framework import serializers
from .models import Business, Branch, Table, TableSession, CallWaiter, Category, Item, ItemBranch
from pickers.models import Asset
from django.utils import timezone
from django.utils.text import slugify


# table session serializers
class TableSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableSession
        fields = ['code', 'started_at', 'expires_at', 'is_active']


# call waiter serializers
class CallWaiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallWaiter
        fields = ['resolved', 'created_at', 'expires_at']


# table serializers
class TablesSerializer(serializers.ModelSerializer):
    active_session = serializers.SerializerMethodField()
    active_call = serializers.SerializerMethodField()

    class Meta:
        model = Table
        fields = '__all__'

    def get_active_session(self, obj):
        session = obj.session.filter(
            is_active=True, expires_at__gt=timezone.now()).first()
        if session:
            return TableSessionSerializer(session).data
        return None

    def get_active_call(self, obj):
        session = obj.session.filter(
            is_active=True,
            expires_at__gt=timezone.now()
        ).first()
        if not session:
            return None

        call = session.waiter_calls.filter(
            resolved=False,
            expires_at__gt=timezone.now()
        ).first()
        if call:
            return CallWaiterSerializer(call).data
        return None


class TableCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        exclude = ['branch', 'created', 'updated']


# branch serializers
class BranchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'


class BranchCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        exclude = ['business']


# business serializers
class BusinessesSerializer(serializers.ModelSerializer):
    branches = BranchesSerializer(many=True, read_only=True)

    class Meta:
        model = Business
        fields = '__all__'


class BusinessCreateSerializer(serializers.ModelSerializer):
    branches = BranchesSerializer(many=True, read_only=True)

    class Meta:
        model = Business
        fields = ['name', 'name_en', 'slug',
                  'service_type', 'primary_service_type', 'branch_structure', 'branches']

    def validate(self, data):
        # Generate the slug from the English name
        slug = slugify(data['name_en'])

        # Check if a Business with this slug already exists
        if Business.objects.filter(slug=slug).exists():
            raise serializers.ValidationError(
                {"slug": "A business with this slug already exists."})

        # Add the slug to the validated data
        data['slug'] = slug
        return data

    def create(self, validated_data):
        return super().create(validated_data)


# item serializers
class ItemsSerializer(serializers.ModelSerializer):
    business = serializers.SlugRelatedField(slug_field='slug', read_only=True)

    class Meta:
        model = Item
        fields = '__all__'


class ItemCreateUpdateSerializer(serializers.ModelSerializer):
    # needed for making exceptional items(only for a branch OR for all branches EXCEPT branch with the given branch_slug)
    scope = serializers.ChoiceField(
        choices=['all', 'except', 'only'], write_only=True, required=False, default='all')
    branch_slug = serializers.CharField(write_only=True, required=False)

    # forbids changing business updates
    business = serializers.PrimaryKeyRelatedField(read_only=True)

    # sets them to True by default if not provided
    is_available = serializers.BooleanField(default=True, required=False)
    is_active = serializers.BooleanField(default=True, required=False)

    class Meta:
        model = Item
        fields = ['business', 'category', 'name', 'description',
                  'image', 'price', 'is_available', 'is_active', 'scope', 'branch_slug']

    def validate(self, attrs):
        scope = attrs.get('scope', 'all')
        branch_slug = attrs.get('branch_slug')

        if scope in ['only', 'except'] and not branch_slug:
            raise serializers.ValidationError({
                "branch_slug": "This field is required when scope is 'only' or 'except'."
            })

        return attrs

    def create(self, validated_data):
        scope = validated_data.pop('scope', 'all')
        branch_slug = validated_data.pop('branch_slug', None)

        # Always create Item
        item = Item.objects.create(**validated_data)

        # Handle branch-specific scope
        if scope in ['only', 'except']:
            try:
                branch = Branch.objects.get(slug=branch_slug)
                if scope == 'only':
                    ItemBranch.objects.create(
                        item=item, branch=branch, is_available=True, is_active=True)
                elif scope == 'except':
                    ItemBranch.objects.create(
                        item=item, branch=branch, is_available=False, is_active=False)
            except Branch.DoesNotExist:
                raise serializers.ValidationError(
                    {"branch_slug": "Branch not found."})
        return item

        # def validate(self, data):
        #     scope = data.get('scope')
        #     branch_slug = data.get('branch_slug')
        #     business = data.get('business')
        #     if scope in ['except', 'only'] and not branch_slug:
        #         raise serializers.ValidationError(
        #             "branch_slug is required for scope 'except' or 'only'.")
        #     if branch_slug:
        #         try:
        #             branch = Branch.objects.get(
        #                 business=9, slug=branch_slug)
        #             data['current_branch'] = branch
        #         except Branch.DoesNotExist:
        #             raise serializers.ValidationError(
        #                 "Invalid branch_slug or branch does not belong to the business.")
        #     return data


class IconsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ['id', 'name', 'image']


# category serializers
class CategoriesSerializer(serializers.ModelSerializer):
    business = serializers.SlugRelatedField(slug_field='slug', read_only=True)
    items = ItemsSerializer(many=True, read_only=True)
    icon = IconsSerializer(read_only=True)

    class Meta:
        model = Category
        fields = '__all__'


class CategoryCreateUpdateSerializer(serializers.ModelSerializer):
    # forbids changing business updates
    business = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Category
        fields = '__all__'
