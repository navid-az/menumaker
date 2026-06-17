from django.contrib import admin
from .models import AssetGroup, Asset


@admin.register(AssetGroup)
class IconGroupAdmin(admin.ModelAdmin):
    list_display = ("name",)


@admin.register(Asset)
class IconAdmin(admin.ModelAdmin):
    list_display = ("name", "group", "id")
