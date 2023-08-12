from django.urls import path
from .views import IconPickerView

app_name = "pickers"

urlpatterns = [path("icon-pickers", IconPickerView.as_view(), name="icon-pickers")]
