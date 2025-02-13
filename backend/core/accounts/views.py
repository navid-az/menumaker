import random
from django.contrib.auth import authenticate, login, get_user_model

from django.db.models import Q
from django.shortcuts import get_object_or_404

# rest dependencies
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
from rest_framework import status
# from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    CustomTokenObtainPairSerializer,
    validateCredentialSerializer,
    CodeSerializer,
    getUserDataSerializer,
    getUserPlacesSerializer
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


# jwt token generator
class CustomTokenObtainPairView(APIView):
    def post(self, request):
        ser_data = CustomTokenObtainPairSerializer(data=request.data)
        if ser_data.is_valid():
            phone_number = ser_data.data["phone_number"]
            email = ser_data.data["email"]
            ser_otp = ser_data.data["otp"]
            password = ser_data.data["password"]

            if phone_number:  # phone_number auth
                otp = OtpCode.objects.get(phone_number=phone_number)

                if ser_otp == otp.password:
                    user = User.objects.filter(
                        phone_number=phone_number).first()
                    if user is not None:
                        refresh = RefreshToken.for_user(user)
                    else:
                        new_user = User.objects.create_user(
                            phone_number=phone_number,
                            email=email,
                            password="123456",
                            full_name="",
                        )
                        refresh = RefreshToken.for_user(new_user)
                    otp.delete()
                    return Response(
                        {
                            "refresh": str(refresh),
                            "access": str(refresh.access_token),
                        }
                    )
                return Response(
                    "the given otp is not correct", status.HTTP_400_BAD_REQUEST
                )
            else:  # email auth (~~~NEED ATTENTION~~~)
                user, created = get_user_model().objects.get_or_create(
                    email=email, password=password
                )
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                    }
                )
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


# gets user data
class getUserDataView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, id):
        user = get_user_model().objects.get(pk=id)
        ser_data = getUserDataSerializer(instance=user)
        return Response(data=ser_data.data)


class getUserPlacesView(APIView):
    def get(self, request, id):
        user = get_user_model().objects.get(pk=id)
        owned_places = user.businesses.all()
        # places = user.places.all()
        # all_places = owned_places.union(places)
        ser_data = getUserPlacesSerializer(instance=owned_places, many=True)
        return Response(data=ser_data.data)
