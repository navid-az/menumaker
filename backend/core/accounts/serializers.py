from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, OtpCode
from personnel.models import Personnel
import jwt
from django.conf import settings

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
    invitation_token = serializers.CharField(required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Remove password field entirely
        if "password" in self.fields:
            self.fields.pop("password")

    def validate(self, attrs):
        phone_number = attrs.get("phone_number")
        invitation_token = attrs.get("invitation_token")
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

        # Validate invitation token if provided
        if invitation_token:
            try:
                # decode JWT
                payload = jwt.decode(
                    invitation_token,
                    settings.SECRET_KEY, algorithms=["HS256"]
                )
            except jwt.ExpiredSignatureError:
                raise ValidationError({"detail": "Invitation link expired"})
            except jwt.InvalidTokenError:
                raise ValidationError({"detail": "Invalid invitation token"})

            # get personnel_id from token payload
            personnel_id = payload.get("personnel_id")
            if not personnel_id:
                raise ValidationError({"detail": "Malformed invitation token"})

            try:
                personnel = Personnel.objects.get(id=personnel_id)
            except Personnel.DoesNotExist:
                raise ValidationError(
                    {"detail": "No personnel found for this token"})

            # attach this user to the personnel and activate it
            if not personnel.user:
                personnel.user = user
                personnel.is_active = True
                personnel.save()

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
