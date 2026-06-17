from django.urls import path
from .views import MenuView, MenuGlobalStylingView, MenuImageCreateView

app_name = 'menu'

urlpatterns = [
    # Menu endpoints
    path('businesses/<str:business_slug>/menu/',
         MenuView.as_view(), name='business-menu'),
    path('businesses/<str:business_slug>/menu/global-styling/', MenuGlobalStylingView.as_view(),
         name='menu-global-styling'),

    path('menu/images/', MenuImageCreateView.as_view(),
         name='menu-image-create'),
]
