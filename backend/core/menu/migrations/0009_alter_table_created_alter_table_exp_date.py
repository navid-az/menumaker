# Generated by Django 4.2.4 on 2024-01-18 19:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0008_alter_table_created_alter_table_exp_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='table',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='table',
            name='exp_date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
