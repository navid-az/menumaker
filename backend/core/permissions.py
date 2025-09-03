from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied, ValidationError
from business.models import Business, Branch
from django.contrib.auth.models import Permission


class IsOwner(BasePermission):
    message = 'you have to be the owner to get access'

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class HasBranchAccess(BasePermission):
    def has_permission(self, request, view):
        # Extract business_slug from URL kwargs
        business_slug = view.kwargs.get('slug')
        if not business_slug:
            raise ValidationError(
                {"error": "Business slug must be provided in the URL."})

        # Validate business_slug
        try:
            business = Business.objects.get(slug=business_slug)
        except Business.DoesNotExist:
            raise PermissionDenied("Invalid business slug.")

        # Extract branch_slug (optional, from query params or body)
        if request.method in ['POST', 'PATCH', 'PUT']:
            branch_slug = request.data.get(
                'branch_slug') or request.query_params.get('branch_slug')
        else:
            branch_slug = request.query_params.get(
                'branch_slug') or request.data.get('branch_slug')

        # If branch_slug is provided, validate it
        branch = None
        if branch_slug:
            try:
                branch = Branch.objects.get(
                    slug=branch_slug, business=business)
            except Branch.DoesNotExist:
                raise PermissionDenied(
                    "Invalid branch slug or branch does not belong to the specified business.")

        # Check Personnel assignment
        assignment_query = request.user.assignments.filter(
            business=business)
        if branch:
            assignment_query = assignment_query.filter(branch=branch)
        if not assignment_query.exists():
            raise PermissionDenied("No access to this business/branch.")

        # Get required permission(s)
        required_perms = getattr(view, 'required_permission', None)
        if not required_perms:
            raise PermissionDenied(
                "View does not specify required permission.")

        personnel = assignment_query.first()
        if not personnel.role:
            return False  # No role assigned

        # Validate and check permissions
        for perm in required_perms:
            # Each perm is consist of app label and a code name
            perm_parts = perm.split('.')
            app_label, codename = perm_parts

            perm_exists = Permission.objects.filter(
                codename=codename, content_type__app_label=app_label
            ).exists()

            if not perm_exists:
                return False  # Invalid permission

            # Check if role has the permission
            has_perm = personnel.role.permissions.filter(
                codename=codename,
                content_type__app_label=app_label
            ).exists()
            if has_perm:
                return True  # At least one required permission is present

        return False  # No required permissions found in role

    def has_object_permission(self, request, view, obj):
        # Extract business_slug from URL kwargs
        slug = view.kwargs.get('slug')
        if not slug:
            return False

        # Validate business_slug
        try:
            business = Business.objects.get(slug=slug)
        except Business.DoesNotExist:
            return False

        # Extract branch_slug (optional, from query params or body)
        if request.method in ['PATCH', 'PUT']:
            branch_slug = request.data.get(
                'branch_slug') or request.query_params.get('branch_slug')
        else:
            branch_slug = request.query_params.get(
                'branch_slug') or request.data.get('branch_slug')

        # If branch_slug is provided, validate it
        branch = None
        if branch_slug:
            try:
                branch = Branch.objects.get(
                    slug=branch_slug, business=business)
            except Branch.DoesNotExist:
                return False

        # Check object belongs to business/branch and user has assignment
        assignment_query = request.user.assignments.filter(
            business=business)
        if branch:
            assignment_query = assignment_query.filter(branch=branch)
            if not hasattr(obj, 'branch') or obj.branch != branch:
                return False
        return assignment_query.exists()


class HasMethodPermission(BasePermission):
    pass
