from django.db import models
from django.utils import timezone
from datetime import timedelta
from dateutil.relativedelta import relativedelta
from django.contrib.auth import get_user_model

User = get_user_model()


class FeatureCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    code = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Feature(models.Model):
    code = models.CharField(max_length=50, unique=True)
    category = models.ForeignKey(
        FeatureCategory,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name="features"
    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Plan(models.Model):
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    features = models.ManyToManyField(
        Feature, through="PlanFeature", related_name='plans')
    is_active = models.BooleanField(default=True)

    # Check if plan has a given feature code enabled
    def has_feature(self, code):
        return self.plan_features.filter(feature__code=code, is_enabled=True).exists()

    # Return feature limit for this plan (if defined)
    def get_limit(self, code):
        pf = self.plan_features.filter(feature__code=code).first()
        return pf.limit_value if pf else None

    def __str__(self):
        return self.name


class PlanFeature(models.Model):
    plan = models.ForeignKey(
        Plan, related_name="plan_features", on_delete=models.CASCADE
    )
    feature = models.ForeignKey(
        Feature, related_name="plan_features", on_delete=models.CASCADE
    )
    limit_value = models.IntegerField(null=True, blank=True)
    is_enabled = models.BooleanField(default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['plan', 'feature'], name='unique_plan_feature')
        ]

    def __str__(self):
        return f"{self.plan.name} - {self.feature.name}"


class PlanDuration(models.Model):
    name = models.CharField(max_length=50)
    days = models.PositiveIntegerField(unique=True)
    # percentage discount for this duration
    discount = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class PlanPricing(models.Model):
    plan = models.ForeignKey(
        Plan, on_delete=models.CASCADE, related_name="pricings")
    duration = models.ForeignKey(PlanDuration, on_delete=models.CASCADE)
    price = models.IntegerField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['plan', 'duration'], name='unique_plan_duration_price')
        ]

    def __str__(self):
        return f"{self.plan.name} - {self.duration.name}: {self.price}"


class Subscription(models.Model):
    STATUS_CHOICES = [('active', 'Active'), ('pending', 'Pending'),
                      ('expired', 'Expired'), ('paused', 'Paused'), ('canceled', 'Canceled')]

    business = models.OneToOneField(
        "business.Business", on_delete=models.CASCADE, related_name="subscription")
    plan = models.ForeignKey(Plan, on_delete=models.PROTECT)
    pricing = models.ForeignKey(PlanPricing, on_delete=models.PROTECT)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(blank=True)
    status = models.CharField(choices=STATUS_CHOICES,
                              default='active', max_length=20)

    def is_expired(self):
        """
        Check if the subscription is expired based on end_date
        """
        return self.end_date and timezone.now() > self.end_date

    def get_features(self):
        """
        Returns a queryset of Feature objects available in this subscription's plan.
        """
        return self.plan.features.all()

    def save(self, *args, **kwargs):
        # auto-calculate end_date based on chosen duration
        if not self.end_date and self.start_date and self.pricing.duration:
            self.end_date = self.start_date + \
                relativedelta(days=self.pricing.duration.days)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.business.name} → {self.plan.name} ({self.pricing.duration.name})"


class SubscriptionOrder(models.Model):
    """
    Tracks subscription purchase attempts from plan selection through payment completion.
    Created when user clicks 'pay', updated when Zarinpal confirms payment.
    """

    class OrderStatus(models.TextChoices):
        PENDING = 'pending', 'Pending Payment'
        PAID = 'paid', 'Payment Confirmed'
        FAILED = 'failed', 'Payment Failed'
        CANCELLED = 'cancelled', 'Cancelled'

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='subscription_orders',
    )
    # Link to created subscription
    subscription = models.ForeignKey(
        Subscription,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='orders',
    )

    plan = models.ForeignKey(
        Plan, on_delete=models.PROTECT, related_name="orders")

    # Plan details (snapshot at time of purchase)
    name_snapshot = models.CharField(max_length=100)
    duration_snapshot = models.PositiveIntegerField()  # in days
    price_snapshot = models.IntegerField()

    # Payment gateway fields
    zarinpal_authority = models.CharField(
        max_length=255,
        unique=True,
        blank=True,
        null=True,
    )
    zarinpal_ref_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
    )

    status = models.CharField(
        max_length=50, blank=True, choices=OrderStatus.choices, default=OrderStatus.PENDING)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    paid_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.phone_number} - {self.plan.name} ({self.status})"
