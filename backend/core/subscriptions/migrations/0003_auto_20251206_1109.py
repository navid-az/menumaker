from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0002_rename_label_planduration_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='featurecategory',
            name='code',
            field=models.CharField(max_length=50),
        ),
    ]
