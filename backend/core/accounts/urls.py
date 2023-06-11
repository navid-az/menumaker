from django.urls import path
from .views import OtpCodeView

app_name = "api"

urlpatterns = [path("", OtpCodeView.as_view(), name="otp code")]
