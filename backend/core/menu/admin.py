from django.contrib import admin
from .models import Menu, MenuGlobalStyling, Table, Tag

admin.site.register(Table)
admin.site.register(Tag)


class MenuGlobalStylingInline(admin.StackedInline):
    model = MenuGlobalStyling
    can_delete = False


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    inlines = [MenuGlobalStylingInline]
