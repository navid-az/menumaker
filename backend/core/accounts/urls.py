from django.urls import path
from .views import validateCredentialView, ValidateOtpCodeView, CustomTokenObtainPairView, CustomTokenRefreshView, getUserDataView


# JWT dependencies
from rest_framework_simplejwt.views import TokenVerifyView


app_name = "accounts"

urlpatterns = [
    path(
        "validate-credential/",
        validateCredentialView.as_view(),
        name="validate_credential",
    ),
    path("validate-code", ValidateOtpCodeView.as_view(), name="validate otp code"),
    path("user/<int:id>",
         getUserDataView.as_view(), name="user-data"),

    # JWT paths
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify')
]
