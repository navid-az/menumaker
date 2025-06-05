from django.contrib import admin
from .models import Menu, MenuGlobalStyling, MenuImage, Table, Tag

admin.site.register(Table)
admin.site.register(Tag)
admin.site.register(MenuImage)


class MenuGlobalStylingInline(admin.StackedInline):
    model = MenuGlobalStyling
    can_delete = False


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    inlines = [MenuGlobalStylingInline]
