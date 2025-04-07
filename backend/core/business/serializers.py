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
    class Meta:
        model = Item
        fields = '__all__'


class ItemCreateUpdateSerializer(serializers.ModelSerializer):
    # forbids changing business updates
    business = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Item
        fields = '__all__'


class IconsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Icon
        fields = ['name', 'image']


# category serializers
class CategoriesSerializer(serializers.ModelSerializer):
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
