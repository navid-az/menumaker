from django.urls import path
from .views import RoleAssignView

app_name = 'personnel'

urlpatterns = [
    path('assign/user/<int:user_id>/to/<str:business_slug>/',
         RoleAssignView.as_view(), name='assign-role')
]
