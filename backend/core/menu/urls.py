from django.urls import path
from .views import MenuView

app_name = 'menu'

urlpatterns = [
    path('<int:menu_id>/', MenuView.as_view(), name='menu-page')
]
