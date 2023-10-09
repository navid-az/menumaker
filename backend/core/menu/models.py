from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL
from colorfield.fields import ColorField

class Menu(models.Model):
    name = models.CharField(max_length=250)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    primary_color = ColorField()
    secondary_color = ColorField()
    tertiary_color = ColorField()
    bg_color = ColorField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class ItemCategory(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, blank=True, null=True)
    icon = models.ImageField(blank=True, null=True)
    text_color = ColorField()
    child_bg = ColorField()
    parent_bg = ColorField()
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f'menu: {self.menu} - items category: {self.name}'
    
class Item(models.Model):
    category = models.ForeignKey(ItemCategory, on_delete=models.CASCADE)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    name = models.CharField(max_length=110)
    description = models.TextField(max_length=300, blank=True, null=True)
    price = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f'{self.name} - {self.price}'

class Tag(models.Model):
   name = models.CharField(max_length=10)
   icon = models.ImageField()
   text_color = ColorField()
   background = ColorField()

   def __str__(self) -> str:
        return self.name

