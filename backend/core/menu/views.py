from django.shortcuts import render
from .models import Menu
from .serializers import MenuSerializer

# rest dependencies
from rest_framework.views import APIView
from rest_framework.response import Response

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
