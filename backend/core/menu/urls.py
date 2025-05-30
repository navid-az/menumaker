from django.urls import path
from .views import MenuListView, MenuView, MenuCreateView, MenuGlobalStylingView

app_name = 'menu'

urlpatterns = [
    # general menu endpoints
    path('all', MenuListView.as_view(), name='menu-list'),
    path('<str:slug>/', MenuView.as_view(), name='menu'),
    path('<str:slug>/global-styling/', MenuGlobalStylingView.as_view(),
         name='menu-global-styling'),

    # create menu
    path('create/<slug:slug>/', MenuCreateView.as_view(), name='menu-create')
]
