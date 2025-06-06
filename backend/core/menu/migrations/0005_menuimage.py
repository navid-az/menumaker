# Generated by Django 5.2 on 2025-06-05 14:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0004_menu_home_subtitle_menu_home_title'),
    ]

    operations = [
        migrations.CreateModel(
            name='MenuImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('home', 'home'), ('items', 'items')], default='full', max_length=5)),
                ('image', models.ImageField(blank=True, null=True, upload_to='menu/images/<django.db.models.fields.CharField>')),
                ('temp_id', models.CharField(blank=True, max_length=36, null=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='menu.menu')),
            ],
        ),
    ]
