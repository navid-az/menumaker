from rest_framework.views import APIView, Response, status
from rest_framework.permissions import IsAuthenticated
from permissions import IsOwner, HasBusinessBranchAccess, HasMethodAccess
from django.contrib.auth import get_user_model
from .models import Personnel
from .serializers import PersonnelListSerializer, PersonnelAssignSerializer, PersonnelUpdateSerializer
from business.models import Business, Branch
from django.db import transaction
from django.shortcuts import get_object_or_404

User = get_user_model()


class PersonnelListView(APIView):
    permission_classes = [IsAuthenticated, IsOwner |
                          (HasBusinessBranchAccess & HasMethodAccess)]
    required_permission = ['personnel.change_personnel']

    def get(self, request, slug):
        branch_slug = request.query_params.get('branch_slug')
        business = get_object_or_404(Business, slug=slug)

        # Check object permissions
        self.check_object_permissions(request, business)

        business_personnel = Personnel.objects.filter(business=business)

        # If branch_slug is provided, filter personnel by branch
        if branch_slug:
            branch = get_object_or_404(business.branches, slug=branch_slug)
            branch_personnel = business_personnel.filter(
                branches=branch.pk)
            ser_data = PersonnelListSerializer(
                instance=branch_personnel, many=True, context={"business_slug": self.kwargs.get("slug")})
        else:
            ser_data = PersonnelListSerializer(
                instance=business_personnel, many=True, context={"business_slug": self.kwargs.get("slug")})
        return Response(ser_data.data)


class PersonnelAssignView(APIView):
    permission_classes = [IsAuthenticated, IsOwner |
                          (HasBusinessBranchAccess & HasMethodAccess)]
    required_permission = ['personnel.add_personnel']

    def post(self, request, user_id, slug):
        user = get_object_or_404(User, pk=user_id)
        business = get_object_or_404(Business, slug=slug)

        # Check object permissions
        self.check_object_permissions(request, business)

        serializer = PersonnelAssignSerializer(
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


class PersonnelUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner |
                          (HasBusinessBranchAccess & HasMethodAccess)]
    required_permission = ['personnel.change_personnel']

    def put(self, request, personnel_id, *args, **kwargs):
        personnel = get_object_or_404(Personnel, pk=personnel_id)

        # Check object permissions
        self.check_object_permissions(request, personnel.business)

        ser_data = PersonnelUpdateSerializer(
            instance=personnel, data=request.data, partial=True)
        if ser_data.is_valid():
            # update role (FK)
            if "role" in ser_data.validated_data:
                personnel.role = ser_data.validated_data["role"]

            # Save before altering M2M field(branches)
            personnel.save()

            # update M2M
            if "branches" in ser_data.validated_data:
                personnel.branches.set(ser_data.validated_data["branches"])

            return Response({"detail": "personnel updated successfully"},
                            status=status.HTTP_200_OK)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class PersonnelDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsOwner |
                          (HasBusinessBranchAccess & HasMethodAccess)]
    required_permission = ['personnel.delete_personnel']

    def delete(self, request, personnel_id, *args, **kwargs):
        # Check personnel availability
        personnel = get_object_or_404(Personnel, pk=personnel_id)

        # Check object permissions
        self.check_object_permissions(request, personnel.business)

        personnel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
