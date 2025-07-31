from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import OtpCode, User


class validateCredentialSerializer(serializers.Serializer):
    phone_number = serializers.CharField(
        max_length=11, required=False, default=None)
    email = serializers.EmailField(required=False, default=None)

    def validate(self, data):
        if data["email"] and data["phone_number"]:
            raise serializers.ValidationError(
                "specifying both email and phone_number is not allowed"
            )
        elif not data["email"] and not data["phone_number"]:
            raise serializers.ValidationError(
                "specifying a phone_number or an email is a must"
            )
        return data


class CodeSerializer(serializers.Serializer):
    phone_number = serializers.CharField(
        max_length=11, required=False, default="")
    email = serializers.EmailField(min_length=11, required=False, default="")
    password = serializers.IntegerField()


class CustomTokenObtainPairSerializer(serializers.Serializer):
    phone_number = serializers.CharField(
        max_length=11, required=False, default=None)
    email = serializers.EmailField(required=False, default=None)
    otp = serializers.IntegerField(required=False, default=None)
    password = serializers.IntegerField(required=False, default=None)

    def validate(self, data):
        if data["email"] and data["phone_number"]:
            raise serializers.ValidationError(
                "specifying both email and phone_number is not allowed"
            )
        elif not data["email"] and not data["phone_number"]:
            raise serializers.ValidationError(
                "specifying a phone_number or an email is a must"
            )
        elif data["phone_number"] and not data["otp"]:
            raise serializers.ValidationError(
                "otp is required for phone_number")
        elif data["email"] and not data["password"]:
            raise serializers.ValidationError("password is required for email")
        return data


class CheckUserCredentialSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=11, required=False)
    email = serializers.EmailField(required=False, default=None)

    def validate(self, data):
        if data["email"] and data["phone_number"]:
            raise serializers.ValidationError(
                "specifying both email and phone_number is not allowed"
            )
        elif not data["email"] and not data["phone_number"]:
            raise serializers.ValidationError(
                "specifying a phone_number or an email is a must"
            )
        return data


class getUserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["pk", "phone_number", "email"]
