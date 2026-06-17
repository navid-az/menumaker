from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.views import APIView, Response, status
from rest_framework.permissions import IsAuthenticated
from permissions import IsOwner, HasBusinessBranchAccess, HasMethodAccess
from django.contrib.auth import get_user_model
from .models import Personnel
from .serializers import PersonnelListSerializer, PersonnelAssignSerializer, PersonnelUpdateSerializer
from business.models import Business, Branch
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from datetime import timedelta

User = get_user_model()


class PersonnelListView(APIView):
    permission_classes = [IsAuthenticated, IsOwner |
                          (HasBusinessBranchAccess & HasMethodAccess)]
    required_permission = ['personnel.view_personnel']

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


class PersonnelAssignView(APIView):
    permission_classes = [IsAuthenticated, IsOwner |
                          (HasBusinessBranchAccess & HasMethodAccess)]
    required_permission = ['personnel.add_personnel']

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
