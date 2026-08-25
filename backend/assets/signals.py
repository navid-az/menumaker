from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import MediaAsset


@receiver(post_delete, sender=MediaAsset)
def delete_file_on_asset_delete(sender, instance, **kwargs):
    """
    Removes the physical file whenever a MediaAsset row is deleted, whether
    deleted directly, via a queryset .delete(), or via cascade from a parent
    Menu/Item being deleted (enabled by the GenericRelation on those models).
    """
    if instance.file:
        instance.file.delete(save=False)
