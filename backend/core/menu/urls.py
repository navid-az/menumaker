from django.urls import path
from .views import MenuListView, MenuGlobalStylingView, SingleMenuView, SingleMenuItemsView, MenuCategoriesView, MenuCategoryCreateView, MenuCategoryUpdateView, MenuCategoryDeleteView, MenuItemsView, MenuItemCreateView, MenuItemUpdateView, MenuItemDeleteView

app_name = 'menu'

urlpatterns = [
    path('all', MenuListView.as_view(), name='menu-list'),
    path('single/<int:menuId>', SingleMenuView.as_view(), name='single-menu'),
    path('single/items/<int:menuId>',
         SingleMenuItemsView.as_view(), name='menu-items'),
    path('<str:slug>/global-styling/', MenuGlobalStylingView.as_view(),
         name='menu-global-styling'),

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
