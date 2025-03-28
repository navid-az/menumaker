# Generated by Django 4.2.4 on 2025-02-28 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0012_remove_menu_branch_count_remove_menu_is_active_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='business',
            old_name='locations',
            new_name='branches',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='search_item_is_active',
            new_name='call_waiter_enabled',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='item_page_type',
            new_name='items_page_layout',
        ),
        migrations.RenameField(
            model_name='menu',
            old_name='waiter_request_is_active',
            new_name='searchbar_enabled',
        ),
        migrations.AddField(
            model_name='menu',
            name='show_branches',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='menu',
            name='show_phone_numbers',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='menu',
            name='show_social_links',
            field=models.BooleanField(default=False),
        ),
    ]
