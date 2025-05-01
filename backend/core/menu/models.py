from django.db import models
from django.conf import settings

# external dependencies
from colorfield.fields import ColorField
from multiselectfield import MultiSelectField

User = settings.AUTH_USER_MODEL


class Menu(models.Model):
    CATEGORIES_DISPLAY_CHOICES = [
        ('slider', 'Slider'), ('circular', 'Circular')]

    business = models.ForeignKey(
        'business.Business', on_delete=models.CASCADE, null=True, blank=True, related_name='menus')
    show_social_links = models.BooleanField(default=False)
    show_phone_numbers = models.BooleanField(default=False)
    show_branches = models.BooleanField(default=False)
    items_page_layout = models.CharField(
        max_length=20,
        choices=[('vertical', 'Vertical'), ('horizontal', 'Horizontal')],
        default='horizontal'
    )
    categories_display_type = models.CharField(
        max_length=20, choices=CATEGORIES_DISPLAY_CHOICES, default='slider')
    call_waiter_enabled = models.BooleanField(default=False)
    searchbar_enabled = models.BooleanField(default=False)
    logo = models.ImageField(
        upload_to="menu/images/logo/", null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.business.name_en if self.business else 'Unknown Business!'}]'s menu"


class MenuSection(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, blank=True, null=True)
    icon = models.ForeignKey('pickers.Asset', on_delete=models.CASCADE)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.menu if self.menu else 'Unknown Menu!'} section[{self.name}]"


# stylings which effect the entire menu
class MenuGlobalStyling(models.Model):
    CLICK_ANIMATION_CHOICES = [
        ('ripple', 'ripple effect'), ('tactile', 'tactile effect')]
    PRICE_UNITS = [
        ("simp", "simple"),
        ("comp", "compact"),
        ("engL", "engLetter"),
        ("perL", "perLetter"),
    ]

    menu = models.OneToOneField(
        Menu, on_delete=models.CASCADE, null=True, blank=True)
    primary_color = ColorField()
    secondary_color = ColorField()
    tertiary_color = ColorField()
    bg_color = ColorField()
    border_radius = models.CharField(
        max_length=4,
        choices=[('sm', 'small'), ('md', 'medium'),
                 ('lg', 'large'), ('full', 'full')],
        default='full'
    )
    unit_display_type = models.CharField(
        max_length=9, choices=PRICE_UNITS, default="simp")
    click_animation_type = MultiSelectField(
        choices=CLICK_ANIMATION_CHOICES, max_choices=3, null=True, blank=True)
    click_animation_enabled = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)


class Table(models.Model):
    menu = models.ForeignKey(
        Menu, on_delete=models.CASCADE, related_name="tables")
    name = models.CharField(max_length=100, default="میز ۱")
    place = models.CharField(max_length=150, default="yes")
    exp_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} | {self.menu.name}"


class Tag(models.Model):
    name = models.CharField(max_length=10)
    icon = models.ImageField()
    text_color = ColorField()
    background = ColorField()

    def __str__(self) -> str:
        return self.name
