from rest_framework import serializers


class SendOptCodeSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=11, required=False, default="")
    email = serializers.EmailField(min_length=11, required=False, default="")


class CodeSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=11, required=False, default="")
    email = serializers.EmailField(min_length=11, required=False, default="")
    password = serializers.IntegerField()
