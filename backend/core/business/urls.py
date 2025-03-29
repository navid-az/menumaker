from django.urls import path
from business.views import (CategoriesView, CategoryCreateView, CategoryUpdateView, CategoryDeleteView,
                            ItemsView, ItemCreateView, ItemUpdateView, ItemDeleteView, BusinessCreateView)
app_name = 'business'

urlpatterns = [
    # register business
    path('create/', BusinessCreateView.as_view(),
         name='register business'),

    # category endpoints
    path('<str:slug>/categories/',
         CategoriesView.as_view(), name='menu-categories'),
    path('<str:slug>/categories/create/',
         CategoryCreateView.as_view(), name='create-category'),
    path('<str:slug>/categories/<int:category_id>/update/',
         CategoryUpdateView.as_view(), name='update-category'),
    path('<str:slug>/categories/<int:category_id>/delete/',
         CategoryDeleteView.as_view(), name='delete-category'),

    # item endpoints
    path('<str:slug>/items/', ItemsView.as_view(), name='menu-items'),
    path('<str:slug>/items/create/',
         ItemCreateView.as_view(), name='create-item'),
    path('<str:slug>/items/<int:item_id>/update/',
         ItemUpdateView.as_view(), name='update-item'),
    path('<str:slug>/items/<int:item_id>/delete/',
         ItemDeleteView.as_view(), name='delete-item'),
]
