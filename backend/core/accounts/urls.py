from django.urls import path
from .views import OtpCodeView, ValidateOtpCodeView, TestView

# JWT dependencies
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


app_name = "api"

urlpatterns = [
    path("", OtpCodeView.as_view(), name="otp code"),
    path("validate-code", ValidateOtpCodeView.as_view(), name="validate otp code"),
    path("test", TestView.as_view(), name="test"),
    # JWT paths
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

# {
#     "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4ODQ2NDUwOCwiaWF0IjoxNjg4Mzc4MTA4LCJqdGkiOiJiNTYxNjcxZjE0ZWU0MzIxOWUxY2U5YzBjMWYyOWEyMiIsInVzZXJfaWQiOjEzfQ.lAQzc0upRTMV8n_Chcz3JwoOWYF82-Q9oWmOJg8Qhwo",
#     "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4Mzc4NzA4LCJpYXQiOjE2ODgzNzgxMDgsImp0aSI6IjZkNDgyYTM0YjRlZTQwN2ViYjAyMmNmZjNiY2FmNTliIiwidXNlcl9pZCI6MTN9.3XBI-94GTe18vQiIcNrbAYyTFcJvFu0e0yysZUMkXR4"
# }
