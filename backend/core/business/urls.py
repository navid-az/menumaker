from django.urls import path, re_path
from business.views import (CategoriesView, CategoryCreateView, CategoryUpdateView, CategoryDeleteView,
                            ItemsView, ItemCreateView, ItemUpdateView, ItemDeleteView, BusinessView, BusinessesView, BusinessCreateView,
                            BranchesView, BranchCreateView, BranchUpdateView, BranchDeleteView, TablesView, TableCreateView, TableUpdateView, TableDeleteView, CheckTableSessionView, CallWaiterCreateView, CallWaiterResolveView, RoleView)

from personnel.views import PersonnelUpdateView, PersonnelDeleteView

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

    # call waiter endpoints
    path('table-sessions/<str:session_code>/call-waiter/create/',
         CallWaiterCreateView.as_view(), name='call-waiter-create'),
    path('table-sessions/<str:session_code>/call-waiter/resolve/',
         CallWaiterResolveView.as_view(), name='call-waiter-resolve'),

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
    # Items endpoint has 3 variants depending on query params:
    # 1. /business/{slug}/items/ → all items (ignores branches)
    # 2. /business/{slug}/items/visible/?branch_slug=foo → visible items for branch foo
    # 3. /business/{slug}/items/hidden/?branch_slug=foo → hidden items for branch foo
    path('<str:slug>/items/', ItemsView.as_view(), name='items-all'),
    re_path(r"^(?P<slug>[^/]+)/items/(?P<scope>hidden|visible)/$",
            ItemsView.as_view(), name="items-scoped"),


    path('<str:slug>/items/create/',
         ItemCreateView.as_view(), name='create-item'),
    path('<str:slug>/items/<int:item_id>/update/',
         ItemUpdateView.as_view(), name='update-item'),
    path('<str:slug>/items/<int:item_id>/delete/',
         ItemDeleteView.as_view(), name='delete-item'),

    # Personnel
    path('<str:slug>/personnel/<int:personnel_id>/update/',
         PersonnelUpdateView.as_view(), name='update-personnel'),
    path('<str:slug>/personnel/<int:personnel_id>/delete/',
         PersonnelDeleteView.as_view(), name='update-personnel'),

    # get user's role/permissions
    path('<str:slug>/staff/role/',
         RoleView.as_view(), name='staff-role'),
]
