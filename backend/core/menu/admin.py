from django.contrib import admin
from .models import Business, Menu, MenuGlobalStyling, Table, ItemCategory, Item, Tag

admin.site.register(Table)
admin.site.register(ItemCategory)
admin.site.register(Item)
admin.site.register(Tag)


class MenuGlobalStylingInline(admin.StackedInline):
    model = MenuGlobalStyling
    can_delete = False


@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['name_en']}


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    inlines = [MenuGlobalStylingInline]
