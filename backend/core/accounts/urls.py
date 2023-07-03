from django.urls import path
from .views import OtpCodeView, ValidateOtpCodeView

app_name = "api"

urlpatterns = [
    path("", OtpCodeView.as_view(), name="otp code"),
    path("validate-code", ValidateOtpCodeView.as_view(), name="validate otp code"),
]
