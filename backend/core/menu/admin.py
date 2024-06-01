from django.contrib import admin
from .models import Menu, Table, ItemCategory, Item, Tag

admin.site.register(Table)
admin.site.register(ItemCategory)
admin.site.register(Item)
admin.site.register(Tag)


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['name_en']}
