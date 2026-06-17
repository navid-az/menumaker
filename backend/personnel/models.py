from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import Group

from business.models import Business, Branch
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Personnel(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='assignments', blank=True, null=True)
    invited_email = models.EmailField(blank=True, null=True)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    branches = models.ManyToManyField(Branch, blank=True, null=True)
    role = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True)
    is_active = models.BooleanField(default=False)

    is_created = models.DateTimeField(auto_now_add=True)
    is_updated = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["business", "invited_email"],
                name="unique_invite_per_business"
            )
        ]

    def __str__(self):
        if self.user:
            return f"{self.user.phone_number} ({self.role})"
        return f"Anonymous Personnel ({self.role})"
