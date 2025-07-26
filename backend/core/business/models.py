from django.db import models
from django.conf import settings
from pickers.models import Asset

# external dependencies
from colorfield.fields import ColorField

User = settings.AUTH_USER_MODEL


class Business(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, default=1, related_name='businesses')
    name = models.CharField(max_length=100, null=True, blank=True)
    name_en = models.CharField(max_length=100, default='business name')
    slug = models.SlugField(
        max_length=100, unique=True, null=True, blank=True)
    service_type = models.CharField(
        max_length=20,
        choices=[('online', 'Online Order Only'),
                 ('in_person', 'In-Person Only'), ('both', 'Both')],
        default='both'
    )
    primary_service_type = models.CharField(
        max_length=20,
        choices=[('online', 'Online Order Only'),
                 ('in_person', 'In-Person Only')],
        null=True, blank=True
    )
    branch_structure = models.CharField(max_length=20, choices=[(
        'single', 'single'), ('multiple', 'multiple')], null=True, blank=True)
    branch_count = models.PositiveIntegerField(default=1)
    # ex: [{"Telegram":"[telegram link]", "Instagram":"[instagram link]", ...}]
    social_links = models.JSONField(default=dict, blank=True)
    phone_numbers = models.JSONField(default=list, blank=True)
    # ex: [{"number_1":[number], "number_2":[number], ...}]
    branches = models.JSONField(default=list, blank=True)
    # ex: [{"branch-1":"[address]", "branch_2":"[address]", ...}]

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.slug})"


class Category(models.Model):
    business = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="categories")
    name = models.CharField(max_length=20, blank=True, null=True)
    icon = models.ForeignKey(
        Asset,
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True,
        related_name="item_categories",
    )
    text_color = ColorField()
    child_bg = ColorField()
    parent_bg = ColorField()
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self) -> str:
        return f"{self.name} - {self.business}"


class Item(models.Model):
    business = models.ForeignKey(
        "business.Business", on_delete=models.CASCADE, related_name="items")
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="items"
    )
    name = models.CharField(max_length=110)
    description = models.TextField(max_length=300, blank=True, null=True)
    image = models.ImageField(
        upload_to=f"menu/items/images/", blank=True, null=True)
    price = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"{self.name} - {self.business}"
