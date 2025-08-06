from django.db import models
from django.conf import settings
from django.utils.text import slugify
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
    # ex: [{"branch-1":"[address]", "branch_2":"[address]", ...}]

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.slug})"


class Branch(models.Model):
    business = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="branches")
    slug = models.SlugField(
        max_length=100, unique=True, null=True, blank=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    # Automatically generate a unique slug if not provided
    def save(self, *args, **kwargs):
        if not self.slug:
            base_name = self.name if self.name else 'branch'
            base_slug = slugify(base_name)
            # Ensure base_slug is not empty
            if not base_slug:
                base_slug = 'branch'
            # Generate a unique slug
            unique_slug = f"{base_slug}-{self.business.id}-{Branch.objects.filter(business=self.business).count() + 1}"
            self.slug = unique_slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.business.name}"


class Table(models.Model):
    branch = models.ForeignKey(
        Branch, on_delete=models.CASCADE, related_name='tables')
    name = models.CharField(max_length=20)  # Example: "A1", "VIP-3"
    seats = models.PositiveSmallIntegerField()
    location_description = models.CharField(max_length=255, blank=True)

    # Table Status
    is_active = models.BooleanField(default=True)
    is_occupied = models.BooleanField(default=False)
    is_reserved = models.BooleanField(default=False)
    is_requesting_assistance = models.BooleanField(default=False)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.branch.name} - {self.name}"


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
