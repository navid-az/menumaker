from django.contrib import admin
from .models import Business, ItemCategory, Item

admin.site.register(ItemCategory)
admin.site.register(Item)


@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['name_en']}
