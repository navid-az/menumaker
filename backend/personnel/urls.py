from django.urls import path
from .views import PersonnelAssignView, PersonnelUpdateView, PersonnelDeleteView

app_name = 'personnel'

urlpatterns = [
    path('business/<str:slug>/personnel/assign/',
         PersonnelAssignView.as_view(), name='assign-personnel'),
    #     path('business/personnel/<int:personnel_id>/update/',
    #          PersonnelUpdateView.as_view(), name='update-personnel'),
    #     path('business/personnel/<int:personnel_id>/delete/',
    #          PersonnelDeleteView.as_view(), name='delete-personnel'),
]
