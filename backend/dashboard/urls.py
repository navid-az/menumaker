from django.urls import path
from .views import ItemView

app_name = "dashboard"

urlpatterns = [path("items/", ItemView.as_view(), name="items")]
