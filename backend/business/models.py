from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.text import slugify
from django.contrib.contenttypes.fields import GenericRelation
from assets.models import MediaAsset

from pickers.models import Asset
from datetime import timedelta
import string
import random

# external dependencies
from colorfield.fields import ColorField

User = settings.AUTH_USER_MODEL


# generate a unique code
def generate_unique_code(length=8):
    characters = string.ascii_uppercase + string.digits  # A-Z, 0-9
    while True:
        code = ''.join(random.choices(characters, k=length))
        if not Table.objects.filter(code=code).exists():
            return code


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
    social_links = models.JSONField(default=list, blank=True)
    phone_numbers = models.JSONField(default=list, blank=True)
    # ex: [{"number_1":[number], "number_2":[number], ...}]
    # ex: [{"branch-1":"[address]", "branch_2":"[address]", ...}]

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    # Used only on one instance purely for cloning demo mode
    is_template = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.slug})"


class Branch(models.Model):
    business = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="branches")
    slug = models.SlugField(
        max_length=100, unique=True, blank=True)
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
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
    code = models.CharField(max_length=8, blank=True, unique=True)
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

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = generate_unique_code()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.branch.name} - {self.name}"


class TableSession(models.Model):
    table = models.ForeignKey(
        Table, on_delete=models.CASCADE, related_name='session')
    code = models.CharField(max_length=8, blank=True, unique=True)
    started_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(blank=True)
    last_activity = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def is_expired(self):
        return self.expires_at and timezone.now() > self.expires_at

    def save(self, *args, **kwargs):
        # generate 8 digit code
        if not self.code:
            self.code = generate_unique_code()
        # set the expiration time
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(hours=2)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"table: {self.table.name} - session code: {self.code}"


class Order(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("preparing", "Preparing"),
        ("ready", "Ready"),
        ("served", "Served"),
        ("cancelled", "Cancelled"),
    )
    branch = models.ForeignKey(
        Branch, on_delete=models.CASCADE, related_name='orders')
    table_session = models.ForeignKey(
        TableSession, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')

    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="pending")
    notes = models.TextField(blank=True)
    total_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)

    # timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    accepted_at = models.DateTimeField(null=True, blank=True)
    ready_at = models.DateTimeField(null=True, blank=True)
    served_at = models.DateTimeField(null=True, blank=True)
    cancelled_at = models.DateTimeField(null=True, blank=True)

    # Transition and update related timestamps
    def transition_to(self, new_status):
        now = timezone.now()
        update_fields = ["status"]

        if new_status == "accepted" and self.status == "pending":
            self.accepted_at = now
            update_fields.append("accepted_at")

        elif new_status == "ready" and self.status in ("accepted", "preparing"):
            self.ready_at = now
            update_fields.append("ready_at")

        elif new_status == "served" and self.status == "ready":
            self.served_at = now
            update_fields.append("served_at")

        elif new_status == "cancelled" and self.status != "cancelled":
            self.cancelled_at = now
            update_fields.append("cancelled_at")

        self.status = new_status
        self.save(update_fields=update_fields)

    class Meta:
        indexes = [
            models.Index(fields=['branch', 'status']),
            models.Index(fields=['status', 'ready_at']),
            models.Index(fields=['table_session', 'status']),
        ]
        ordering = ['-created_at']


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, related_name="items", on_delete=models.CASCADE)

    item = models.ForeignKey(
        'Item',
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    name_snapshot = models.CharField(max_length=255)
    price_snapshot = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    notes = models.TextField(blank=True)


class CallWaiter(models.Model):
    table_session = models.ForeignKey(
        TableSession, on_delete=models.CASCADE, related_name="waiter_calls")
    resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(blank=True)

    def is_expired(self):
        return self.expires_at and timezone.now() > self.expires_at

    def save(self, *args, **kwargs):
        # set the expiration time
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(minutes=2)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"session: {self.table_session.code} called waiter"


class Category(models.Model):
    business = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="categories")
    name = models.CharField(max_length=20, blank=True, null=True)
    icon = models.ForeignKey(
        MediaAsset, on_delete=models.SET_NULL, null=True, blank=True, related_name='item_categories'
    )
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
    media_assets = GenericRelation(MediaAsset)
    name = models.CharField(max_length=110)
    description = models.TextField(max_length=300, blank=True, null=True)
    image = models.ImageField(
        upload_to=f"menu/items/images/", blank=True, null=True)
    price = models.PositiveIntegerField(default=0)

    is_available = models.BooleanField(default=True)  # globally available
    is_active = models.BooleanField(default=True)  # globally active

    def __str__(self) -> str:
        return f"{self.name} - {self.business}"


class ItemOption(models.Model):
    ITEM_OPTION_CHOICES_TYPE = (
        ("multi_select", "Multi Select"),
        ("radio", "Radio"),
        ('counter', 'Counter')
    )
    item = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='options')
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=ITEM_OPTION_CHOICES_TYPE)
    required = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.item.name} - {self.name}"


class ItemOptionChoice(models.Model):
    item_option = models.ForeignKey(
        ItemOption, on_delete=models.CASCADE, related_name='choices')
    name = models.CharField(max_length=200)

    # Price modifier relative to item.price
    price_modifier = models.IntegerField(
        default=0
    )

    # Used only for RADIO options
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.item_option.name} - {self.name}"


class ItemBranch(models.Model):
    item = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='branch_overrides')
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    is_available = models.BooleanField(default=True)
    # Override value for availability
    is_active = models.BooleanField(default=True)
    # Override value for hidden status

    class Meta:
        # Ensures no duplicate overrides per item-branch pair
        unique_together = ('item', 'branch')
