from django.urls import path
from .views import CreateSubscriptionView

app_name = 'subscriptions'

urlpatterns = [
    path('business/<slug:business_slug>/subscribe/',
         CreateSubscriptionView.as_view(), name='create-subscription'),
]
