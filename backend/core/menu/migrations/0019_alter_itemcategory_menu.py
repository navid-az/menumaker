# Generated by Django 4.2.4 on 2024-06-23 15:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0018_alter_menu_name_en'),
    ]

    operations = [
        migrations.AlterField(
            model_name='itemcategory',
            name='menu',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='categories', to='menu.menu'),
        ),
    ]
