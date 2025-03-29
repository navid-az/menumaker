from django.db import transaction
from .models import Menu, MenuGlobalStyling
from rest_framework import serializers
from business.serializers import CategoriesSerializer


# menu serializers
class MenuListSerializer(serializers.ModelSerializer):
    categories = CategoriesSerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = '__all__'


class MenuGlobalStylingSerializer(serializers.ModelSerializer):
    CLICK_ANIMATION_CHOICES = [
        ('ripple', 'ripple effect'), ('tactile', 'tactile effect')]

    click_animation_type = serializers.MultipleChoiceField(
        choices=CLICK_ANIMATION_CHOICES, allow_null=True)

    class Meta:
        model = MenuGlobalStyling
        fields = '__all__'


class MenuCreateSerializer(serializers.ModelSerializer):
    global_styling = MenuGlobalStylingSerializer(write_only=True)

    class Meta:
        model = Menu
        fields = '__all__'

    def create(self, validated_data):
        global_style_data = validated_data.pop('global_styling', {})

        with transaction.atomic():
            menu = Menu.objects.create(**validated_data)
            if global_style_data:
                MenuGlobalStyling.objects.create(
                    menu=menu, **global_style_data)
        return menu
