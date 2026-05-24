from django.urls import path
from .views import PlanView, PlanDetailView, SubscriptionView, SubscriptionCreateView, SubscriptionOrderView, SubscriptionOrderVerifyView

app_name = 'subscriptions'

urlpatterns = [
    path('orders/', SubscriptionOrderView.as_view(), name='subscription-orders'),
    path('orders/verify/', SubscriptionOrderVerifyView.as_view(),
         name='verify-subscription-order'),
    path('plans/', PlanView.as_view(), name='plans'),
    path('plans/<str:plan_slug>', PlanDetailView.as_view(), name='plan-detail'),
    path('business/<slug:business_slug>/subscription/',
         SubscriptionView.as_view(), name='subscription'),
    path('business/<slug:business_slug>/subscribe/',
         SubscriptionCreateView.as_view(), name='create-subscription'),
]
