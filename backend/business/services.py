# businesses/services.py
from .models import Business, Branch, Table, TableSession, Category, Item, CallWaiter
from personnel.models import Personnel
from business.models import generate_unique_code
import random


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
            icon=category.icon,
        )
        for item in category.items.all():
            Item.objects.create(
                business=new_business,
                category=new_category,
                name=item.name,
                description=item.description,
                price=item.price,
                image=item.image,
                is_available=item.is_available,
                is_active=item.is_active,
            )

    # Personnel — display fields only, no linked real User accounts
    # for staff in template.personnel.all():
    #     Personnel.objects.create(
    #         business=new_business,
    #         name=staff.name,
    #         role=staff.role,
    #     )
