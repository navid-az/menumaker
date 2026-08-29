from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.fields import GenericRelation
from django.conf import settings

import uuid

User = settings.AUTH_USER_MODEL


def media_upload_path(instance, filename):
    # Namespace by collection so /media stays organized, and randomize the
    # name so uploads never collide.
    return f"uploads/{instance.collection}/{uuid.uuid4().hex}_{filename}"


class MediaCollection(models.TextChoices):
    ITEM_GALLERY = "item_gallery", "Item Gallery"
    MENU_WELCOME = "menu_welcome", "Menu Welcome Page"
    MENU_BANNER = "menu_banner", "Item Page Banner"  # not built yet, wired up already
    ICON_PACK = "icon_pack", "Icon Pack"
    PATTERN_PACK = "pattern_pack", "Pattern Pack"


class MediaType(models.TextChoices):
    IMAGE = "image", "Image"
    VIDEO = "video", "Video"


# How many assets a single parent object may hold per collection.
# NOTE: Add an entry here whenever a new gallery type is introduced.
MEDIA_COLLECTION_LIMITS = {
    MediaCollection.ITEM_GALLERY: 6,
    MediaCollection.MENU_WELCOME: 8,
    MediaCollection.MENU_BANNER: 5,
    MediaCollection.ICON_PACK: 50,
    MediaCollection.PATTERN_PACK: 30,
}


class MediaAsset(models.Model):
    """
    Generic media asset, uploadable before its parent object exists.

    We use `GenericForeignKey` for easier management
    """

    file = models.FileField(upload_to=media_upload_path)
    media_type = models.CharField(
        max_length=10, choices=MediaType.choices, default=MediaType.IMAGE)
    collection = models.CharField(
        max_length=20, choices=MediaCollection.choices)

    # Generic link to the owning object (Menu, Item, ...)
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey("content_type", "object_id")

    # Groups files uploaded during the same not-yet-submitted form session.
    temp_id = models.CharField(
        max_length=36, null=True, blank=True, db_index=True)

    # reserved for future drag-reorder (not implemented yet)
    order = models.PositiveIntegerField(default=0)

    uploaded_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True
    )

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "created"]
        indexes = [models.Index(
            fields=["content_type", "object_id", "collection"])]

    def __str__(self):
        return f"{self.collection} ({self.pk})"

    # Check if asset has been attached to any model or not
    @property
    def is_attached(self):
        return self.object_id is not None


def attach_media_assets(parent_instance, temp_id, collection):
    """
    Claims all pending MediaAssets matching temp_id + collection for
    parent_instance, capped at that collection's configured limit.

    Call this from the parent's serializer.create(), after the parent
    already has a pk.
    """

    if not collection:
        print('collection was not provided')
        return

    if not temp_id:
        print('temp_id was not provided')
        return

    limit = MEDIA_COLLECTION_LIMITS.get(collection)
    pending_ids = list(
        MediaAsset.objects
        .filter(temp_id=temp_id, collection=collection, object_id__isnull=True)
        .order_by("created")
        .values_list("id", flat=True)
    )
    if limit is not None:
        pending_ids = pending_ids[:limit]

    content_type = ContentType.objects.get_for_model(parent_instance)
    MediaAsset.objects.filter(id__in=pending_ids).update(
        content_type=content_type, object_id=parent_instance.pk, temp_id=None
    )


class AssetGroupKind(models.TextChoices):
    ICON = "icon", "Icon"
    PATTERN = "pattern", "Pattern"


class AssetGroup(models.Model):
    """
    A named collection of picker assets - either icons or patterns
    """
    name = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    kind = models.CharField(max_length=10, choices=AssetGroupKind.choices)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE,
        null=True, blank=True, related_name="asset_groups"
    )

    assets = GenericRelation(MediaAsset)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "kind"], condition=models.Q(created_by__isnull=True),
                name="unique_system_asset_group_name_per_kind",
            )
        ]

    def __str__(self):
        return f"{self.name} ({self.kind})"
