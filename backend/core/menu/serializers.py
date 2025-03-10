from .models import Business, Menu, MenuGlobalStyling, Item, ItemCategory, Icon
from django.utils.text import slugify
from django.db import transaction
from rest_framework import serializers


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
    CLICK_ANIMATION_CHOICES = [
        ('ripple', 'ripple effect'), ('tactile', 'tactile effect')]

    click_animation_type = serializers.MultipleChoiceField(
        choices=CLICK_ANIMATION_CHOICES, allow_null=True)

    class Meta:
        model = MenuGlobalStyling
        fields = '__all__'


class MenuCreateSerializer(serializers.ModelSerializer):
    global_styling = MenuGlobalStylingSerializer(write_only=True)

    class Meta:
        model = Menu
        fields = '__all__'

    def create(self, validated_data):
        global_style_data = validated_data.pop('global_styling', {})

        with transaction.atomic():
            menu = Menu.objects.create(**validated_data)
            if global_style_data:
                MenuGlobalStyling.objects.create(
                    menu=menu, **global_style_data)
        return menu


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
