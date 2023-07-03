import random
from django.contrib.auth import authenticate, login
from django.db.models import Q
from .models import OtpCode, User

# rest dependencies
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SendOptCodeSerializer, CodeSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.
class OtpCodeView(APIView):
    # shows all the otp code stored in db
    def get(self, request):
        codes = OtpCode.objects.all()
        srz_data = SendOptCodeSerializer(instance=codes, many=True)
        return Response(data=srz_data.data)

    def post(self, request):
        srz_data = SendOptCodeSerializer(data=request.data)
        if srz_data.is_valid():
            phone_number = srz_data.data["phone_number"]
            email = srz_data.data["email"]

            # create new otp code with the given email/phone_number
            new_code = random.randint(100000, 999999)
            if phone_number:
                OtpCode.objects.create(
                    phone_number=phone_number,
                    password=new_code,
                )
                return Response(
                    f"The code has been sent to you phone number {srz_data.data}"
                )
            elif email:
                OtpCode.objects.create(
                    email=email,
                    password=new_code,
                )
                return Response(f"The code has been sent to you email {srz_data.data}")
            return Response("unsupported data")
        return Response(srz_data.errors)


# validating the received code
class ValidateOtpCodeView(APIView):
    def post(self, request):
        srz_code = CodeSerializer(data=request.data)

        if srz_code.is_valid():
            # srz_code_email = srz_code.validated_data["email"]
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
                # user.set_password(str(srz_code_code))
                # user = User.objects.get(
                #     Q(phone_number=srz_code_phone_number) | Q(email=srz_code_email),
                # )
                user = authenticate(
                    phone_number=srz_code_phone_number,
                    password=str(srz_code_code),
                )
                if user is not None:
                    login(request, user)
                    OtpCode.objects.get(
                        Q(email=srz_code_email) | Q(phone_number=srz_code_phone_number),
                        password=srz_code_code,
                    ).delete()
                    return Response("user has been authorized")
                else:
                    new_user = User.objects.create_user(
                        phone_number=srz_code_phone_number,
                        email=srz_code_email,
                        full_name="",
                        password=str(srz_code_code),
                    )
                    # user = User.objects.get(
                    #     Q(phone_number=srz_code_phone_number) | Q(email=srz_code_email),
                    # )
                    print("NIGGA" * 50, new_user)
                    refresh = RefreshToken.for_user(new_user)
                    OtpCode.objects.get(
                        Q(email=srz_code_email) | Q(phone_number=srz_code_phone_number),
                        password=srz_code_code,
                    ).delete()
                    return Response(
                        f"'refresh': {str(refresh)}, 'access': {str(refresh.access_token)}"
                    )
            return Response("this is not correct")
        return Response(srz_code.errors)


class TestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response("message:hello this is your mom and u can access this part")
