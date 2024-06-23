from .models import Item, Menu, ItemCategory
from .serializers import MenuSerializer, MenuCategoriesSerializer, MenuItemsSerializer,  MenuItemCreateUpdateSerializer

# rest dependencies
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from permissions import IsOwner


class MenuView(APIView):
    def get(self, request):
        all_menus = Menu.objects.all()
        srz_data = MenuSerializer(instance=all_menus, many=True)
        return Response(data=srz_data.data)


class SingleMenuView(APIView):
    def get(self, request, menuId):
        menu = Menu.objects.get(pk=menuId)
        srz_data = MenuSerializer(instance=menu)
        return Response(data=srz_data.data)


class SingleMenuItemsView(APIView):
    def get(self, request, menuId):
        menu = Menu.objects.get(pk=menuId)
        items = menu.items.all()
        srz_data = MenuItemsSerializer(instance=items, many=True)
        return Response(srz_data.data)


# item CRUD views
class MenuCategoriesView(APIView):
    def get(self, request, slug):
        menu = Menu.objects.get(slug=slug)
        if menu is not None:
            categories = menu.categories.all()
            ser_data = MenuCategoriesSerializer(instance=categories, many=True)
            return Response(ser_data.data)
        return Response('menu with this id does not exist', status.HTTP_404_NOT_FOUND)


class MenuCategoryDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def delete(self, request, slug, category_id):
        menu = Menu.objects.get(slug=slug)
        self.check_object_permissions(request, menu)
        if menu is not None:
            category = ItemCategory.objects.get(pk=category_id)
            if menu is not None:
                category.delete()
                return Response({"message": "The Category has been successfully deleted"}, status.HTTP_200_OK)
            return Response({"message": "Category with the specified ID doesn't exist"}, status.HTTP_404_NOT_FOUND)
        return Response({"message": "Menu with the specified ID doesn't exist"}, status.HTTP_404_NOT_FOUND)


# item CRUD views
class MenuItemsView(APIView):
    def get(self, request, slug):
        menu = Menu.objects.get(slug=slug)
        if menu is not None:
            items = menu.items.all()
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
        item = Item.objects.get(pk=item_id)
        ser_data = MenuItemCreateUpdateSerializer(
            instance=item, data=request.data, partial=True)

        if ser_data.is_valid():
            menu = Menu.objects.get(slug=slug)
            self.check_object_permissions(request, menu)
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class MenuItemDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def delete(self, request, slug, item_id):
        menu = Menu.objects.get(slug=slug)
        self.check_object_permissions(request, menu)

        item = Item.objects.get(pk=item_id)
        item.delete()
        return Response({'message': 'question has been deleted'}, status.HTTP_400_BAD_REQUEST)
