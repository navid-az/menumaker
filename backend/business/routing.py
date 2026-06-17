from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(
        r"ws/dashboard/(?P<business_slug>[\w-]+)/(?P<branch_slug>[\w-]+)/$",
        consumers.DashboardConsumer.as_asgi(),
    ),
]
