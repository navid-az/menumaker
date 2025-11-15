from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from permissions import IsOwner
from .serializers import SubscriptionSerializer
from business.models import Business


class CreateSubscriptionView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request, business_slug):

        business = get_object_or_404(Business, slug=business_slug)
        # check business ownership
        self.check_object_permissions(request, business)

        # Pass business via context
        serializer = SubscriptionSerializer(
            data=request.data,
            context={
                'request': request,
                'business': business
            }
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
