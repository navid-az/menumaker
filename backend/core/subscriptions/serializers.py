from rest_framework import serializers
from .models import Subscription, Plan, PlanFeature


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

    class Meta:
        model = Plan
        fields = ['name', 'features']


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
