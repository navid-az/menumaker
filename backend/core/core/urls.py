from django.contrib import admin
from django.urls import path, include
from django.conf import settings  # new
from django.conf.urls.static import static  # new

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("accounts.urls", namespace="accounts")),
    path("pickers/", include("pickers.urls", namespace="pickers")),
    path("business/", include("business.urls", namespace="business")),
    path("menu/", include("menu.urls", namespace="menu")),
    path("dashboard/", include("dashboard.urls", namespace="dashboard")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
