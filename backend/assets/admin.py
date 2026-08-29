from django.contrib import admin
from .models import MediaAsset, AssetGroup

admin.site.register(AssetGroup)


@admin.register(MediaAsset)
class MediaAssetAdmin(admin.ModelAdmin):
    sortable_by = ('collection',)
    list_display = ('name', 'collection')
