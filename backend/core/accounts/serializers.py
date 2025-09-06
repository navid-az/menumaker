from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers, exceptions
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

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
    phone_number = serializers.CharField(required=False)
    otp = serializers.CharField(required=False, write_only=True)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(required=False, write_only=True)

    def validate(self, attrs):
        phone_number = attrs.get("phone_number")
        otp = attrs.get("otp")
        email = attrs.get("email")
        password = attrs.get("password")

        user = None

        # Case 1: phone + otp
        if phone_number:
            if not otp:
                raise exceptions.AuthenticationFailed(
                    "OTP is required with phone number")
            try:
                user = User.objects.get(phone_number=phone_number)
            except User.DoesNotExist:
                raise exceptions.AuthenticationFailed(
                    "No user found with this phone number")

            # TODO: Replace with your actual OTP verification logic
            if otp != "795527":
                raise exceptions.AuthenticationFailed("Invalid OTP")

        # Case 2: email + password
        elif email:
            if not password:
                raise exceptions.AuthenticationFailed(
                    "Password is required with email")
            user = authenticate(email=email, password=password)
            if not user:
                raise exceptions.AuthenticationFailed(
                    "Invalid email or password")

        else:
            raise exceptions.AuthenticationFailed(
                "Either phone_number or email is required")

        if not user.is_active:
            raise exceptions.AuthenticationFailed("User account is disabled")

        # Generate tokens
        refresh = self.get_token(user)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        permissions = []
        # Owner businesses
        for business in user.businesses.all():  # assuming FK on Business
            permissions.append({
                "business": business.slug,
                "isOwner": True,
            })

        # Personnel businesses
        for personnel in user.assignments.all():
            permissions.append({
                "business": personnel.business.slug,
                "isOwner": False,
                "branches": [b.slug for b in personnel.branches.all()]
            })

        token["permissions"] = permissions

        return token


# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     phone_number = serializers.CharField(
#         max_length=11, required=False, default=None)
#     email = serializers.EmailField(required=False, default=None)
#     otp = serializers.IntegerField(required=False, default=None)
#     password = serializers.IntegerField(required=False, default=None)

#     def get_token(cls, user):
#         token = super().get_token(user)
#         token['businesses'] = [b.slug for b in user.businesses.all()]
#         token['branches'] = [b.id for b in user.businesses.branches.all()]
#         return token

#     def validate(self, data):
#         if data["email"] and data["phone_number"]:
#             raise serializers.ValidationError(
#                 "specifying both email and phone_number is not allowed"
#             )
#         elif not data["email"] and not data["phone_number"]:
#             raise serializers.ValidationError(
#                 "specifying a phone_number or an email is a must"
#             )
#         elif data["phone_number"] and not data["otp"]:
#             raise serializers.ValidationError(
#                 "otp is required for phone_number")
#         elif data["email"] and not data["password"]:
#             raise serializers.ValidationError("password is required for email")
#         return data


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
