from django.urls import path
from .views import SubscriptionView, SubscriptionCreateView

app_name = 'subscriptions'

urlpatterns = [
    path('business/<slug:business_slug>/subscription/',
         SubscriptionView.as_view(), name='subscription'),
    path('business/<slug:business_slug>/subscribe/',
         SubscriptionCreateView.as_view(), name='create-subscription'),
]
