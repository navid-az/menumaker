from django.shortcuts import render
from .models import Menu
from .serializers import MenuSerializer
# rest dependencies
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class MenuView(APIView):
    def get(self, request, menu_id):
        menu = Menu.objects.get(id=menu_id)
        srz_data = MenuSerializer(instance=menu)
        return Response(data=srz_data.data)
