import os

from zarinpal import ZarinPal, Config
from typing import Literal
from django.shortcuts import get_object_or_404
from django.conf import settings

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.db import transaction
from django.shortcuts import redirect

from permissions import IsOwner
from .serializers import SubscriptionSerializer, SubscriptionCreateUpdateSerializer, PlanSerializer, SubscriptionOrderCreateUpdateSerializer
from .models import Subscription, SubscriptionOrder, Plan, PlanPricing
from business.models import Business
from django.utils import timezone


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
            merchant_id="c3f7f0f4-2c49-4c2b-8db5-bb6c6b43b2b4",
            sandbox=True,
        )
        zarinpal = ZarinPal(config)

        callback_url = (
            f"{os.environ['NEXT_PUBLIC_APP_URL']}/api/subscriptions/orders/verify/"
        )
        response = zarinpal.payments.create({
            "amount": amount,
            "callback_url": callback_url,
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
        print("Error during payment creation:", e)
        return {
            "success": False,
            "error": str(e)
        }


def verify_payment(authority: str, amount: int, status: str):
    if status == "OK":
        if amount:
            try:
                config = Config(
                    merchant_id="c3f7f0f4-2c49-4c2b-8db5-bb6c6b43b2b4",
                    sandbox=True,
                )
                zarinpal = ZarinPal(config)
                response = zarinpal.verifications.verify({
                    "amount": amount,
                    "authority": authority,
                })

                if response["data"]["code"] == 100:
                    print("Payment Verified:")
                    print("Reference ID:", response["data"]["ref_id"])
                    print("Card PAN:", response["data"]["card_pan"])
                    print("Fee:", response["data"]["fee"])
                    return {
                        "success": True,
                        'raw': response
                    }
                elif response["data"]["code"] == 101:
                    return {
                        "success": False,
                        "error": "Payment already verified.",
                        "raw": response
                    }
                else:
                    return {
                        "success": False,
                        "error": f"Transaction failed with code: {response["data"]["code"]}",
                        "raw": response
                    }

            except Exception as e:
                return {
                    "success": False,
                    "error": f"Payment Verification Failed: {e}",
                }
        else:
            return {
                "success": False,
                "error": "No Matching Transaction Found For This Authority Code.",
            }
    else:
        return {
            "success": False,
            "error": "Transaction was cancelled or failed.",
        }


# Activate(create) subscription for the verified subscription order
def activate_subscription(order):
    Subscription.objects.create(
        business=order.business,
        plan=order.plan,
        pricing=order.pricing,
    )


# This view is meant to be called when user attempts to purchase a subscription.
# It creates a SubscriptionOrder instance which tracks the purchase attempt.
class SubscriptionOrderView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request):
        business_slug = request.GET.get('business_slug')

        # Should be removed later, this is just an MVP payment gateway bypass for foreign users
        locale = request.GET.get('locale')

        business = get_object_or_404(Business, slug=business_slug)

        self.check_object_permissions(request, business)

        serializer = SubscriptionOrderCreateUpdateSerializer(data=request.data)
        if serializer.is_valid():

            pricing = get_object_or_404(
                PlanPricing.objects.select_related('plan', 'duration'),
                plan__slug=serializer.validated_data['plan_slug'],
                duration__days=serializer.validated_data['duration']
            )

            def _calculate_total_price(price, discount_percent=0, tax_rate=0.1, currency: Literal["IRR", "IRT"] = 'IRR'):
                """
                price: base price (number)
                discount_percent: optional discount in %
                """
                # Apply optional discount
                if discount_percent > 0:
                    discount_amount = price * (discount_percent / 100)
                    price_after_discount = price - discount_amount
                else:
                    price_after_discount = price

                # Apply tax
                tax_amount = price_after_discount * tax_rate
                total = (price_after_discount + tax_amount) * \
                    (10 if currency == 'IRR' else 1)

                return total

            total_price = _calculate_total_price(
                pricing.price, discount_percent=pricing.duration.discount)

            # Bypass payment gateway entirely if locale is EN and account has demo mode flag
            should_bypass_payment = (
                settings.DEMO_MODE_ENABLED
                and business.owner.is_demo
                and locale == 'en'
            )

            res = None

            if not should_bypass_payment:
                res = initiate_payment(
                    amount=total_price,
                    description=pricing.plan.name,
                    mobile=request.user.phone_number or '',
                    email=request.user.email or '',
                )

                if not res["success"]:
                    return Response(
                        {"detail": "Payment initiation failed. Please try again."},
                        status=status.HTTP_502_BAD_GATEWAY,
                    )

            subscription_order = SubscriptionOrder.objects.create(
                business=business,
                plan=pricing.plan,
                pricing=pricing,
                name_snapshot=pricing.plan.name,
                duration_snapshot=pricing.duration.days,
                price_snapshot=total_price,
                zarinpal_authority=res["authority"] if res else None,
                status=(
                    SubscriptionOrder.OrderStatus.PAID
                    if should_bypass_payment
                    else SubscriptionOrder.OrderStatus.PENDING
                ),
            )

            if should_bypass_payment:
                activate_subscription(subscription_order)
                return Response({
                                "payment_url": None,
                                "bypass": True
                                }, status=status.HTTP_200_OK)

            return Response({
                "payment_url": res["payment_url"] if res else None,
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Verifies the subscription order payment
# updates order status to PAID and creates a new subscription instance on OK
# updates order status to FAILED on NOK
class SubscriptionOrderVerifyView(APIView):

    def get(self, request):
        authority = request.GET.get('Authority')
        payment_status = request.GET.get('Status')

        sub_order = subscription_order = get_object_or_404(
            SubscriptionOrder, zarinpal_authority=authority)

        if payment_status != 'OK':
            # Set order status as CANCELED
            sub_order.status = sub_order.OrderStatus.CANCELLED
            sub_order.save()

            # payment failed or user canceled
            return redirect(f'{os.environ['NEXT_PUBLIC_APP_URL']}/pricing?status=NOK')

        res = verify_payment(
            authority=authority,
            amount=subscription_order.price_snapshot,
            status=payment_status
        )

        if res['success']:
            # mark order as paid
            subscription_order.status = SubscriptionOrder.OrderStatus.PAID
            subscription_order.paid_at = timezone.now()
            subscription_order.zarinpal_ref_id = res['raw']["data"]["ref_id"]
            subscription_order.save()

            # create subscription instance
            activate_subscription(subscription_order)
            return redirect(
                f"{os.environ['NEXT_PUBLIC_APP_URL']}/builder?status=OK"
            )

        # mark order as failed
        subscription_order.status = SubscriptionOrder.OrderStatus.FAILED
        subscription_order.save()
        return redirect(f'{os.environ['NEXT_PUBLIC_APP_URL']}/pricing?status=NOK')
