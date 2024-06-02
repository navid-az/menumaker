from django.urls import path
from .views import DeleteItemView, MenuView, SingleMenuView, SingleMenuItemsView, MenuItemsView, CreateItemView, UpdateItemView

app_name = 'menu'

urlpatterns = [
    path('all', MenuView.as_view(), name='menu-page'),
    path('single/<int:menuId>', SingleMenuView.as_view(), name='single-menu'),
    path('single/items/<int:menuId>',
         SingleMenuItemsView.as_view(), name='menu-items'),

    # new endpoints
    path('<str:slug>/items/', MenuItemsView.as_view(), name='menu-items'),
    path('<str:slug>/items/create/',
         CreateItemView.as_view(), name='create-item'),
    path('<str:slug>/items/<int:item_id>/update/',
         UpdateItemView.as_view(), name='update-item'),
    path('<str:slug>/items/<int:item_id>/delete/',
         DeleteItemView.as_view(), name='delete-item'),

]
