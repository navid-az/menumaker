from django.contrib import admin
from .models import Business, Branch, Table, Category, Item

admin.site.register(Branch)
admin.site.register(Table)
admin.site.register(Category)
admin.site.register(Item)


@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['name_en']}
