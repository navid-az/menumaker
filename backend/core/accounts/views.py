from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import OtpCode, User
from .serializers import SendOptCodeSerializer, CodeSerializer
import random


# Create your views here.
class OtpCodeView(APIView):
    def get(self, request):
        codes = OtpCode.objects.all()
        srz_data = SendOptCodeSerializer(instance=codes, many=True)
        return Response(data=srz_data.data)

    def post(self, request):
        srz_data = SendOptCodeSerializer(data=request.data)
        srz_code = CodeSerializer(data=request.data)
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
                return Response(
                    f"The code has been sent to you phone number {srz_data.data}"
                )
            return Response("unsupported data")

        # validating the received code
        elif CodeSerializer.is_valid():
            saved_code = OtpCode.objects.filter(
                phone_number=srz_code.data["code"], code=srz_code.data["code"]
            )
            user = User.objects.filter(phone_number=srz_code.data["phone_number"])
            if saved_code.exists():
                if user.exists():
                    authenticate(phone_number=srz_code.data[phone_number], password="")
                    return Response("you are now in!")
                else:
                    return Response("this user is not in the db(should sign up)")
        else:
            return Response("received data is not valid")
