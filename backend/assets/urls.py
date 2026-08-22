from django.urls import path
from .views import MediaAssetView, MediaAssetDetailView

app_name = 'assets'

urlpatterns = [
    path("asset/", MediaAssetView.as_view(), name="media-list"),
    path("asset/<int:pk>/", MediaAssetDetailView.as_view(), name="media-detail"),
]
