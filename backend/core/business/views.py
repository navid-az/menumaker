from .serializers import BusinessCreateSerializer, MenuCategoriesSerializer, MenuCategoryCreateUpdateSerializer, MenuItemsSerializer, MenuItemCreateUpdateSerializer
from .models import Business, ItemCategory, Item
from menu.models import Menu

from django.shortcuts import get_object_or_404

# rest_framework dependencies
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from permissions import IsOwner
from rest_framework.response import Response
from rest_framework import status


class RegisterBusinessView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request):
        ser_data = BusinessCreateSerializer(data=request.data)

        if ser_data.is_valid():
            ser_data.save(owner=request.user)
            return Response({"message": "Business registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(ser_data.errors, status=status.HTTP_400_BAD_REQUEST)


# category CRUD views
class MenuCategoriesView(APIView):
    def get(self, request, slug):
        business = Business.objects.get(slug=slug)
        if business is not None:
            categories = ItemCategory.objects.filter(menu__business=business)
            ser_data = MenuCategoriesSerializer(instance=categories, many=True)
            return Response(ser_data.data)
        return Response('menu with this id does not exist', status.HTTP_404_NOT_FOUND)


class MenuCategoryCreateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request, slug):
        ser_data = MenuCategoryCreateUpdateSerializer(data=request.data)
        if ser_data.is_valid():
            try:
                menu = Menu.objects.get(slug=slug)
            except Menu.DoesNotExist:
                return Response({"message": "menu with this id does not exist"}, status.HTTP_404_NOT_FOUND)
            self.check_object_permissions(request, menu)
            ser_data.validated_data['menu'] = menu
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class MenuCategoryUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def put(self, request, slug, category_id):
        category = get_object_or_404(ItemCategory, pk=category_id)

        # check if the category belongs to the provided business
        if category.menu.business.slug != slug:
            return Response({"error": "This category does not belong to the provided business."}, status=status.HTTP_400_BAD_REQUEST)

        self.check_object_permissions(request, category.menu.business)

        ser_data = MenuCategoryCreateUpdateSerializer(
            instance=category, data=request.data, partial=True)

        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class MenuCategoryDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def delete(self, request, slug, category_id):
        category = get_object_or_404(ItemCategory, pk=category_id)

        # check if the category belongs to the provided business
        if category.menu.business.slug != slug:
            return Response({"error": "This category does not belong to the provided business."}, status=status.HTTP_400_BAD_REQUEST)

        self.check_object_permissions(request, category.menu.business)

        category.delete()
        return Response({'message': 'question has been deleted'}, status.HTTP_400_BAD_REQUEST)


# item CRUD views
class MenuItemsView(APIView):
    def get(self, request, slug):
        business = Business.objects.get(slug=slug)
        if business is not None:
            items = Item.objects.filter(menu__business=business)
            ser_data = MenuItemsSerializer(instance=items, many=True)
            return Response(ser_data.data)
        return Response('menu with this id does not exist', status.HTTP_404_NOT_FOUND)


class MenuItemCreateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request, slug):
        ser_data = MenuItemCreateUpdateSerializer(data=request.data)
        if ser_data.is_valid():
            menu = Menu.objects.get(slug=slug)
            self.check_object_permissions(request, menu)
            ser_data.validated_data['menu'] = menu
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class MenuItemUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def put(self, request, slug, item_id):
        item = get_object_or_404(Item, pk=item_id)

        # check if the item belongs to the provided business
        if item.menu.business.slug != slug:
            return Response({"error": "This item does not belong to the provided business."}, status=status.HTTP_400_BAD_REQUEST)

        self.check_object_permissions(request, item.menu.business)
        ser_data = MenuItemCreateUpdateSerializer(
            instance=item, data=request.data, partial=True)

        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class MenuItemDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def delete(self, request, slug, item_id):
        item = get_object_or_404(Item, pk=item_id)

        # check if the item belongs to the provided business
        if item.menu.business.slug != slug:
            return Response({"error": "This item does not belong to the provided business."}, status=status.HTTP_400_BAD_REQUEST)

        self.check_object_permissions(request, item.menu.business)

        item.delete()
        return Response({'message': 'question has been deleted'}, status.HTTP_400_BAD_REQUEST)
