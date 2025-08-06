from .serializers import (BusinessesSerializer, BusinessCreateSerializer, BranchesSerializer, BranchCreateUpdateSerializer,
                          TablesSerializer, TableCreateUpdateSerializer, CategoriesSerializer,
                          CategoryCreateUpdateSerializer, ItemsSerializer, ItemCreateUpdateSerializer)
from .models import Business, Branch, Table, Category, Item

from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

# rest_framework dependencies
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from permissions import IsOwner
from rest_framework.response import Response
from rest_framework import status


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
    def get(self, request, branch_id):
        # check branch availability
        try:
            branch = Branch.objects.get(pk=branch_id)
        except Branch.DoesNotExist:
            return Response({"error": "branch with this ID does not exist"}, status.HTTP_404_NOT_FOUND)

        tables = Table.objects.filter(branch=branch)
        ser_data = TablesSerializer(instance=tables, many=True)
        return Response(ser_data.data)


class TableCreateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request, branch_id):
        ser_data = TableCreateUpdateSerializer(data=request.data)
        # check business availability
        try:
            branch = Branch.objects.get(pk=branch_id)
        except Branch.DoesNotExist:
            return Response({"error": "branch with this ID does not exist"}, status.HTTP_404_NOT_FOUND)

        if ser_data.is_valid():
            ser_data.validated_data['branch'] = branch
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class TableUpdateView(APIView):
    def put(self, request, branch_id, table_id):
        # check table availability
        table = get_object_or_404(Table, pk=table_id)

        # check branch ownership
        if table.branch.pk != branch_id:
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
    def put(request, self, table_id):
        pass


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


# item CRUD views
class ItemsView(APIView):
    def get(self, request, slug):
        # check if business exists
        try:
            business = Business.objects.get(slug=slug)
        except Business.DoesNotExist:
            return Response({'error': 'business with this ID does not exist'}, status=status.HTTP_404_NOT_FOUND)

        items = Item.objects.filter(business=business)
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
