from rest_framework import serializers
from .models import Business, Branch, Table, TableSession, Category, Item
from pickers.models import Asset
from django.utils import timezone
from django.utils.text import slugify


# table session serializers
class TableSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableSession
        fields = ['code', 'started_at', 'expires_at', 'is_active']

# table serializers


class TablesSerializer(serializers.ModelSerializer):
    active_session = serializers.SerializerMethodField()

    class Meta:
        model = Table
        fields = '__all__'

    def get_active_session(self, obj):
        session = obj.session.filter(
            is_active=True, expires_at__gt=timezone.now()).first()
        if session:
            return TableSessionSerializer(session).data
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
    # forbids changing business updates
    business = serializers.PrimaryKeyRelatedField(read_only=True)

    # sets them to True by default if not provided
    is_available = serializers.BooleanField(default=True, required=False)
    is_active = serializers.BooleanField(default=True, required=False)

    class Meta:
        model = Item
        fields = '__all__'


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
