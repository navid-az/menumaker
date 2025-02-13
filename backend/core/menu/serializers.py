from rest_framework import serializers
from .models import Business, Menu, MenuGlobalStyling, Item, ItemCategory, Icon
from django.utils.text import slugify
from django.db import transaction


class IconsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Icon
        fields = ['name', 'image']


# item serializers
class MenuItemsSerializer(serializers.ModelSerializer):
    menu = serializers.StringRelatedField(read_only=True)
    category = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = Item
        fields = '__all__'


class MenuItemCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


# category serializers
class MenuCategoriesSerializer(serializers.ModelSerializer):
    menu = serializers.StringRelatedField(read_only=True)
    items = MenuItemsSerializer(many=True, read_only=True)
    icon = IconsSerializer(read_only=True)

    class Meta:
        model = ItemCategory
        fields = '__all__'


class MenuCategoryCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCategory
        fields = '__all__'


# menu serializers
class MenuListSerializer(serializers.ModelSerializer):
    categories = MenuCategoriesSerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = '__all__'


class MenuGlobalStylingSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuGlobalStyling
        fields = '__all__'


# business serializers
class BusinessCreateSerializer(serializers.ModelSerializer):  # checked
    class Meta:
        model = Business
        fields = ['name', 'name_en', 'slug',
                  'service_type', 'primary_service_type']

    def create(self, validated_data):
        validated_data['slug'] = slugify(validated_data['name_en'])
        return super().create(validated_data)
