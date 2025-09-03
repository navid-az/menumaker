from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import Group

from business.models import Business, Branch
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Personnel(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='assignments')
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    branches = models.ManyToManyField(Branch, blank=True, null=True)
    role = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True)
    is_active = models.BooleanField(default=True)

    is_created = models.DateTimeField(auto_now_add=True)
    is_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.phone_number} as {self.role.name} of {self.business.name}"
