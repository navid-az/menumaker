from django.shortcuts import render
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import OtpCode, User
from .serializers import SendOptCodeSerializer, CodeSerializer
import random
from django.db.models import Q


# Create your views here.
class OtpCodeView(APIView):
    def get(self, request):
        codes = OtpCode.objects.all()
        srz_data = SendOptCodeSerializer(instance=codes, many=True)
        return Response(data=srz_data.data)

    def post(self, request):
        srz_data = SendOptCodeSerializer(data=request.data)
        if srz_data.is_valid():
            print(srz_data.data, "$" * 50)
            phone_number = srz_data.data["phone_number"]
            email = srz_data.data["email"]

            # create new otp code with the given email/phone_number
            new_code = random.randint(100000, 999999)
            if phone_number:
                OtpCode.objects.create(
                    phone_number=phone_number,
                    code=new_code,
                )
                return Response(
                    f"The code has been sent to you phone number {srz_data.data}"
                )
            elif email:
                OtpCode.objects.create(
                    email=email,
                    code=new_code,
                )
                return Response(f"The code has been sent to you email {srz_data.data}")
            return Response("unsupported data")
        return Response(srz_data.errors)


# validating the received code
class ValidateOtpCodeView(APIView):
    def post(self, request):
        srz_code = CodeSerializer(data=request.data)

        if srz_code.is_valid():
            srz_code_email = srz_code.data["email"]
            # srz_code_email = srz_code.validated_data["email"]
            srz_code_phone_number = srz_code.data["phone_number"]

            saved_code = OtpCode.objects.filter(
                Q(phone_number=srz_code_phone_number) | Q(email=srz_code_email),
                code=srz_code.data["code"],
            )
            if saved_code.exists():
                new_user = authenticate(
                    phone_number=srz_code_phone_number,
                    password="",
                )
                if new_user is not None:
                    login(request, new_user)
                    OtpCode.objects.get(
                        Q(email=srz_code_email) | Q(phone_number=srz_code_phone_number),
                        code=srz_code.data["code"],
                    ).delete()
                    return Response("user has been authorized")
                else:
                    User.objects.create_user(
                        phone_number=srz_code_phone_number,
                        email=srz_code_email,
                        full_name="",
                        password="",
                    )
                    OtpCode.objects.get(
                        Q(email=srz_code_email) | Q(phone_number=srz_code_phone_number),
                        code=srz_code.data["code"],
                    ).delete()
                    return Response("The new user has been created")
        return Response(srz_code.errors)
