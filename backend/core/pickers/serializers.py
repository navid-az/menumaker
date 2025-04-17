from rest_framework import serializers
from .models import AssetGroup, Asset


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ["pk", "name", "image"]


class AssetGroupSerializer(serializers.ModelSerializer):
    icons = AssetSerializer(many=True, read_only=True)

    class Meta:
        model = AssetGroup
        fields = ["pk", "name", "icons"]
