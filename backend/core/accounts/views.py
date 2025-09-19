import random
from django.contrib.auth import authenticate, login, get_user_model

from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenViewBase, TokenRefreshView

# rest dependencies
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
    validateCredentialSerializer,
    CodeSerializer,
    getUserDataSerializer,
)
from .models import OtpCode, User


# Create your views here.
class validateCredentialView(APIView):
    # shows all the otp code stored in db
    # def get(self, request):
    #     codes = OtpCode.objects.all()
    #     srz_data = validateCredentialSerializer(instance=codes, many=True)
    #     return Response(data=srz_data.data)

    def post(self, request):
        srz_data = validateCredentialSerializer(data=request.data)
        if srz_data.is_valid():
            phone_number = srz_data.data["phone_number"]
            email = srz_data.data["email"]

            if phone_number:
                # create new otp code with the given phone_number
                otp_code = OtpCode.objects.filter(phone_number=phone_number)
                user = User.objects.filter(phone_number=phone_number)
                new_code = random.randint(100000, 999999)
                if otp_code.exists():
                    OtpCode.objects.get(phone_number=phone_number).delete()
                    OtpCode.objects.create(
                        phone_number=phone_number, password=new_code)
                    return Response(
                        f"last otp code has been deleted, new otp code has been generated and sended to '{phone_number}'",
                        status.HTTP_201_CREATED,
                    )
                else:
                    OtpCode.objects.create(
                        phone_number=phone_number, password=new_code)
                    return Response(
                        f"user with '{phone_number}' phone number {user.exists()}, new opt code has been generated and sended to '{phone_number}'",
                        status.HTTP_201_CREATED,
                    )
            elif email:
                user = User.objects.filter(email=email)

                if user.exists():
                    return Response(
                        f"user with '{email}' email exists, user should provide password"
                    )
                else:
                    return Response(
                        f"user with '{email}' email doesn't exist, user should create new password"
                    )
            return Response("unsupported credential")
        print(srz_data.errors)
        return Response(srz_data.errors, status.HTTP_400_BAD_REQUEST)


# validating the received code
class ValidateOtpCodeView(APIView):
    def post(self, request):
        srz_code = CodeSerializer(data=request.data)

        if srz_code.is_valid():
            srz_code_email = srz_code.data["email"]
            srz_code_phone_number = srz_code.data["phone_number"]
            srz_code_code = srz_code.data["password"]

            saved_code = OtpCode.objects.filter(
                Q(phone_number=srz_code_phone_number) | Q(email=srz_code_email),
                password=srz_code_code,
            )
            # check if the given code is the same as the one which is store in db
            if saved_code.exists():
                # change user's pass to the new otp code
                old_user = get_object_or_404(
                    User,
                    Q(phone_number=srz_code_phone_number) | Q(
                        email=srz_code_email),
                )
                old_user.set_password(str(srz_code_code))
                old_user.save()
                print("DONE%" * 50, old_user)
                user = authenticate(
                    phone_number=srz_code_phone_number,
                    password=str(srz_code_code),
                )
                if user is not None:
                    login(request, user)
                    refresh = RefreshToken.for_user(old_user)
                    OtpCode.objects.get(
                        Q(email=srz_code_email) | Q(
                            phone_number=srz_code_phone_number),
                        password=srz_code_code,
                    ).delete()
                    return Response(
                        f"'refresh': {str(refresh)}, 'access': {str(refresh.access_token)}"
                    )  # this is for branch jwt-auth
                else:
                    new_user = User.objects.create_user(
                        phone_number=srz_code_phone_number,
                        email=srz_code_email,
                        full_name="",
                        password=str(srz_code_code),
                    )
                    refresh = RefreshToken.for_user(new_user)
                    OtpCode.objects.get(
                        Q(email=srz_code_email) | Q(
                            phone_number=srz_code_phone_number),
                        password=srz_code_code,
                    ).delete()
                    return Response(
                        f"'refresh': {str(refresh)}, 'access': {str(refresh.access_token)}"
                    )
            return Response("this is not correct")
        return Response(srz_code.errors)


# Token pair generator
class CustomTokenObtainPairView(TokenViewBase):
    serializer_class = CustomTokenObtainPairSerializer

# Token refresher


class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer


# gets user data
class getUserDataView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, id):
        user = get_user_model().objects.get(pk=id)
        ser_data = getUserDataSerializer(instance=user)
        return Response(data=ser_data.data)
