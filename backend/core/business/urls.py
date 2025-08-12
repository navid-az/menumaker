from django.urls import path
from business.views import (CategoriesView, CategoryCreateView, CategoryUpdateView, CategoryDeleteView,
                            ItemsView, ItemCreateView, ItemUpdateView, ItemDeleteView, BusinessView, BusinessesView, BusinessCreateView,
                            BranchesView, BranchCreateView, BranchUpdateView, BranchDeleteView, TablesView, TableCreateView, TableUpdateView, TableDeleteView, CheckTableSessionView)
app_name = 'business'

urlpatterns = [
    # business endpoints
    path('<str:slug>/detail/', BusinessView.as_view(), name='business-detail'),
    path('<int:id>/businesses', BusinessesView.as_view(),
         name="businesses"),
    path('create/', BusinessCreateView.as_view(),
         name='register-business'),

    # branch endpoints
    path('<str:slug>/branches/', BranchesView.as_view(), name='business-branches'),
    path('<str:slug>/branches/create/',
         BranchCreateView.as_view(), name='create-branch'),
    path('<str:slug>/branches/<int:branch_id>/update/',
         BranchUpdateView.as_view(), name='update-branch'),
    path('<str:slug>/branches/<int:branch_id>/delete/',
         BranchDeleteView.as_view(), name='delete-branch'),

    # table endpoints
    path('<str:branch_slug>/tables/', TablesView.as_view(), name='branch-tables'),
    path('<str:branch_slug>/tables/create/',
         TableCreateView.as_view(), name='create-table'),
    path('<str:branch_slug>/tables/<int:table_id>/update/',
         TableUpdateView.as_view(), name='update-table'),
    path('<str:branch_slug>/tables/<int:table_id>/delete/',
         TableDeleteView.as_view(), name='delete-table'),

    # table session endpoints
    path('tables/<str:table_code>/check-session/',
         CheckTableSessionView.as_view(), name='check-session'),

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
