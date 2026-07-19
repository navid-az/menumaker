from django.urls import path
from .views import ValidateCredentialView, ValidateOtpView, getUserDataView, CustomTokenRefreshView, DemoUserView


# JWT dependencies
from rest_framework_simplejwt.views import TokenVerifyView


app_name = "accounts"

urlpatterns = [
    path(
        "validate-credential/",
        ValidateCredentialView.as_view(),
        name="validate_credential",
    ),
    path("validate-code", ValidateOtpView.as_view(), name="validate otp code"),
    path("user/demo/", DemoUserView.as_view(), name='demo-user'),
    path("user/<int:id>", getUserDataView.as_view(), name="user-data"),

    # JWT paths
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),

    # ~Deprecated~
    # Use validate-code and validate-credential instead
    # path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
]
