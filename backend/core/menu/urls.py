from django.urls import path
from .views import MenuView, SingleMenuView, SingleMenuItemsView, MenuCategoriesView, MenuItemsView, MenuItemCreateView, MenuItemUpdateView, MenuItemDeleteView
# , CreateCategoryView, UpdateCategoryView, DeleteCategoryView,
app_name = 'menu'

urlpatterns = [
    path('all', MenuView.as_view(), name='menu-page'),
    path('single/<int:menuId>', SingleMenuView.as_view(), name='single-menu'),
    path('single/items/<int:menuId>',
         SingleMenuItemsView.as_view(), name='menu-items'),

    # category endpoints
    path('<str:slug>/categories/',
         MenuCategoriesView.as_view(), name='menu-categories'),
    #     path('<str:slug>/categories/create/',
    #          CreateCategoryView.as_view(), name='create-category'),
    #     path('<str:slug>/categories/<int:item_id>/update/',
    #          UpdateCategoryView.as_view(), name='update-category'),
    #     path('<str:slug>/categories/<int:item_id>/delete/',
    #          DeleteCategoryView.as_view(), name='delete-category'),

    # item endpoints
    path('<str:slug>/items/', MenuItemsView.as_view(), name='menu-items'),
    path('<str:slug>/items/create/',
         MenuItemCreateView.as_view(), name='create-item'),
    path('<str:slug>/items/<int:item_id>/update/',
         MenuItemUpdateView.as_view(), name='update-item'),
    path('<str:slug>/items/<int:item_id>/delete/',
         MenuItemDeleteView.as_view(), name='delete-item'),

]
