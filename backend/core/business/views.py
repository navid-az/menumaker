from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.models import Q
from mixins import MethodBasedPermissionsMixin

from .serializers import (BusinessesSerializer, BusinessCreateSerializer, BranchesSerializer, BranchCreateUpdateSerializer, ReservationsSerializer, ReservationCreateUpdateSerializer,
                          TablesSerializer, TableCreateUpdateSerializer, TableAvailabilityCheckSerializer, AvailableTableSerializer, CategoriesSerializer, CategoryCreateUpdateSerializer,
                          ItemsSerializer, ItemCreateUpdateSerializer, RoleSerializer)
from .models import Business, Branch, Table, TableSession, CallWaiter, Reservation, Category, Item, ItemBranch
from personnel.models import Personnel

# rest_framework dependencies
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from permissions import IsOwner, HasBusinessBranchAccess, HasMethodAccess, HasActiveSubscription, HasFeatureAccess
from rest_framework.response import Response
from rest_framework import status

# django channels
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

User = get_user_model()


class BusinessesView(APIView):
    permission_classes_by_method = {
        'GET': [IsAuthenticated], 'POST': [IsAuthenticated]}

    # List all businesses user is associated with
    def get(self, request):
        user = request.user
        businesses = Business.objects.filter(
            Q(owner=user) | Q(personnel__user=user)
        ).distinct()

        ser_data = BusinessesSerializer(
            instance=businesses, many=True)
        return Response(data=ser_data.data)

    # Create a new business
    @transaction.atomic
    def post(self, request):
        ser_data = BusinessCreateSerializer(data=request.data)

        if ser_data.is_valid():
            business = ser_data.save(owner=request.user)

            # create a default branch for the business
            Branch.objects.create(business=business, name=business.name)

            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class BusinessDetailView(APIView):
    permission_classes_by_method = {'GET': [IsAuthenticated]}

    # Retrieve business details
    def get(self, request, business_slug):
        business = get_object_or_404(Business, slug=business_slug)
        ser_data = BusinessesSerializer(
            instance=business)
        return Response(data=ser_data.data)


# Branch CRUD views
class BranchesView(MethodBasedPermissionsMixin, APIView):
    permission_classes_by_method = {'POST': [
        IsAuthenticated, IsOwner | (HasBusinessBranchAccess & HasMethodAccess), HasActiveSubscription & HasFeatureAccess]}
    required_permission_by_method = {
        'POST': ['business.add_branch'],
    }
    required_feature = ['branch_management']

    # List all branches of a business
    def get(self, request, business_slug):
        # check business availability
        business = get_object_or_404(Business, slug=business_slug)

        branches = Branch.objects.filter(business=business)
        ser_data = BranchesSerializer(instance=branches, many=True)
        return Response(ser_data.data)

    # Create a new branch for a business
    def post(self, request, business_slug):
        # check business availability
        business = get_object_or_404(Business, slug=business_slug)

        # check business ownership
        self.check_object_permissions(request, business)

        ser_data = BranchCreateUpdateSerializer(data=request.data)
        if ser_data.is_valid():
            ser_data.save(business=business)
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class BranchDetailView(MethodBasedPermissionsMixin, APIView):
    permission_classes_by_method = {'PATCH': [
        IsAuthenticated, IsOwner | (HasBusinessBranchAccess & HasMethodAccess), HasActiveSubscription & HasFeatureAccess],
        'DELETE': [IsAuthenticated, IsOwner | (HasBusinessBranchAccess & HasMethodAccess), HasActiveSubscription & HasFeatureAccess]}
    required_permission_by_method = {
        'PATCH': ['business.change_branch'],
        'DELETE': ['business.delete_branch'],
    }
    required_feature = ['branch_management']

    # Update branch details
    def patch(self, request, branch_slug):
        # check branch availability
        branch = get_object_or_404(
            Branch, slug=branch_slug)

        # check business ownership
        self.check_object_permissions(request, branch)

        ser_data = BranchCreateUpdateSerializer(
            instance=branch, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)

    # Delete a branch
    def delete(self, request, branch_slug):
        # check branch availability
        branch = get_object_or_404(
            Branch, slug=branch_slug)

        # check business ownership
        self.check_object_permissions(request, branch)

        branch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Table CRUD views
class TablesView(MethodBasedPermissionsMixin, APIView):
    permission_classes_by_method = {'POST': [
        IsAuthenticated, IsOwner | (HasBusinessBranchAccess & HasMethodAccess), HasActiveSubscription & HasFeatureAccess]}
    required_permission_by_method = {
        'POST': ['business.add_table'],
    }
    required_feature = ['table_management']

    # List all tables of a branch
    def get(self, request, branch_slug):
        # check branch availability
        branch = get_object_or_404(
            Branch, slug=branch_slug)

        tables = Table.objects.filter(branch=branch)
        ser_data = TablesSerializer(instance=tables, many=True)
        return Response(ser_data.data)

    # Create a new table for a branch
    def post(self, request, branch_slug):
        # check branch availability
        branch = get_object_or_404(
            Branch, slug=branch_slug)

        # check business ownership
        self.check_object_permissions(request, branch)

        ser_data = TableCreateUpdateSerializer(data=request.data)
        if ser_data.is_valid():
            ser_data.save(branch=branch)
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class TableDetailView(MethodBasedPermissionsMixin, APIView):
    permission_classes_by_method = {'PATCH': [
        IsAuthenticated, IsOwner | (HasBusinessBranchAccess & HasMethodAccess), HasActiveSubscription & HasFeatureAccess],
        'DELETE': [IsAuthenticated, IsOwner | (HasBusinessBranchAccess & HasMethodAccess), HasActiveSubscription & HasFeatureAccess]}
    required_permission_by_method = {
        'PATCH': ['business.change_table'],
        'DELETE': ['business.delete_table'],
    }
    required_feature = ['table_management']

    # Update table details
    def patch(self, request, table_id):
        # check table availability
        table = get_object_or_404(
            Table, pk=table_id)

        # check business ownership
        self.check_object_permissions(request, table.branch)

        ser_data = TableCreateUpdateSerializer(
            instance=table, data=request.data, partial=True)
        if ser_data.is_valid():

            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)

    # Delete a table
    def delete(self, request, table_id):
        # check table availability
        table = get_object_or_404(
            Table, pk=table_id)

        # check business ownership
        self.check_object_permissions(request, table.branch)

        table.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TableSessionView(MethodBasedPermissionsMixin, APIView):

    def get(self, request, table_code, *args, **kwargs):
        table = get_object_or_404(Table, code=table_code)

        # Look for an existing active session for this table
        session = TableSession.objects.filter(
            table=table, is_active=True).first()

        # If there is a session, check if it's still valid
        if session and not session.is_expired():
            return Response({
                "status": "active_session",
                "session_code": session.code,
                "table_code": table.code
            })
        return Response({
            "status": "no_active_session",
            "table_code": table.code
        })

    def post(self, request, table_code, *args, **kwargs):
        table = get_object_or_404(Table, code=table_code)

        # check business ownership
        self.check_object_permissions(request, table.branch)

        # Check for existing valid session first
        existing_session = TableSession.objects.filter(
            table=table,
            is_active=True
        ).first()

        if existing_session:
            # deactivate existing session if expired
            if existing_session.is_expired():
                existing_session.is_active = False
                existing_session.save()
            return Response({
                "status": "active",
                "session_code": existing_session.code,
                "table_code": table.code,
                "expires_at": existing_session.expires_at.isoformat()
            })

        # Create new session atomically
        with transaction.atomic():
            TableSession.objects.filter(
                table=table,
                is_active=True
            ).update(is_active=False)

            new_session = TableSession.objects.create(
                table=table,
                is_active=True
            )

        self._notify_dashboard(new_session)

        return Response({
            "status": "created",
            "session_code": new_session.code,
            "table_code": table.code,
            "expires_at": new_session.expires_at.isoformat()
        }, status=status.HTTP_201_CREATED)

    def _notify_dashboard(self, session):
        """Send real-time update to dashboard."""
        channel_layer = get_channel_layer()
        group_name = (
            f"dashboard_{session.table.branch.business.slug}_"
            f"{session.table.branch.slug}"
        )

        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                "type": "dashboard.update",
                "event": "create_session",
                "payload": {
                    "code": session.table.code,
                    "started_at": session.started_at.isoformat(),
                    "expires_at": session.expires_at.isoformat(),
                    "is_active": session.is_active,
                },
            }
        )


class CheckTableAvailability(MethodBasedPermissionsMixin, APIView):
    def post(self, request):
        ser_data = TableAvailabilityCheckSerializer(data=request.data)

        if ser_data.is_valid():
            data = ser_data.validated_data
            start_dt = data['start_dt']
            branch_slug = data['branch_slug']
            party_size = data['party_size']
            duration = data['duration_minutes']
            end_dt = start_dt + timezone.timedelta(minutes=duration)

            # Get all tables for this business with enough seats
            candidate_tables = Table.objects.filter(
                branch__slug=branch_slug, seats__gte=party_size)

            # Check for conflicting reservations
            conflicting_reservations = Reservation.objects.filter(
                table__branch__slug=branch_slug, status__in=[
                    'pending', 'confirmed'],
                reservation_start__lt=end_dt, reservation_end__gt=start_dt).values_list('table__id', flat=True)

            # Find tables with table sessions overlapping the requested time
            conflicting_session_table_ids = TableSession.objects.filter(
                Q(expires_at__isnull=True) | Q(expires_at__gt=start_dt),
                table__branch__slug=branch_slug,
                is_active=True,
                started_at__lt=end_dt,
            ).values_list('table_id', flat=True)

            blocked_table_ids = set(
                conflicting_reservations) | set(conflicting_session_table_ids)

            available_tables = candidate_tables.exclude(
                id__in=blocked_table_ids)

            # Serialize and return
            # can use TablesSerializer serializer instead for more sophisticated data returns
            tables_serializer = AvailableTableSerializer(
                instance=available_tables, many=True)
            return Response(tables_serializer.data, status=status.HTTP_200_OK)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class CallWaiterView(MethodBasedPermissionsMixin, APIView):

    def post(self, request, session_code, *args, **kwargs):
        session = get_object_or_404(
            TableSession, code=session_code, is_active=True)

        # Check if an active call already exists (e.g. < 2 minutes old & not resolved)
        count_down = timezone.now() - timezone.timedelta(minutes=2)
        active_call = CallWaiter.objects.filter(table_session__code=session_code,
                                                created_at__gte=count_down, resolved=False).first()

        if active_call:
            return Response({"message": "A call waiter request is already active for this session.", "call_id": active_call.id}, status=status.HTTP_409_CONFLICT)
        # Otherwise, create a new call
        call = CallWaiter.objects.create(table_session=session)

        # Send data to client in-real-time
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"dashboard_{call.table_session.table.branch.business.slug}_{call.table_session.table.branch.slug}", {
                "type": "dashboard.update",
                "event": "call_waiter",
                "payload": {
                    "code": call.table_session.table.code,
                    "resolved": call.resolved,
                    "created_at": call.created_at.isoformat(),
                    "expires_at": call.expires_at.isoformat()
                },
            },)
        return Response({"message": "Waiter called.", "call_id": call.id}, status=status.HTTP_201_CREATED)


class CallWaiterDetailView(MethodBasedPermissionsMixin, APIView):
    permission_classes_by_method = {'PATCH': [
        IsAuthenticated, IsOwner | (HasBusinessBranchAccess & HasMethodAccess)]}
    required_permission_by_method = {
        'PATCH': ['business.change_callwaiter'],
    }

    # Resolve an active call waiter request
    def patch(self, request, session_code, *args, **kwargs):
        session = get_object_or_404(
            TableSession, code=session_code, is_active=True)

        call = CallWaiter.objects.filter(
            table_session=session, resolved=False).last()
        if not call:
            return Response(
                {"detail": "No active call to resolve."},
                status=status.HTTP_404_NOT_FOUND
            )

        if call.is_expired():
            return Response(
                {"detail": "This call is already expired."},
                status=status.HTTP_400_BAD_REQUEST
            )

        call.resolved = True
        call.save()

        return Response(
            {"detail": "Call resolved successfully."},
        )


class Reservations(MethodBasedPermissionsMixin, APIView):
    permission_classes_by_method = {'POST': [IsAuthenticated]}

    def get(self, request, table_id):
        # check table availability
        table = get_object_or_404(Table, pk=table_id)
        reservations = Reservation.objects.filter(table=table)
        ser_data = ReservationsSerializer(instance=reservations, many=True)
        return Response(ser_data.data)

    def post(self, request, table_id):
        # check table availability
        table = get_object_or_404(Table, pk=table_id)

        ser_data = ReservationCreateUpdateSerializer(data=request.data)
        if ser_data.is_valid():
            ser_data.save(table=table)
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class ReservationDetailView(MethodBasedPermissionsMixin, APIView):
    pass


# Category CRUD views
class CategoriesView(MethodBasedPermissionsMixin, APIView):
    permission_classes_by_method = {'POST': [
        IsAuthenticated, IsOwner | (HasBusinessBranchAccess & HasMethodAccess)]}
    required_permission_by_method = {
        'POST': ['business.add_category'],
    }

    # List all categories of a business
    def get(self, request, business_slug):
        # check business availability
        business = get_object_or_404(Business, slug=business_slug)

        categories = Category.objects.filter(business=business)
        ser_data = CategoriesSerializer(instance=categories, many=True)
        return Response(ser_data.data)

    # Create a new category for a business
    def post(self, request, business_slug):

        # check business availability
        business = get_object_or_404(Business, slug=business_slug)

        # check business ownership
        self.check_object_permissions(request, business)

        ser_data = CategoryCreateUpdateSerializer(data=request.data)
        if ser_data.is_valid():
            ser_data.save(business=business)
            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class CategoryDetailView(APIView):
    permission_classes_by_method = {'PATCH': [
        IsAuthenticated, IsOwner | (HasBusinessBranchAccess & HasMethodAccess)],
        'DELETE': [IsAuthenticated, IsOwner | (HasBusinessBranchAccess & HasMethodAccess)]}
    required_permission_by_method = {
        'PATCH': ['business.change_category'],
        'DELETE': ['business.delete_category'],
    }

    def patch(self, request, category_id):
        # check category availability
        category = get_object_or_404(
            Category, pk=category_id)

        # check business ownership
        self.check_object_permissions(request, category.business)

        ser_data = CategoryCreateUpdateSerializer(
            instance=category, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, category_id):
        # check category availability
        category = get_object_or_404(
            Category, pk=category_id)

        # check business ownership
        self.check_object_permissions(request, category.business)

        category.delete()
        return Response(status.HTTP_204_NO_CONTENT)


# Item CRUD views
# Filter out items and only return items relevant to the branch
def get_items_for_branch(items, branch):
    filtered = items.filter(
        Q(
            # Case 1: Global active items, not explicitly disabled for this branch
            Q(is_active=True)
            & ~Q(
                branch_overrides__branch=branch,
                branch_overrides__is_active=False,
            )
        )
        |
        Q(
            # Case 2: Branch-specific override enables it
            branch_overrides__branch=branch,
            branch_overrides__is_active=True
        )
    )
    return filtered.distinct()


class ItemsView(MethodBasedPermissionsMixin, APIView):
    permission_classes_by_method = {'POST': [
        IsAuthenticated, IsOwner | (HasBusinessBranchAccess & HasMethodAccess)]}
    required_permission_by_method = {
        'POST': ['business.add_item'],
    }

    # List all items of a business, with optional branch & scope filtering
    def get(self, request, business_slug):
        branch_slug = request.query_params.get('branch_slug')  # optional
        scope = request.query_params.get('scope')  # 'visible' or 'hidden

        business = get_object_or_404(Business, slug=business_slug)

        # all business's items
        items = Item.objects.filter(business=business)

        # if branch_slug is provided, return items relevant to the branch. else, return all business's items
        # return items relevant to the branch
        if branch_slug:
            branch = Branch.objects.get(business=business, slug=branch_slug)

            # items visible to this branch
            visible_items = get_items_for_branch(items, branch)
            # items hidden from this branch
            hidden_items = items.exclude(
                pk__in=visible_items.values_list("pk", flat=True))

            if scope == 'hidden':
                # return hidden items for the branch
                ser_data = ItemsSerializer(instance=hidden_items, many=True, context={
                                           "branch_slug": branch_slug})
            else:
                # return visible items for the branch
                ser_data = ItemsSerializer(instance=visible_items, many=True, context={
                                           "branch_slug": branch_slug})
        else:
            # return all business's items
            ser_data = ItemsSerializer(instance=items, many=True)
        return Response(ser_data.data)

    # Create a new item for a business
    def post(self, request, business_slug):
        # check business availability
        business = get_object_or_404(Business, slug=business_slug)
        self.check_object_permissions(request, business)

        ser_data = ItemCreateUpdateSerializer(data=request.data)
        if ser_data.is_valid():
            # check category ownership
            category_pk = ser_data.validated_data['category'].pk
            try:
                business.categories.get(
                    pk=category_pk)
            except:
                return Response({"message": "category with this ID does not belong to the provided business"}, status.HTTP_406_NOT_ACCEPTABLE)

            ser_data.save(business=business)
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class ItemDetailView(MethodBasedPermissionsMixin, APIView):
    permission_classes_by_method = {'PATCH': [
        IsAuthenticated, IsOwner | (HasBusinessBranchAccess & HasMethodAccess)],
        'DELETE': [IsAuthenticated, IsOwner | (HasBusinessBranchAccess & HasMethodAccess)]}
    required_permission_by_method = {
        'PATCH': ['business.change_item'],
        'DELETE': ['business.delete_item'],
    }

    def patch(self, request, item_id):
        branch_slug = request.query_params.get('branch_slug')
        # check item availability
        item = get_object_or_404(
            Item, pk=item_id)

        # check business ownership
        self.check_object_permissions(request, item.business)

        ser_data = ItemCreateUpdateSerializer(
            instance=item, data=request.data, partial=True)
        if ser_data.is_valid():
            # Branch specific update if branch_slug provided. If not, global update
            if branch_slug:
                branch = Branch.objects.get(
                    business=item.business, slug=branch_slug)
                override = ItemBranch.objects.filter(
                    item=item, branch=branch).first()

                # Current effective values
                current_la = override.is_active if override else item.is_active
                current_lav = override.is_available if override else item.is_available

                # Get new values – fall back to current if not provided
                la = ser_data.validated_data.get("is_active", current_la)
                lav = ser_data.validated_data.get("is_available", current_lav)

                # Compare against global values
                ga = item.is_active
                gav = item.is_available

                if la == ga and lav == gav:
                    # matches global => remove override if exists
                    if override:
                        override.delete()
                else:
                    # differs from global => create or update override
                    ItemBranch.objects.update_or_create(
                        item=item,
                        branch=branch,
                        defaults={"is_active": la, "is_available": lav},
                    )
            else:
                # Check if the category belongs to the business which this item is associated with
                new_category = ser_data.validated_data.get('category')
                if new_category:  # Only check if category is being updated
                    if new_category.business != item.business:
                        return Response(
                            {"error": "category with this ID does not belong to the provided business"},
                            status=status.HTTP_406_NOT_ACCEPTABLE
                        )
                ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, item_id):
        # check item availability
        item = get_object_or_404(
            Item, pk=item_id)

        # check business ownership
        self.check_object_permissions(request, item.business)

        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# move to personnel app !!!
# check user role
class RoleView(APIView):
    def get(self, request, slug):
        user = get_object_or_404(User, pk=request.user.id)
        business = get_object_or_404(Business, slug=slug)

        # Check if this user is the owner of the business
        if business.owner == user:
            return Response(
                {"role": "Owner"},
                status=status.HTTP_200_OK
            )

        # Try to find a Personnel assignment
        personnel = Personnel.objects.filter(
            user=user, business=business).first()
        if not personnel:
            return Response(
                {"error": "User has no role assigned under this business"},
                status=status.HTTP_404_NOT_FOUND
            )

        ser_data = RoleSerializer(personnel)
        return Response(ser_data.data, status=status.HTTP_200_OK)
