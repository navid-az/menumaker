# Generated by Django 5.2 on 2025-07-26 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business', '0005_business_branch_structure'),
    ]

    operations = [
        migrations.AlterField(
            model_name='business',
            name='branch_structure',
            field=models.CharField(blank=True, choices=[('single', 'single'), ('multiple', 'multiple')], default='single', max_length=20, null=True),
        ),
    ]
