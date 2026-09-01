# businesses/services.py
from django.contrib.contenttypes.models import ContentType
from django.core.files.base import ContentFile

from .models import Business, Branch, Table, TableSession, Category, Item, CallWaiter
from personnel.models import Personnel
from business.models import generate_unique_code
from assets.models import MediaAsset, MediaCollection
import random


def _clone_media_assets(source_obj, target_obj, collection):
    """
    Copies every MediaAsset attached to source_obj (for a given collection)
    into new, independent MediaAsset rows attached to target_obj.

    A new MediaAsset + a physically copied file (not a shared reference) is
    used deliberately: MediaAsset's post_delete signal deletes the underlying
    file from disk, so if the clone's asset pointed at the same file as the
    template's, deleting the demo business's item later would delete the
    template's image out from under it too.
    """
    target_ct = ContentType.objects.get_for_model(target_obj)
    source_assets = source_obj.media_assets.filter(
        collection=collection).order_by("order")

    for source_asset in source_assets:
        cloned = MediaAsset(
            name=source_asset.name,
            media_type=source_asset.media_type,
            collection=collection,
            content_type=target_ct,
            object_id=target_obj.pk,
            order=source_asset.order,
            # uploaded_by intentionally left null - this file wasn't
            # uploaded by any real user, it's a system-generated clone.
        )
        # Physically copies the file content into a new file on disk under
        # a fresh generated filename (media_upload_path handles that), so
        # the clone owns an independent file rather than referencing the
        # template's original.
        source_asset.file.open("rb")
        cloned.file.save(
            source_asset.file.name.split("/")[-1],
            ContentFile(source_asset.file.read()),
            save=True,
        )
        source_asset.file.close()


def clone_demo_business_data(new_business):
    template = Business.objects.get(is_template=True)

    for branch in template.branches.all():
        new_branch = Branch.objects.create(
            business=new_business,
            name=branch.name,
            address=branch.address,
            phone_number=branch.phone_number
        )
        for table in branch.tables.all():
            new_table = Table.objects.create(
                branch=new_branch,
                name=table.name,
                code=generate_unique_code(),
                seats=table.seats,
            )
            # Create table_session and waiter calls to make it feel real
            # 60% chance this table has an active session
            if random.random() < 0.6:

                table_session = TableSession.objects.create(
                    table=new_table,
                    code=generate_unique_code(),
                )

                # ~35% chance this table has an active waiter call
                if random.random() < 0.35:
                    CallWaiter.objects.create(
                        table_session=table_session,
                    )

    # Categories -> Items
    for category in template.categories.all():
        new_category = Category.objects.create(
            business=new_business,
            name=category.name,
            icon=category.icon,  # FK reference is fine here - MediaAsset for
            # category icons isn't deleted when a
            # Category is (on_delete=SET_NULL), so
            # sharing the same icon row across many
            # categories is safe and intentional.
        )
        for item in category.items.all():
            new_item = Item.objects.create(
                business=new_business,
                category=new_category,
                name=item.name,
                description=item.description,
                price=item.price,
                image=item.image,
                is_available=item.is_available,
                is_active=item.is_active,
            )
            _clone_media_assets(item, new_item, MediaCollection.ITEM_GALLERY)

    # Personnel — display fields only, no linked real User accounts
    # for staff in template.personnel.all():
    #     Personnel.objects.create(
    #         business=new_business,
    #         name=staff.name,
    #         role=staff.role,
    #     )
