from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.text import slugify
from pickers.models import Asset
from datetime import timedelta
import string
import random
from django.core.validators import RegexValidator

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
        return f"table code: {self.table.code} - session code: {self.code}"


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


class Reservation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
        ('no_show', 'No Show'),
    ]

    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    table = models.ForeignKey(
        Table, on_delete=models.CASCADE, related_name='reservations')

    # Customer Information
    name = models.CharField(max_length=200)
    email = models.EmailField(null=True, blank=True)
    phone_number = models.CharField(validators=[phone_regex], max_length=17)

    # Reservation Details
    reservation_start = models.DateTimeField()
    reservation_end = models.DateTimeField(blank=True)
    party_size = models.PositiveIntegerField()
    duration_minutes = models.PositiveIntegerField(
        default=60, help_text="Expected duration in minutes")

    # Optional Details
    special_requests = models.TextField(
        blank=True, help_text="Dietary restrictions, accessibility needs, etc.")
    table_preference = models.CharField(
        max_length=100, blank=True, help_text="e.g., window seat, outdoor, private room")

    # Status and Tracking
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='pending')
    confirmation_code = models.CharField(
        max_length=50, unique=True, blank=True)

    # Internal Notes
    internal_notes = models.TextField(
        blank=True, help_text="Staff notes not visible to customer")

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    confirmed_at = models.DateTimeField(null=True, blank=True)
    cancelled_at = models.DateTimeField(null=True, blank=True)

    # Cancellation Details
    cancellation_reason = models.TextField(blank=True)
    cancelled_by = models.CharField(
        max_length=100, blank=True, help_text="Customer or Staff name")

    class Meta:
        ordering = ['-reservation_start']
        # indexes = [
        #     models.Index(fields=['branch', 'reservation_date', 'status']),
        #     models.Index(fields=['customer_email']),
        #     models.Index(fields=['confirmation_code']),
        # ]

    def __str__(self):
        return f"{self.name} - {self.reservation_start} - at table ({self.table.id})"

    def save(self, *args, **kwargs):
        # Generate confirmation code if not exists
        if not self.confirmation_code:
            self.confirmation_code = generate_unique_code()

        # Set confirmed_at timestamp when status changes to confirmed
        if self.status == 'confirmed' and not self.confirmed_at:
            self.confirmed_at = timezone.now()

        # Set cancelled_at timestamp when status changes to cancelled
        if self.status == 'cancelled' and not self.cancelled_at:
            self.cancelled_at = timezone.now()

        # Calculate reservation end if not provided
        if self.reservation_end is None:
            self.reservation_end = self.reservation_start + \
                timedelta(minutes=self.duration_minutes)

        super().save(*args, **kwargs)

    @property
    def is_upcoming(self):
        """Check if reservation is in the future"""

        return self.reservation_start > timezone.now() and self.status not in ['cancelled', 'completed', 'no_show']

    @property
    def can_cancel(self):
        """Check if reservation can still be cancelled"""
        return self.is_upcoming and self.status not in ['cancelled', 'completed']


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

    is_available = models.BooleanField(default=True)  # globally available
    is_active = models.BooleanField(default=True)  # globally active

    def __str__(self) -> str:
        return f"{self.name} - {self.business}"


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
