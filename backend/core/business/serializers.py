from rest_framework import serializers
from django.utils import timezone
from django.utils.text import slugify

from .models import Business, Branch, Table, TableSession, CallWaiter, Reservation, Category, Item, ItemBranch
from pickers.models import Asset
from personnel.models import Personnel

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


class TableAvailabilityCheckSerializer(serializers.Serializer):
    branch_slug = serializers.CharField(max_length=100)
    start_dt = serializers.DateTimeField()
    party_size = serializers.IntegerField(
        min_value=1, max_value=50)
    duration = serializers.IntegerField(
        min_value=30, max_value=480)

    def validate_start_dt(self, value):
        if value < timezone.now():
            raise serializers.ValidationError(
                "Cannot check availability for past times.")
        return value


class AvailableTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['id', 'name', 'seats']


# reservation serializers
class ReservationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'


class ReservationCreateUpdateSerializer(serializers.ModelSerializer):
    table = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Reservation
        exclude = ['confirmation_code', 'reservation_end']


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
class ItemBranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemBranch
        fields = ["branch", "is_active", "is_available"]


class ItemsSerializer(serializers.ModelSerializer):
    business = serializers.SlugRelatedField(slug_field='slug', read_only=True)
    branch_exceptions = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = '__all__'

    # return item branches if available
    def get_branch_exceptions(self, obj):
        # Retrieve branch_slug from context
        branch_slug = self.context.get("branch_slug")
        if branch_slug:
            try:
                item_branch = ItemBranch.objects.get(
                    branch__slug=branch_slug, item=obj.pk)
                return ItemBranchSerializer(item_branch).data
            except ItemBranch.DoesNotExist:
                return None
        return None


class ItemCreateUpdateSerializer(serializers.ModelSerializer):
    # needed for making exceptional items
    # for all branches (default)
    # ONLY for the branch with the given branch_slug
    # ALL branches EXCEPT branch with the given branch_slug

    # note: if branch_slug isn't provided, we assume item is being created globally (scope='all')
    scope = serializers.ChoiceField(
        choices=['all', 'except', 'only'], write_only=True, required=False, default='all')
    branch_slug = serializers.CharField(write_only=True, required=False)

    # forbids changing business updates
    business = serializers.PrimaryKeyRelatedField(read_only=True)

    is_active = serializers.BooleanField(default=True, required=False)
    is_available = serializers.BooleanField(default=True, required=False)

    class Meta:
        model = Item
        fields = ['business', 'category', 'name', 'description',
                  'image', 'price', 'scope', 'branch_slug', 'is_available', 'is_active']

    def validate(self, attrs):
        scope = attrs.get('scope', 'all')
        branch_slug = attrs.get('branch_slug')

        # validate scope and branch_slug (branch_slug is not needed when scope is not provided or 'all')
        if scope in ['only', 'except'] and not branch_slug:
            raise serializers.ValidationError({
                "branch_slug": "This field is required when scope is 'only' or 'except'."
            })

        return attrs

    def create(self, validated_data):
        scope = validated_data.pop('scope', 'all')
        branch_slug = validated_data.pop('branch_slug', None)

        # Handle branch-specific scope
        if scope not in ['only', 'except']:
            item = Item.objects.create(
                **validated_data)
        else:
            try:
                branch = Branch.objects.get(slug=branch_slug)
                validated_data.pop('is_available')
                validated_data.pop('is_active')
                if scope == 'only':
                    item = Item.objects.create(
                        **validated_data, is_available=False, is_active=False)
                    ItemBranch.objects.create(
                        item=item, branch=branch, is_available=True, is_active=True)
                elif scope == 'except':
                    item = Item.objects.create(
                        **validated_data, is_available=True, is_active=True)
                    ItemBranch.objects.create(
                        item=item, branch=branch, is_available=False, is_active=False)
            except Branch.DoesNotExist:
                raise serializers.ValidationError(
                    {"branch_slug": "Branch not found."})
        return item


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


# return user's role and permissions
class RoleSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source="role.name")
    permissions = serializers.SerializerMethodField()

    class Meta:
        model = Personnel
        fields = ['user', 'role', 'business', 'branches', 'permissions']

    def get_permissions(self, obj):
        return list(
            obj.role.permissions.values_list("codename", flat=True)
        )
