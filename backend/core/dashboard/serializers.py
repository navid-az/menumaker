from rest_framework import serializers
from menu.models import Item


class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        exclude = ["image"]
