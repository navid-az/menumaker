from django.contrib import admin
from .models import Subscription, SubscriptionOrder, Plan, PlanPricing, PlanDuration, Feature, PlanFeature, FeatureCategory

admin.site.register(Subscription)
admin.site.register(SubscriptionOrder)
admin.site.register(Plan)
admin.site.register(PlanPricing)
admin.site.register(PlanDuration)
admin.site.register(Feature)
admin.site.register(PlanFeature)
admin.site.register(FeatureCategory)
