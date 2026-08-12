from datetime import timedelta

from django.contrib.auth import get_user_model
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail

from .models import Personnel
from .serializers import PersonnelListSerializer, PersonnelAssignSerializer, PersonnelUpdateSerializer
from business.models import Business, Branch

from mixins import MethodBasedPermissionsMixin

# rest_framework dependencies
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView, Response, status
from permissions import demo_or_full_access

User = get_user_model()

# ***** These API views are not following REST conventions *****
# MUST BE CHANGED


class PersonnelListView(APIView):

    def get(self, request, business_slug):
        branch_slug = request.query_params.get('branch_slug')
        business = get_object_or_404(Business, slug=business_slug)

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


# generate a JWT token for personnel invitation
def generate_invite_token(personnel):
    token = RefreshToken()
    token["type"] = "invite"
    token["personnel_id"] = personnel.id
    token["email"] = personnel.invited_email
    token['first_name'] = personnel.first_name
    token['last_name'] = personnel.last_name
    token.set_exp(lifetime=timedelta(hours=48))
    return str(token)


class PersonnelAssignView(MethodBasedPermissionsMixin, APIView):
    permission_classes_by_method = {'POST': [demo_or_full_access]}
    required_permission_by_method = {'POST': ['personnel.add_personnel']}
    required_feature = ['personnel_management']

    def post(self, request, slug):
        # user = get_object_or_404(User, pk=user_id)
        business = get_object_or_404(Business, slug=slug)

        # Check object permissions
        self.check_object_permissions(request, business)

        serializer = PersonnelAssignSerializer(
            data=request.data,
            context={"business_slug": business.slug}
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
        validated_data = serializer.validated_data
        validated_data.pop('branches')
        with transaction.atomic():
            personnel = Personnel.objects.create(
                **validated_data, business=business
            )
            personnel.branches.set(branches)

        # Send an email with an invitation link
        token = generate_invite_token(personnel)
        invite_link = f"http://localhost:3000/register/?token={token}"

        subject = f"You're invited to join {personnel.business} team!"
        message = f"""
        Hi {personnel.first_name or 'there'},

        You've been invited to join our staff.
        Click the link below to accept the invitation and register:

        {invite_link}

        This link will expire in 48 hours.
        """

        send_mail(
            subject,
            message,
            "no-reply@example.com",
            [personnel.invited_email],
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PersonnelUpdateView(MethodBasedPermissionsMixin, APIView):
    permission_classes_by_method = {'PATCH': [demo_or_full_access]}
    required_permission_by_method = {'PATCH': ['personnel.change_personnel']}
    required_feature = ['personnel_management']

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


class PersonnelDeleteView(MethodBasedPermissionsMixin, APIView):
    permission_classes_by_method = {'DELETE': [demo_or_full_access]}
    required_permission_by_method = {'DELETE': ['personnel.delete_personnel']}
    required_feature = ['personnel_management']

    def delete(self, request, personnel_id, *args, **kwargs):
        # Check personnel availability
        personnel = get_object_or_404(Personnel, pk=personnel_id)

        # Check object permissions
        self.check_object_permissions(request, personnel.business)

        personnel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
