from .serializers import (BusinessesSerializer, BusinessCreateSerializer, BranchesSerializer, BranchCreateUpdateSerializer,
                          TablesSerializer, TableCreateUpdateSerializer, CategoriesSerializer, CategoryCreateUpdateSerializer,
                          ItemsSerializer, ItemCreateUpdateSerializer)
from .models import Business, Branch, Table, TableSession, CallWaiter, Category, Item, ItemBranch
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models import Q

# rest_framework dependencies
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from permissions import IsOwner
from rest_framework.response import Response
from rest_framework import status

# django channels
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


class BusinessView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def get(self, request, slug):
        business = Business.objects.get(slug=slug)
        ser_data = BusinessesSerializer(
            instance=business)
        return Response(data=ser_data.data)


class BusinessesView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def get(self, request, id):
        user = get_user_model().objects.get(pk=id)
        owned_businesses = user.businesses.all()
        ser_data = BusinessesSerializer(
            instance=owned_businesses, many=True)
        return Response(data=ser_data.data)


class BusinessCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        ser_data = BusinessCreateSerializer(data=request.data)

        if ser_data.is_valid():
            business = ser_data.save(owner=request.user)

            # create a default branch for the business
            Branch.objects.create(business=business, name=business.name)

            return Response(ser_data.data, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


class BranchesView(APIView):
    def get(self, request, slug):
        # check business availability
        try:
            business = Business.objects.get(slug=slug)
        except Business.DoesNotExist:
            return Response({'error': 'business with this ID does not exist'}, status=status.HTTP_404_NOT_FOUND)

        branches = Branch.objects.filter(business=business)
        ser_data = BranchesSerializer(instance=branches, many=True)
        return Response(ser_data.data)


class BranchCreateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request, slug):
        ser_data = BranchCreateUpdateSerializer(data=request.data)

        # check business availability
        try:
            business = Business.objects.get(slug=slug)
            # check business ownership
            self.check_object_permissions(request, business)
        except Business.DoesNotExist:
            return Response({"error": "business with this ID does not exist"}, status.HTTP_404_NOT_FOUND)

        if ser_data.is_valid():
            ser_data.validated_data['business'] = business
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class BranchUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def put(self, request, slug, branch_id):
        # check branch availability
        branch = get_object_or_404(Branch, pk=branch_id)

        # check branch ownership
        if branch.business.slug != slug:
            return Response({"error": "branch with this ID does not belong to the provided business"}, status=status.HTTP_406_NOT_ACCEPTABLE)

        ser_data = BranchCreateUpdateSerializer(
            instance=branch, data=request.data, partial=True)

        if ser_data.is_valid():
            # check business ownership
            self.check_object_permissions(request, branch.business)

            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class BranchDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def delete(self, request, slug, branch_id):
        # check branch availability
        branch = get_object_or_404(Branch, pk=branch_id)

        # check branch ownership
        if branch.business.slug != slug:
            return Response({"error": "branch with this ID does not belong to the provided business"}, status=status.HTTP_406_NOT_ACCEPTABLE)

        # check business ownership
        self.check_object_permissions(request, branch.business)

        branch.delete()
        return Response({'message': 'branch has been deleted'}, status.HTTP_204_NO_CONTENT)


class TablesView(APIView):
    def get(self, request, branch_slug):
        # check branch availability
        try:
            branch = Branch.objects.get(slug=branch_slug)
        except Branch.DoesNotExist:
            return Response({"error": "branch with this ID does not exist"}, status.HTTP_404_NOT_FOUND)

        tables = Table.objects.filter(branch=branch)
        ser_data = TablesSerializer(instance=tables, many=True)
        return Response(ser_data.data)


class TableCreateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request, branch_slug):
        ser_data = TableCreateUpdateSerializer(data=request.data)
        # check business availability
        try:
            branch = Branch.objects.get(slug=branch_slug)

        except Branch.DoesNotExist:
            return Response({"error": "branch with this ID does not exist"}, status.HTTP_404_NOT_FOUND)

        if ser_data.is_valid():
            # check business ownership
            self.check_object_permissions(request, branch.business)

            ser_data.validated_data['branch'] = branch
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class TableUpdateView(APIView):
    def put(self, request, branch_slug, table_id):
        # check table availability
        table = get_object_or_404(Table, pk=table_id)

        # check branch ownership
        if table.branch.slug != branch_slug:
            return Response({"error": "table with this ID does not belong to the provided branch"}, status=status.HTTP_406_NOT_ACCEPTABLE)

        ser_data = TableCreateUpdateSerializer(
            instance=table, data=request.data, partial=True)

        if ser_data.is_valid():
            # check business ownership
            self.check_object_permissions(request, table.branch.business)

            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class TableDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def delete(self, request, branch_slug, table_id):
        # check table availability
        table = get_object_or_404(Table, pk=table_id)

        # check branch ownership
        if table.branch.slug != branch_slug:
            return Response({"error": "table with this ID does not belong to the provided branch"}, status=status.HTTP_406_NOT_ACCEPTABLE)

        # check business ownership
        self.check_object_permissions(request, table.branch.business)

        table.delete()
        return Response({'message': 'table has been deleted'}, status.HTTP_204_NO_CONTENT)


class CheckTableSessionView(APIView):
    def get(self, request, table_code):
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
            }, status=status.HTTP_200_OK)
        # If no valid session, deactivate old one if exists
        if session:
            session.is_active = False
            session.save()
        # Create a new session
        new_session = TableSession.objects.create(
            table=table, is_active=True)

        # Send data to client in-real-time
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"dashboard_{new_session.table.branch.business.slug}_{new_session.table.branch.slug}", {
                "type": "dashboard.update",
                "event": "create_session",
                "payload": {
                    "code": new_session.table.code,
                    "started_at": new_session.started_at.isoformat(),
                    "expires_at": new_session.expires_at.isoformat(),
                    "is_active": new_session.is_active,
                },
            },)

        return Response({
            "status": "new_session",
            "session_code": new_session.code,
            "table_code": table.code
        }, status=status.HTTP_201_CREATED)


class CallWaiterCreateView(APIView):
    def post(self, request, session_code):
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


class CallWaiterResolveView(APIView):
    def post(self, request, session_code):
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
            status=status.HTTP_200_OK
        )


# category CRUD views
class CategoriesView(APIView):
    def get(self, request, slug):
        # check business availability
        try:
            business = Business.objects.get(slug=slug)
        except Business.DoesNotExist:
            return Response({'error': 'business with this ID does not exist'}, status=status.HTTP_404_NOT_FOUND)

        categories = Category.objects.filter(business=business)
        ser_data = CategoriesSerializer(instance=categories, many=True)
        return Response(ser_data.data)


class CategoryCreateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request, slug):
        ser_data = CategoryCreateUpdateSerializer(data=request.data)
        # check business availability
        try:
            business = Business.objects.get(slug=slug)
            # check business ownership
            self.check_object_permissions(request, business)
        except Business.DoesNotExist:
            return Response({"error": "business with this ID does not exist"}, status.HTTP_404_NOT_FOUND)

        if ser_data.is_valid():
            ser_data.validated_data['business'] = business
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class CategoryUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def put(self, request, slug, category_id):
        # check category availability
        category = get_object_or_404(Category, pk=category_id)

        # check category ownership
        if category.business.slug != slug:
            return Response({"error": "category with this ID does not belong to the provided business"}, status=status.HTTP_406_NOT_ACCEPTABLE)

        ser_data = CategoryCreateUpdateSerializer(
            instance=category, data=request.data, partial=True)

        if ser_data.is_valid():
            # check business ownership
            self.check_object_permissions(request, category.business)

            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class CategoryDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def delete(self, request, slug, category_id):
        # check item availability
        category = get_object_or_404(Category, pk=category_id)

        # check category ownership
        if category.business.slug != slug:
            return Response({"error": "category with this ID does not belong to the provided business"}, status=status.HTTP_406_NOT_ACCEPTABLE)

        # check business ownership
        self.check_object_permissions(request, category.business)

        category.delete()
        return Response({'message': 'category has been deleted'}, status.HTTP_204_NO_CONTENT)


def get_items_for_branch(items, branch):
    filtered = items.filter(
        Q(
            # Case 1: Global items that are not explicitly disabled for this branch
            Q(is_active=True, is_available=True)
            & ~Q(
                branch_overrides__branch=branch,
                branch_overrides__is_active=False,
                branch_overrides__is_available=False,
            )
        )
        |
        Q(
            # Case 2: Branch-only items
            is_active=False,
            is_available=False,
            branch_overrides__branch=branch,
            branch_overrides__is_active=True,
            branch_overrides__is_available=True,
        )
    )
    return filtered


# item CRUD views
class ItemsView(APIView):
    def get(self, request, slug):
        branch_slug = request.query_params.get('branch_slug')

        # check if business exists
        try:
            business = Business.objects.get(slug=slug)
        except Business.DoesNotExist:
            return Response({'error': 'business with this ID does not exist'}, status=status.HTTP_404_NOT_FOUND)

        items = Item.objects.filter(business=business)
        if branch_slug:
            branch = Branch.objects.get(business=business, slug=branch_slug)
            filtered_items = get_items_for_branch(items, branch)
            ser_data = ItemsSerializer(instance=filtered_items, many=True)
        else:
            ser_data = ItemsSerializer(instance=items, many=True)
        return Response(ser_data.data)


class ItemCreateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request, slug):
        ser_data = ItemCreateUpdateSerializer(data=request.data)
        # check business availability
        try:
            business = Business.objects.get(slug=slug)
            # check business ownership
            self.check_object_permissions(request, business)
        except Business.DoesNotExist:
            return Response({"message": "business with this ID does not exist"}, status.HTTP_404_NOT_FOUND)

        if ser_data.is_valid():
            # check category ownership
            category_pk = ser_data.validated_data['category'].pk
            try:
                business.categories.get(
                    pk=category_pk)
            except:
                return Response({"message": "item with this ID does not belong to the provided business"}, status.HTTP_406_NOT_ACCEPTABLE)

            ser_data.validated_data['business'] = business
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class ItemUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def put(self, request, slug, item_id):
        # check item availability
        item = get_object_or_404(Item, pk=item_id)

        # check item ownership
        if item.business.slug != slug:
            return Response({"error": "item with this ID does not belong to the provided business"}, status.HTTP_406_NOT_ACCEPTABLE)

        # check business ownership
        self.check_object_permissions(request, item.business)

        ser_data = ItemCreateUpdateSerializer(
            instance=item, data=request.data, partial=True)

        if ser_data.is_valid():
            # Check if the new category belongs to the business which this item is associated with
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


class ItemDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def delete(self, request, slug, item_id):
        # check item availability
        item = get_object_or_404(Item, pk=item_id)

        # check item ownership
        if item.business.slug != slug:
            return Response({"error": "item with this ID does not belong to the provided business"}, status=status.HTTP_406_NOT_ACCEPTABLE)

        # check business ownership
        self.check_object_permissions(request, item.business)

        item.delete()
        return Response({'message': 'item has been deleted'}, status.HTTP_204_NO_CONTENT)
