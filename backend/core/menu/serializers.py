from rest_framework import serializers
from .models import Menu, Item, ItemCategory, Icon


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


# menu serializers
class MenuSerializer(serializers.ModelSerializer):
    categories = MenuCategoriesSerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = '__all__'
