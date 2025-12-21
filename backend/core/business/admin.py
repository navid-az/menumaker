from django.contrib import admin
from .models import Business, Branch, Table, TableSession, CallWaiter, Reservation, Category, Item, ItemBranch

admin.site.register(Branch)
admin.site.register(Table)
admin.site.register(TableSession)
admin.site.register(Reservation)
admin.site.register(CallWaiter)
admin.site.register(Category)
admin.site.register(Item)
admin.site.register(ItemBranch)


@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['name_en']}
