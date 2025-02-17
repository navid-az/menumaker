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
    business = serializers.SerializerMethodField()
    category = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = Item
        fields = '__all__'
        extra_fields = ['business']

    def get_business(self, obj):
        return obj.menu.business.slug


class MenuItemCreateUpdateSerializer(serializers.ModelSerializer):
    business = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = '__all__'
        extra_fields = ['business']

    def get_business(self, obj):
        return obj.menu.business.slug


# category serializers
class MenuCategoriesSerializer(serializers.ModelSerializer):

    business = serializers.SerializerMethodField()
    items = MenuItemsSerializer(many=True, read_only=True)
    icon = IconsSerializer(read_only=True)

    class Meta:
        model = ItemCategory
        fields = '__all__'
        extra_fields = ['business']

    def get_business(self, obj):
        return obj.menu.business.slug


class MenuCategoryCreateUpdateSerializer(serializers.ModelSerializer):
    business = serializers.SerializerMethodField()

    class Meta:
        model = ItemCategory
        fields = '__all__'
        extra_fields = ['business']

    def get_business(self, obj):
        return obj.menu.business.slug


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
