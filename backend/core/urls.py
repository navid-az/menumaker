from django.contrib import admin
from django.urls import path, include
from django.conf import settings  # new
from django.conf.urls.static import static  # new

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/accounts/", include("accounts.urls", namespace="accounts")),
    path("api/pickers/", include("pickers.urls", namespace="pickers")),
    path("api/", include("business.urls", namespace="business")),
    path("api/", include("menu.urls", namespace="menu")),
    path("api/personnel/", include("personnel.urls", namespace="personnel")),
    path("api/subscriptions/",
         include("subscriptions.urls", namespace="subscriptions")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
