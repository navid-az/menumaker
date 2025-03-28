from rest_framework import serializers
from business.models import Item


class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        exclude = ["image"]
