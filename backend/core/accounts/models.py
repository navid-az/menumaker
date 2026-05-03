from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager
from rest_framework_simplejwt.models import TokenUser
from django.utils.functional import cached_property
from django.utils import timezone
from datetime import timedelta


# change the default user model
class User(AbstractBaseUser, PermissionsMixin):
    phone_number = models.CharField(
        max_length=11, unique=True, null=True, blank=True)
    email = models.EmailField(
        max_length=255, unique=True, null=True, blank=True)
    full_name = models.CharField(max_length=100, null=True, blank=True)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    # objects = UserManager()
    objects: UserManager = UserManager()

    # get user roles for all businesses and branches
    def get_user_roles(self):
        access = {}

        # owner businesses
        for business in self.businesses.all():
            access[business.slug] = {
                "role": "owner"
            }

        # personnel assignments
        for assignment in self.assignments.all():
            business = assignment.business

            # don't override owner
            if business.slug in access:
                continue

            access[business.slug] = {
                "role": assignment.role.name,
                "branches": [b.slug for b in assignment.branches.all()]
            }

        return access

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = ["email", "full_name"]

    def __str__(self):
        return self.phone_number if self.phone_number else self.email


class Otp(models.Model):
    phone_number = models.CharField(
        max_length=11, unique=True, null=True, blank=True)
    email = models.EmailField(
        max_length=255, unique=True, null=True, blank=True)
    hashed_otp = models.CharField(max_length=128)
    attempts_count = models.IntegerField(default=3)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(blank=True)

    def save(self, *args, **kwargs):
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(minutes=2)
        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"otp for: {self.phone_number if self.phone_number else self.email} | expiry: {self.expires_at}"
        )


# class CustomTokenUser(TokenUser):
#     """
#     Extend TokenUser and adds custom attributes to be pulled from TokenUser.
#     This class should be specified in Django settings SIMPLE_JWT.TOKEN_USER_CLASS
#     """

#     @cached_property
#     def otp(self):
#         return self.token.password
