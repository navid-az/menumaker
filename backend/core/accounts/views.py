import secrets
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone
from datetime import timedelta

from django.conf import settings
from .models import Otp, User
from rest_framework_simplejwt.views import TokenRefreshView

# rest dependencies
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    CustomTokenRefreshSerializer,
    validateCredentialSerializer,
    CodeSerializer,
    getUserDataSerializer,
)

# kavenegar API
from kavenegar import *


# Receive phone_number, generate OTP, send OTP to user
class ValidateCredentialView(APIView):
    def post(self, request):
        srz_data = validateCredentialSerializer(data=request.data)
        if srz_data.is_valid():
            phone_number = srz_data.validated_data["phone_number"]

            cooldown = timedelta(minutes=2)

            latest_otp = Otp.objects.filter(
                phone_number=phone_number).order_by('-created_at').first()

            if latest_otp:
                remaining: timedelta = (latest_otp.created_at + cooldown -
                                        timezone.now()).total_seconds()

                if remaining > 0:
                    return Response(
                        {
                            "detail": "Please wait before requesting another code",
                            "retry_after": int(remaining),
                        },
                        status=status.HTTP_429_TOO_MANY_REQUESTS
                    )

                # Delete previous otp instance if exists
                latest_otp.delete()

            # create new otp code with the given phone_number
            random_code = secrets.randbelow(900000) + 100000
            hashed_code = make_password(str(random_code))

            Otp.objects.create(
                phone_number=phone_number, hashed_otp=hashed_code)

            # Send OTP to receptor
            if not settings.DEBUG:
                try:
                    api = KavenegarAPI(settings.KAVENEGAR_API_KEY)
                    params = {
                        'receptor': settings.DUMMY_PHONE_NUMBER if settings.DEBUG else phone_number,
                        'template': 'verifycode',
                        'token': random_code,
                        'type': 'sms',
                    }
                    response = api.verify_lookup(params)
                    print(response)
                except APIException as e:
                    return Response('API OTP send failed')
                except HTTPException as e:
                    return Response('HTTP request failed')

            print('random_code: ', random_code)

            return Response({
                "detail": "Verification code sent",
                "retry_after": int(cooldown.total_seconds())
            }, status=status.HTTP_200_OK)
        return Response(srz_data.errors, status.HTTP_400_BAD_REQUEST)


# Validate OTP
class ValidateOtpView(APIView):
    def post(self, request):
        serializer = CodeSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        phone_number = serializer.validated_data["phone_number"]
        otp_code = serializer.validated_data["otp"]

        otp_obj = Otp.objects.filter(phone_number=phone_number).first()

        # unified failure response (prevents enumeration)
        def invalid():
            return Response(
                {"detail": "Invalid or expired verification code."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not otp_obj:
            return invalid()

        # expiration check
        if otp_obj.expires_at < timezone.now():
            otp_obj.delete()
            return invalid()

        # check OTP hash
        if not check_password(str(otp_code), otp_obj.hashed_otp):
            return invalid()

        # OTP is valid → delete immediately
        otp_obj.delete()

        # get or create user
        user, created = User.objects.get_or_create(
            phone_number=phone_number,
        )

        if created:
            user.set_unusable_password()
            user.save()

        # issue JWT
        refresh = RefreshToken.for_user(user)

        access = refresh.access_token

        # Attach user roles to access token
        access['roles'] = user.get_user_roles()

        return Response(
            {
                "refresh": str(refresh),
                "access": str(access),
            },
            status=status.HTTP_200_OK
        )


# Token refresher
class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer

# ~Deprecated~
# Token pair generator
# class CustomTokenObtainPairView(TokenViewBase):
#     serializer_class = CustomTokenObtainPairSerializer


# gets user data
class getUserDataView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, id):
        user = get_user_model().objects.get(pk=id)
        ser_data = getUserDataSerializer(instance=user)
        return Response(data=ser_data.data)
