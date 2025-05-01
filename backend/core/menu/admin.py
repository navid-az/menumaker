from django.contrib import admin
from .models import Menu, MenuSection, MenuGlobalStyling, Table, Tag

admin.site.register(Table)
admin.site.register(Tag)
admin.site.register(MenuSection)


class MenuGlobalStylingInline(admin.StackedInline):
    model = MenuGlobalStyling
    can_delete = False


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    inlines = [MenuGlobalStylingInline]
