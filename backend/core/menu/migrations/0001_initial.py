# Generated by Django 4.2.4 on 2023-10-09 15:11

import colorfield.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pickers', '0002_alter_icon_group'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
                ('icon', models.ImageField(upload_to='')),
                ('text_color', colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=None)),
                ('background', colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=None)),
            ],
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('primary_color', colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=None)),
                ('secondary_color', colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=None)),
                ('tertiary_color', colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=None)),
                ('bg_color', colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=None)),
                ('is_active', models.BooleanField(default=True)),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ItemCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=20, null=True)),
                ('text_color', colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=None)),
                ('child_bg', colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=None)),
                ('parent_bg', colorfield.fields.ColorField(default='#FFFFFF', image_field=None, max_length=25, samples=None)),
                ('is_active', models.BooleanField(default=True)),
                ('icon', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='pickers.icon')),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.menu')),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=110)),
                ('description', models.TextField(blank=True, max_length=300, null=True)),
                ('price', models.PositiveIntegerField()),
                ('is_available', models.BooleanField(default=True)),
                ('is_active', models.BooleanField(default=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.itemcategory')),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.menu')),
            ],
        ),
    ]