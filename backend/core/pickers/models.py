from django.db import models
from django.core.validators import FileExtensionValidator

# Create your models here.


class IconGroup(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self) -> str:
        return self.name


class Icon(models.Model):
    group = models.ForeignKey(IconGroup, on_delete=models.CASCADE, related_name="icons")
    name = models.CharField(max_length=50)
    image = models.FileField(
        upload_to="iconPicker/icons/",
        validators=[FileExtensionValidator(["svg"])],
    )

    def __str__(self) -> str:
        return self.name
