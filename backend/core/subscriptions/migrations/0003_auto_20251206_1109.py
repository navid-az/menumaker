from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0002_rename_label_planduration_name_and_more'),
    ]

    migrations.AddField(
        model_name='featurecategory',
        name='code',
        field=models.CharField(
            max_length=50,
            default='',
        ),
        preserve_default=False,
    )
