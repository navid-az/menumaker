# Generated by Django 4.2.4 on 2023-10-09 08:31

import colorfield.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0006_tag_itemcategory_icon_itemcategory_name_item'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='background',
            field=colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=None),
        ),
        migrations.AddField(
            model_name='tag',
            name='text_color',
            field=colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=None),
        ),
    ]
