from django.urls import path
from .views import PlanView, SubscriptionView, SubscriptionCreateView

app_name = 'subscriptions'

urlpatterns = [
    path('plans/', PlanView.as_view(), name='plans'),
    path('business/<slug:business_slug>/subscription/',
         SubscriptionView.as_view(), name='subscription'),
    path('business/<slug:business_slug>/subscribe/',
         SubscriptionCreateView.as_view(), name='create-subscription'),
]
