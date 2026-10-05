from django.contrib import admin
from .models import (Business, Branch, Table, TableSession, CallWaiter,
                     Category, Item, ItemBranch, ItemOption, ItemOptionChoice, Order, OrderItem, Payment)

admin.site.register(Branch)
admin.site.register(Table)
admin.site.register(TableSession)
admin.site.register(Payment)
admin.site.register(CallWaiter)
admin.site.register(Category)
admin.site.register(Item)
admin.site.register(ItemBranch)
admin.site.register(ItemOption)
admin.site.register(ItemOptionChoice)
admin.site.register(Order)
admin.site.register(OrderItem)


@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['name_en']}
