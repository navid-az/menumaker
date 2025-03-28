from django.urls import path
from business.views import (MenuCategoriesView, MenuCategoryCreateView, MenuCategoryUpdateView, MenuCategoryDeleteView,
                            MenuItemsView, MenuItemCreateView, MenuItemUpdateView, MenuItemDeleteView, RegisterBusinessView)
app_name = 'business'

urlpatterns = [
    # register business
    path('create/', RegisterBusinessView.as_view(),
         name='register business'),

    # category endpoints
    path('<str:slug>/categories/',
         MenuCategoriesView.as_view(), name='menu-categories'),
    path('<str:slug>/categories/create/',
         MenuCategoryCreateView.as_view(), name='create-category'),
    path('<str:slug>/categories/<int:category_id>/update/',
         MenuCategoryUpdateView.as_view(), name='update-category'),
    path('<str:slug>/categories/<int:category_id>/delete/',
         MenuCategoryDeleteView.as_view(), name='delete-category'),

    # item endpoints
    path('<str:slug>/items/', MenuItemsView.as_view(), name='menu-items'),
    path('<str:slug>/items/create/',
         MenuItemCreateView.as_view(), name='create-item'),
    path('<str:slug>/items/<int:item_id>/update/',
         MenuItemUpdateView.as_view(), name='update-item'),
    path('<str:slug>/items/<int:item_id>/delete/',
         MenuItemDeleteView.as_view(), name='delete-item'),
]
