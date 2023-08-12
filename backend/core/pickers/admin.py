from django.contrib import admin
from .models import Icon, IconGroup


@admin.register(IconGroup)
class IconGroupAdmin(admin.ModelAdmin):
    list_display = ("name",)


@admin.register(Icon)
class IconAdmin(admin.ModelAdmin):
    list_display = ("name", "group", "id")
