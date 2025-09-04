from rest_framework.views import APIView, Response, status
from django.contrib.auth import get_user_model
from .models import Personnel
from .serializers import RoleAssignSerializer
from business.models import Business, Branch
from django.db import transaction
from django.shortcuts import get_object_or_404

User = get_user_model()


class RoleAssignView(APIView):
    def post(self, request, user_id, business_slug):
        user = get_object_or_404(User, pk=user_id)
        business = get_object_or_404(Business, slug=business_slug)

        serializer = RoleAssignSerializer(
            data=request.data,
            context={"user_id": user.id, "business_slug": business.slug}
        )
        serializer.is_valid(raise_exception=True)

        branch_ids = serializer.validated_data.get("branches", [])
        role = serializer.validated_data.get("role")

        # Ensure all branch IDs exist under this business
        branches = Branch.objects.filter(
            business=business, pk__in=branch_ids)
        if len(branch_ids) != branches.count():
            return Response(
                {"error": "One or more branch IDs are invalid."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create personnel atomically
        with transaction.atomic():
            personnel = Personnel.objects.create(
                user=user,
                business=business,
                role=role
            )
            personnel.branches.set(branches)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
