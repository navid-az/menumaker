from rest_framework import serializers
from .models import Subscription, SubscriptionOrder, Plan, PlanFeature, PlanDuration, PlanPricing
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

User = get_user_model()


class PlanPricingSerializer(serializers.ModelSerializer):
    duration = serializers.IntegerField(source='duration.days', read_only=True)
    discount = serializers.IntegerField(
        source='duration.discount', read_only=True)

    class Meta:
        model = PlanPricing
        fields = ['duration', 'price', 'discount']


class PlanFeatureSerializer(serializers.ModelSerializer):
    code = serializers.CharField(source='feature.code')

    class Meta:
        model = PlanFeature
        fields = ['code', 'limit_value', 'is_enabled']


class PlanSerializer(serializers.ModelSerializer):
    features = PlanFeatureSerializer(
        source='plan_features',  # reverse relation from through model
        many=True,
        read_only=True
    )
    pricings = PlanPricingSerializer(many=True, read_only=True)

    class Meta:
        model = Plan
        fields = ['slug', 'name', 'description', 'features', 'pricings']


class SubscriptionSerializer(serializers.ModelSerializer):
    plan = PlanSerializer(read_only=True)

    class Meta:
        model = Subscription
        fields = [
            'id',
            'start_date',
            'end_date',
            'status',
            'business',
            'plan',
        ]


class SubscriptionCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'
        read_only_fields = ['id', 'business' 'start_date',
                            'end_date', 'status']
        extra_kwargs = {
            'business': {'required': False},
        }

    def validate(self, data):
        business = self.context['business']
        # check if an active subscription already exists
        if Subscription.objects.filter(business=business, status='active').exists():
            raise serializers.ValidationError(
                'There is already an active subscription for this business'
            )
        return data

    def create(self, validated_data):
        business = self.context['business']

        return Subscription.objects.create(
            business=business,
            **validated_data
        )


class SubscriptionOrderCreateUpdateSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(write_only=True, required=True)
    plan_slug = serializers.SlugField(write_only=True, required=True)

    class Meta:
        model = SubscriptionOrder
        fields = ['zarinpal_authority', 'zarinpal_ref_id',
                  'price_snapshot', 'name_snapshot', 'duration_snapshot', 'paid_at', 'user_id', 'plan_slug']

    def create(self, validated_data):
        # Extract the identifiers to avoid errors
        # These fields aren't supposed stay inside validated_data
        user_id = validated_data.pop('user_id')
        plan_slug = validated_data.pop('plan_slug')

        user = get_object_or_404(User, id=user_id)
        plan = get_object_or_404(Plan, slug=plan_slug)

        return SubscriptionOrder.objects.create(
            user=user,
            plan=plan,
            **validated_data
        )
