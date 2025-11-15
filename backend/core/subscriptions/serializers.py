from rest_framework import serializers
from .models import Subscription


class SubscriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subscription
        fields = '__all__'
        read_only_fields = ['id', 'business' 'start_date',
                            'end_date', 'is_active']
        extra_kwargs = {
            'business': {'required': False},
        }

    def validate(self, data):
        business = self.context['business']
        # check if an active subscription already exists
        if Subscription.objects.filter(business=business, is_active=True).exists():
            raise serializers.ValidationError(
                'There is already an active subscription for this business'
            )
        return data

    def create(self, validated_data):
        print("CREATE CALLED")
        print("Business:", self.context['business'])
        business = self.context['business']

        return Subscription.objects.create(
            business=business,
            **validated_data
        )
