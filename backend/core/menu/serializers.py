from dataclasses import fields
from rest_framework import serializers
from .models import Menu, Item, ItemCategory


class ItemSerializer(serializers.ModelSerializer):
    menu = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Item
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)

    class Meta:
        model = ItemCategory
        fields = '__all__'


class MenuSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = '__all__'


class MenuItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        exclude = ["image"]


class CreateItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class UpdateItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
