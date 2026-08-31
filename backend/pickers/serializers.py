from rest_framework import serializers
from .models import AssetGroup, Asset


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = '__all__'


class AssetGroupSerializer(serializers.ModelSerializer):
    assets = AssetSerializer(many=True, read_only=True)

    class Meta:
        model = AssetGroup
        fields = '__all__'
