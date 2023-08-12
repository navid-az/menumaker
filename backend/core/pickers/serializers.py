from rest_framework import serializers
from .models import Icon, IconGroup


class IconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Icon
        fields = ["pk", "name", "image"]


class IconGroupSerializer(serializers.ModelSerializer):
    icons = IconSerializer(many=True, read_only=True)

    class Meta:
        model = IconGroup
        fields = ["pk", "name", "icons"]
