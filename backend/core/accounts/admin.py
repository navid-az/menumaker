from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import userChangeForm, userCreationForm
from .models import User, OtpCode
from django.contrib.auth.models import Permission


class UserAdmin(BaseUserAdmin):
    form = userChangeForm
    add_form = userCreationForm

    list_display = ("email", "phone_number", "is_admin",
                    "is_staff", "is_superuser")
    list_filter = ("is_admin",)
    fieldsets = (
        (None, {"fields": ("email", "phone_number", "full_name", "password")}),
        ("Permissions", {"fields": ("is_active", "is_staff",
         "is_superuser", "groups", "user_permissions")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "phone_number",
                    "full_name",
                    "password1",
                    "password2",
                )
            },
        ),
    )

    search_fields = ("email", "phone_number", "full_name")
    ordering = ("email",)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
admin.site.register(OtpCode)


admin.site.register(Permission)
