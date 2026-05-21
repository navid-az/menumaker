from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

from permissions import IsOwner
from .serializers import SubscriptionSerializer, SubscriptionCreateUpdateSerializer, PlanSerializer, SubscriptionOrderCreateUpdateSerializer
from .models import Subscription, Plan
from business.models import Business

User = get_user_model()


class PlanView(APIView):
    def get(self, request):
        plans = Plan.objects.all()
        ser_data = PlanSerializer(instance=plans, many=True)
        return Response(ser_data.data, status=status.HTTP_200_OK)

    def post(self, request):
        pass


class PlanDetailView(APIView):
    def get(self, request, plan_slug):
        plan = get_object_or_404(Plan, slug=plan_slug)
        ser_data = PlanSerializer(instance=plan)
        return Response(ser_data.data, status=status.HTTP_200_OK)


class SubscriptionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, business_slug):
        # Intentionally filtering by owner in the query instead of relying on IsOwner permission class.
        # Reasons:
        # 1. Performance + security: DB handles the check, prevents slug enumeration.
        # 2. Returns 404 (not 403) when business exists but isn’t owned.
        # 3. No need for manual self.check_object_permissions() in this specific case.
        #
        # We still use IsOwner + check_object_permissions() in all other views (Branch, Item, etc.)
        # to stay DRY and consistent across the codebase.
        business = get_object_or_404(
            Business, slug=business_slug, owner=request.user)

        # check subscription status
        # check if there are more than one subscription instance for this business
        try:
            subscription = Subscription.objects.get(
                business=business, status='active')
        except Subscription.DoesNotExist:
            return Response({"error": "There are no active subscriptions for this business"}, status.HTTP_404_NOT_FOUND)
        except Subscription.MultipleObjectsReturned:
            return Response({"error": "Multiple active subscriptions found"}, status.HTTP_500_INTERNAL_SERVER_ERROR)

        ser_data = SubscriptionSerializer(instance=subscription)
        return Response(ser_data.data)


class SubscriptionCreateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request, business_slug):

        business = get_object_or_404(Business, slug=business_slug)
        # check business ownership
        self.check_object_permissions(request, business)

        # Pass business via context
        serializer = SubscriptionCreateUpdateSerializer(
            data=request.data,
            context={
                'request': request,
                'business': business
            }
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


# This view is meant to be called when user attempts to purchase a subscription.
# It creates a SubscriptionOrder instance which tracks the purchase attempt.
class SubscriptionOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        ser_data = SubscriptionOrderCreateUpdateSerializer(data=request.data)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)
