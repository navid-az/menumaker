from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, OtpCode

User = get_user_model()


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


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "phone_number"
    phone_number = serializers.CharField()
    otp = serializers.CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Remove password field entirely
        if "password" in self.fields:
            self.fields.pop("password")

    def validate(self, attrs):
        phone_number = attrs.get("phone_number")
        otp = attrs.get("otp")

        # Fetch OTP from DB
        try:
            saved_otp = OtpCode.objects.get(phone_number=phone_number)
        except OtpCode.DoesNotExist:
            raise serializers.ValidationError("OTP not found")

        # Compare OTPs
        if str(otp) != str(saved_otp.password):
            raise serializers.ValidationError("Invalid OTP")

        # Fetch or create user
        user = User.objects.filter(phone_number=phone_number).first()
        if not user:
            user = User.objects.create_user(phone_number=phone_number)
            user.set_unusable_password()
            user.save()

        # Generate tokens
        refresh = RefreshToken.for_user(user)

        permissions = []
        for business in user.businesses.all():
            permissions.append({"business": business.slug, "isOwner": True})
        for personnel in user.assignments.all():
            permissions.append({
                "business": personnel.business.slug,
                "isOwner": False,
                "branches": [b.slug for b in personnel.branches.all()]
            })
        refresh["permissions"] = permissions
        saved_otp.delete()

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


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
