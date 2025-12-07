from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import PermissionDenied, ValidationError
from business.models import Business, Branch
from django.contrib.auth.models import Permission


class IsOwner(BasePermission):
    message = 'you have to be the owner to get access'

    def has_object_permission(self, request, view, obj):
        if isinstance(obj, Business):
            return obj.owner == request.user
        elif isinstance(obj, Branch):
            return obj.business.owner == request.user


class HasBusinessBranchAccess(BasePermission):
    """
    check if the user has access to the business and optionally to the branch. 
    """

    def has_object_permission(self, request, view, obj):
        # Resolve business & optional branch
        business, branch = None, None

        if isinstance(obj, Branch):
            # CASE 1: Object is Branch → immediate and final
            branch = obj
            business = obj.business

        else:
            # CASE 2 & 3: obj is Business or None → attempt branch fallback

            if isinstance(obj, Business):
                business = obj

            # attempt fallback branch_slug lookup
            branch_slug = (
                request.query_params.get("branch_slug")
                or request.data.get("branch_slug")
            )

            if branch_slug:
                try:
                    branch = Branch.objects.select_related("business").get(
                        slug=branch_slug
                    )
                    business = branch.business
                except Branch.DoesNotExist:
                    raise PermissionDenied(
                        "Invalid branch slug or branch does not belong to this business."
                    )

        # Business-level assignment
        assignment_qs = request.user.assignments.filter(business=business)
        if not assignment_qs.exists():
            raise PermissionDenied("No access to this business.")
        personnel = assignment_qs.first()

        # Branch-level restriction (only if branch exists)
        if branch:
            if not personnel.branches.filter(id=branch.id).exists():
                raise PermissionDenied("No access to this branch.")

        # Set request.personnel to the Personnel instance if access is granted.
        request.personnel = personnel
        return True


class HasMethodAccess(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Get required permission(s)
        required_perms_dict = getattr(
            view, 'required_permission_by_method', None)

        if required_perms_dict:
            required_perms = required_perms_dict.get(request.method)
        else:
            # Fallback for when required_perms_dict isn't provided
            required_perms = getattr(view, 'required_permission', None)

        if not required_perms:
            return False

        # Get Personnel from request (set by HasBusinessBranchAccess)
        personnel = getattr(request, 'personnel', None)
        if not personnel or not personnel.role:
            return False  # No personnel or role assigned

        # Check permissions
        for perm in required_perms:
            app_label, codename = perm.split('.')
            # Check if role has the permission
            has_perm = personnel.role.permissions.filter(
                codename=codename,
                content_type__app_label=app_label
            ).exists()
            if has_perm:
                return True  # At least one required permission is present
        return False  # No required permissions found in role


class HasActiveSubscription(BasePermission):
    message = 'Business does not have an active subscription.'

    def has_object_permission(self, request, view, obj):
        # Try to extract business from object
        if isinstance(obj, Business):
            business = obj
        else:
            business = getattr(obj, 'business', None)

        if not business:
            return False  # No business context

        subscription = getattr(business, 'subscription', None)

        if not subscription or subscription.is_expired():
            return False

        return True


class HasFeatureAccess(BasePermission):
    message = "Your current subscription plan does not support this feature."

    def has_object_permission(self, request, view, obj):
        required_features = getattr(view, 'required_feature', [])

        business = getattr(
            obj, "business", obj if isinstance(obj, Business) else None)
        if not business:
            return False

        subscription = getattr(business, 'subscription', None)
        if not subscription:
            return False

        for feature in required_features:
            if feature not in subscription.get_features().values_list('code', flat=True):
                print('table management is not one of the features')
                return False

        return True
