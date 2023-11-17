from django.db import models
from colorfield.fields import ColorField
from django.conf import settings
from pickers.models import Icon
User = settings.AUTH_USER_MODEL

class Menu(models.Model):
    PRICE_UNITS= [('simp', 'simple'), ('comp', 'compact'), ('engL', 'engLetter'), ('perL', 'perLetter') ]

    name = models.CharField(max_length=250)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    primary_color = ColorField()
    secondary_color = ColorField()
    tertiary_color = ColorField()
    bg_color = ColorField()
    price_unit = models.CharField(max_length=9 ,choices=PRICE_UNITS, default='simp')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class ItemCategory(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=20, blank=True, null=True)
    icon = models.ForeignKey(Icon, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='item_categories')
    text_color = ColorField()
    child_bg = ColorField()
    parent_bg = ColorField()
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f'menu: {self.menu} - items category: {self.name} - {self.menu.pk}'
    
class Item(models.Model):
    category = models.ForeignKey(ItemCategory, on_delete=models.CASCADE, related_name='items')
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=110)
    description = models.TextField(max_length=300, blank=True, null=True)
    image = models.ImageField(upload_to=f"menu/items/images/", default='')
    price = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f'{self.name} - {self.price} - {self.menu}'

class Tag(models.Model):
   name = models.CharField(max_length=10)
   icon = models.ImageField()
   text_color = ColorField()
   background = ColorField()

   def __str__(self) -> str:
        return self.name

