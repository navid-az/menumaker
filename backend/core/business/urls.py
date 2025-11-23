from django.urls import path
from business.views import BusinessesView, BusinessDetailView, BranchesView, BranchDetailView, TablesView, TableDetailView, CategoriesView, CategoryDetailView, ItemsView, ItemDetailView,  RoleView


app_name = 'business'

urlpatterns = [
    # Business endpoints
    # List & create
    path('', BusinessesView.as_view(),
         name='businesses-list-create'),
    # Detail (retrieve, update, delete)
    path('businesses/<str:business_slug>/',
         BusinessDetailView.as_view(), name='business-detail'),

    # branch endpoints
    path('<str:business_slug>/branches/',
         BranchesView.as_view(), name='business-branches'),
    path('<str:business_slug>/branches/<str:branch_slug>/',
         BranchDetailView.as_view(), name='business-branch-detail'),

    # Table endpoints
    path('<str:business_slug>/branches/<str:branch_slug>/tables/',
         TablesView.as_view(), name='branch-tables'),
    path('<str:business_slug>/branches/<str:branch_slug>/tables/<int:table_id>/',
         TableDetailView.as_view(), name='branch-table-detail'),


    # Needs to change !!!
    # table session endpoints
    #     path('tables/<str:table_code>/check-session/',
    #          CheckTableSessionView.as_view(), name='check-session'),

    #     # Needs to change !!!
    #     # call waiter endpoints
    #     path('table-sessions/<str:session_code>/call-waiter/create/',
    #          CallWaiterCreateView.as_view(), name='call-waiter-create'),
    #     path('table-sessions/<str:session_code>/call-waiter/resolve/',
    #          CallWaiterResolveView.as_view(), name='call-waiter-resolve'),

    # Category endpoints
    path('<str:business_slug>/categories/',
         CategoriesView.as_view(), name='business-categories'),
    path('<str:business_slug>/categories/<int:category_id>/',
         CategoryDetailView.as_view(), name='business-category-detail'),

    # Items API endpoints
    # -------------------
    # Collection endpoint: GET /businesses/<business_slug>/items/
    #   - Returns all items of the business
    #   - Optional query parameters:
    #       ?branch=<branch_slug>   → filter items for a specific branch
    #       ?scope=visible|hidden  → filter items by visibility in the branch
    #   - POST /businesses/<business_slug>/items/ creates a new item
    #
    # Detail endpoint: GET/PATCH/DELETE /businesses/<business_slug>/items/<item_id>/
    #   - GET    → retrieve item details
    #   - PATCH  → update item fields (partial update)
    #   - DELETE → remove item
    #
    # Examples:
    #   GET /businesses/cafe-delight/items/                       → all items
    #   GET /businesses/cafe-delight/items/?branch=main-hall      → items for main-hall
    #   GET /businesses/cafe-delight/items/?branch=main-hall&scope=hidden  → hidden items

    # Item endpoints
    path('<str:business_slug>/items/',
         ItemsView.as_view(), name='business-items'),
    path('<str:business_slug>/items/<int:item_id>/',
         ItemDetailView.as_view(), name='business-item-detail'),

    # Needs to move to personnel app !!!
    # Personnel endpoints
    # Pass branch_slug as query param to filter by branch
    #     path('<str:business_slug>/personnel/',
    #          PersonnelView.as_view(), name='business-personnel'),

    #     path('<str:business_slug>/personnel/<int:personnel_id>/',
    #          PersonnelDetailView.as_view(), name='business-personnel-detail'),

    # Needs to change !!!
    # Needs to move to personnel app !!!
    # get user's role/permissions
    path('<str:slug>/staff/role/',
         RoleView.as_view(), name='staff-role'),
]
