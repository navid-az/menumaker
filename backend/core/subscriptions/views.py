from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.db import transaction

from permissions import IsOwner
from .serializers import SubscriptionSerializer, SubscriptionCreateUpdateSerializer, PlanSerializer, SubscriptionOrderCreateUpdateSerializer
from .models import Subscription, SubscriptionOrder, Plan
from business.models import Business

# zarinpal imports
from zarinpal import ZarinPal, Config

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


# initiate zarinpal payment utility function
def initiate_payment(amount: int, description: str, mobile: str, email: str):
    try:
        config = Config(
            merchant_id="0e5a8a7a-2f7c-4a0f-b6d3-9c1a7e7d4c62",
            sandbox=True,
        )
        zarinpal = ZarinPal(config)

        response = zarinpal.payments.create({
            "amount": amount,
            "callback_url": "https://zarinpal.com/",
            "description": description,
            "mobile": mobile,
            "email": email,
        })

        if "data" in response and "authority" in response["data"]:
            authority = response["data"]["authority"]
            payment_url = zarinpal.payments.generate_payment_url(authority)

            return {
                "success": True,
                "authority": authority,
                "payment_url": payment_url,
                "raw": response
            }

        return {
            "success": False,
            "error": "Authority not found",
            "raw": response
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


# This view is meant to be called when user attempts to purchase a subscription.
# It creates a SubscriptionOrder instance which tracks the purchase attempt.
class SubscriptionOrderView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        ser_data = SubscriptionOrderCreateUpdateSerializer(
            data=request.data, context={'request': request})
        if ser_data.is_valid():

            res = initiate_payment(
                amount=ser_data.validated_data['price_snapshot'],
                description=ser_data.validated_data['name_snapshot'],
                mobile='',
                email=''
            )
            if not res["success"]:
                return Response(res, status=status.HTTP_400_BAD_REQUEST)

            # Save authority
            ser_data.save(
                zarinpal_authority=res["authority"])

            return Response({
                "payment_url": res["payment_url"],
                **ser_data.data
            }, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)
