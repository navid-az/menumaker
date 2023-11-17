from django.urls import path
from .views import MenuView, SingleMenuView, SingleMenuItemsView

app_name = 'menu'

urlpatterns = [
    path('all', MenuView.as_view(), name='menu-page'),
    path('single/<int:menuId>', SingleMenuView.as_view(), name='single-menu'),
    path('single/items/<int:menuId>', SingleMenuItemsView.as_view(), name='menu-items'),
]
