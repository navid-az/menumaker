from django.db import models
from django.core.validators import FileExtensionValidator


class AssetGroup(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return self.name


class Asset(models.Model):
    group = models.ForeignKey(
        AssetGroup, on_delete=models.CASCADE, related_name="assets")
    name = models.CharField(max_length=50)
    image = models.FileField(
        upload_to="iconPicker/icons/",
        validators=[FileExtensionValidator(["svg"])],
    )

    def __str__(self) -> str:
        return self.name
