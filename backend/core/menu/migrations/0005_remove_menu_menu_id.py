# Generated by Django 4.2.4 on 2025-01-30 08:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0004_alter_menuglobalstyling_created'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='menu',
            name='menu_id',
        ),
    ]
