from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import OtpCode, User
from .serializers import SendOptCodeSerializer
import random


# Create your views here.
class OtpCodeView(APIView):
    def get(self, request):
        codes = OtpCode.objects.all()
        srz_data = SendOptCodeSerializer(instance=codes, many=True)
        return Response(data=srz_data.data)

    def post(self, request):
        srz_data = SendOptCodeSerializer(data=request.POST)
        if srz_data.is_valid():
            phone_number = srz_data.data["phone_number"]
            email = srz_data.data["email"]
            new_code = random.randint(100000, 999999)
            if phone_number:
                OtpCode.objects.create(
                    phone_number=phone_number,
                    code=new_code,
                )
            elif email:
                OtpCode.objects.create(
                    fadfa
                    email=email,
                    code=new_code,
                )
            return Response(f"The code has been sent to you phone number")
        else:
            return Response("received data is not valid")
