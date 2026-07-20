# businesses/services.py
from .models import Business, Branch, Table, Category, Item
from personnel.models import Personnel
from business.models import generate_unique_code


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
            Table.objects.create(
                branch=new_branch,
                name=table.name,
                code=generate_unique_code(),
                seats=table.seats,
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
