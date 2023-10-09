from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import UserManager


# change the default user model
class User(AbstractBaseUser):
    phone_number = models.CharField(max_length=11, unique=True, null=True, blank=True)
    email = models.EmailField(max_length=255, unique=True, null=True, blank=True)
    full_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    # objects = UserManager()
    objects: UserManager = UserManager()

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = ["email", "full_name"]

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
    
    def __str__(self):
        return f'{self.phone_number or self.email}'
class OtpCode(models.Model):
    phone_number = models.CharField(max_length=11, unique=True, null=True, blank=True)
    email = models.EmailField(max_length=255, unique=True, null=True, blank=True)
    password = models.PositiveIntegerField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
            f"code: {self.password} ---> num: {self.phone_number}   email: {self.email}"
        )
