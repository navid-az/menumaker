from django.contrib import admin
from .models import Business, Branch, Category, Item

admin.site.register(Branch)
admin.site.register(Category)
admin.site.register(Item)


@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['name_en']}
