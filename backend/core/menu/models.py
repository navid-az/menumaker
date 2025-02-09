from django.db import models
from django.conf import settings

# external dependencies
from colorfield.fields import ColorField
from pickers.models import Icon
from multiselectfield import MultiSelectField

User = settings.AUTH_USER_MODEL


class Menu(models.Model):
    name = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100)
    slug = models.SlugField(
        max_length=100, unique=True, null=True, blank=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, default=1, related_name='owned_places')
    is_active = models.BooleanField(default=True)
    personnel = models.ManyToManyField(
        User, related_name='places', blank=True)
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
    branch_count = models.PositiveIntegerField(default=1)
    social_links = models.JSONField(default=dict, blank=True)
    # ex: [{"Telegram":"[telegram link]", "Instagram":"[instagram link]", ...}]
    phone_numbers = models.JSONField(default=list, blank=True)
    # ex: [{"number_1":[number], "number_2":[number], ...}]
    locations = models.JSONField(default=list, blank=True)
    # ex: [{"branch-1":"[address]", "branch_2":"[address]", ...}]
    item_page_type = models.CharField(
        max_length=20,
        choices=[('vertical', 'Vertical'), ('horizontal', 'Horizontal')],
        default='horizontal'
    )
    categories_display_type = models.CharField(
        max_length=20, choices=[('slider', 'Slider'), ('circular', 'Circular')], default='slider')
    waiter_request_is_active = models.BooleanField(default=False)
    search_item_is_active = models.BooleanField(default=False)
    logo = models.ImageField(
        upload_to="menu/images/logo/", null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.slug


# global animation for the entire menu app(home page, items page, ...)
class MenuGlobalStyling(models.Model):
    CLICK_ANIMATION_CHOICES = [
        ('ripple', 'ripple effect'), ('tactile', 'tactile effect')]
    PRICE_UNITS = [
        ("simp", "simple"),
        ("comp", "compact"),
        ("engL", "engLetter"),
        ("perL", "perLetter"),
    ]

    menu = models.OneToOneField(Menu, on_delete=models.CASCADE,)
    primary_color = ColorField()
    secondary_color = ColorField()
    tertiary_color = ColorField()
    bg_color = ColorField()
    border_radius = models.CharField(
        max_length=2,
        choices=[('sm', 'small'), ('md', 'medium'), ('lg', 'large')],
        default='full'
    )
    unit_display_type = models.CharField(
        max_length=9, choices=PRICE_UNITS, default="simp")
    click_animation = MultiSelectField(
        choices=CLICK_ANIMATION_CHOICES, max_choices=3)
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


class ItemCategory(models.Model):
    menu = models.ForeignKey(
        Menu, on_delete=models.CASCADE, related_name="categories", null=True, blank=True)
    name = models.CharField(max_length=20, blank=True, null=True)
    icon = models.ForeignKey(
        Icon,
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True,
        related_name="item_categories",
    )
    text_color = ColorField()
    child_bg = ColorField()
    parent_bg = ColorField()
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"menu: {self.menu} - items category: {self.name} - {self.menu.pk}"


class Item(models.Model):
    menu = models.ForeignKey(
        Menu, on_delete=models.CASCADE, related_name="items", null=True, blank=True)
    category = models.ForeignKey(
        ItemCategory, on_delete=models.CASCADE, related_name="items"
    )
    name = models.CharField(max_length=110)
    description = models.TextField(max_length=300, blank=True, null=True)
    image = models.ImageField(
        upload_to=f"menu/items/images/", blank=True, null=True)
    price = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"{self.name} - {self.price} - {self.menu}"


class Tag(models.Model):
    name = models.CharField(max_length=10)
    icon = models.ImageField()
    text_color = ColorField()
    background = ColorField()

    def __str__(self) -> str:
        return self.name
