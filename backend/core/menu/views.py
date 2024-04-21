from .models import Item, Menu
from .serializers import MenuSerializer, ItemSerializer, MenuItemsSerializer, CreateItemSerializer

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
        srz_data = ItemSerializer(instance=items, many=True)
        return Response(srz_data.data)

# new views


class MenuItemsView(APIView):

    def get(self, request, menu_id):
        menu = Menu.objects.get(menu_id=menu_id)
        if menu is not None:
            items = menu.items.all()
            ser_data = ItemSerializer(instance=items, many=True)
            return Response(ser_data.data)
        return Response('menu with this id does not exist', status.HTTP_404_NOT_FOUND)


class CreateItemView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request, menu_id):
        ser_data = ItemSerializer(data=request.data)
        if ser_data.is_valid():
            menu = Menu.objects.get(menu_id=menu_id)
            self.check_object_permissions(request, menu)
            ser_data.validated_data['menu'] = menu
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class UpdateItemView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def put(self, request, menu_id, item_id):
        item = Item.objects.get(pk=item_id)
        ser_data = ItemSerializer(
            instance=item, data=request.data, partial=True)

        if ser_data.is_valid():
            menu = Menu.objects.get(menu_id=menu_id)
            self.check_object_permissions(request, menu)
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors, status.HTTP_400_BAD_REQUEST)


class DeleteItemView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def delete(self, request, menu_id, item_id):
        menu = Menu.objects.get(menu_id=menu_id)
        self.check_object_permissions(request, menu)

        item = Item.objects.get(pk=item_id)
        item.delete()
        return Response({'message': 'question has been deleted'}, status.HTTP_400_BAD_REQUEST)


# class MenuCategoriesView(APIView):
#     def get(self, request, menu_pk):
#         menu = Menu.objects.get(pk=menu_pk)
#         categories = menu.categories.all()
