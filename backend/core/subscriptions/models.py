from django.db import models
from django.utils import timezone
from datetime import timedelta
from dateutil.relativedelta import relativedelta


class FeatureCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Feature(models.Model):
    category = models.ForeignKey(
        FeatureCategory, related_name="features", on_delete=models.SET_NULL, null=True
    )
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Plan(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    features = models.ManyToManyField(Feature, through="PlanFeature")
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
    is_enabled = models.BooleanField(default=True)
    limit_value = models.IntegerField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['plan', 'feature'], name='unique_plan_feature')
        ]

    def __str__(self):
        return f"{self.plan.name} - {self.feature.name}"


class PlanDuration(models.Model):
    days = models.PositiveIntegerField(unique=True)
    label = models.CharField(max_length=50)

    def __str__(self):
        return self.label


class PlanPricing(models.Model):
    plan = models.ForeignKey(
        Plan, on_delete=models.CASCADE, related_name="pricings")
    duration = models.ForeignKey(PlanDuration, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['plan', 'duration'], name='unique_plan_duration_price')
        ]

    def __str__(self):
        return f"{self.plan.name} - {self.duration.label}: {self.price}"


class Subscription(models.Model):
    business = models.OneToOneField(
        "business.Business", on_delete=models.CASCADE, related_name="subscription")
    plan = models.ForeignKey(Plan, on_delete=models.PROTECT)
    pricing = models.ForeignKey(PlanPricing, on_delete=models.PROTECT)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(blank=True)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        # auto-calculate end_date based on chosen duration
        if not self.end_date and self.start_date and self.pricing.duration:
            self.end_date = self.start_date + \
                relativedelta(months=self.pricing.duration.months)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.business.name} → {self.plan.name} ({self.pricing.duration.label})"
