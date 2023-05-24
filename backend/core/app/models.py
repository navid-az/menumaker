from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class MenuPage(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    menu_type = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class MenuItem(models.Model):
    menu = models.ForeignKey(MenuPage, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    image = models.ImageField()
    description = models.CharField(max_length=200)
    full_description = models.CharField(max_length=600)
    price = models.IntegerField()
    item_type = models.CharField(max_length=10)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    is_available = models.BooleanField(default=True)


class HomePage(models.Model):
    menu = models.OneToOneField(MenuPage, on_delete=models.CASCADE)
    bg_image = models.ImageField()
    location = models.CharField(max_length=300, null=True, blank=True)
    phone_number = models.BigIntegerField(null=True, blank=True)


class HomePageSection(models.Model):
    home_page = models.ForeignKey(
        HomePage, on_delete=models.CASCADE, related_name="sections"
    )
    name = models.CharField(max_length=100)
    image = models.ImageField()
