from rest_framework import serializers
from .models import Business, Category, Item
from pickers.models import Icon
from django.utils.text import slugify


# business serializers
class BusinessCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ['name', 'name_en', 'slug',
                  'service_type', 'primary_service_type']

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
    business = serializers.SerializerMethodField()
    category = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = Item
        fields = '__all__'
        extra_fields = ['business']

    def get_business(self, obj):
        return obj.menu.business.slug


class ItemCreateUpdateSerializer(serializers.ModelSerializer):
    business = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = '__all__'
        extra_fields = ['business']

    def get_business(self, obj):
        return obj.menu.business.slug


class IconsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Icon
        fields = ['name', 'image']


# category serializers
class CategoriesSerializer(serializers.ModelSerializer):

    business = serializers.SerializerMethodField()
    items = ItemsSerializer(many=True, read_only=True)
    icon = IconsSerializer(read_only=True)

    class Meta:
        model = Category
        fields = '__all__'
        extra_fields = ['business']

    def get_business(self, obj):
        return obj.menu.business.slug


class CategoryCreateUpdateSerializer(serializers.ModelSerializer):
    business = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'
        extra_fields = ['business']

    def get_business(self, obj):
        return obj.menu.business.slug
