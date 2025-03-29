from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

# dependencies
from .models import Menu, MenuGlobalStyling
from business.models import Business
from .serializers import MenuCreateSerializer, MenuListSerializer, MenuGlobalStylingSerializer

# rest dependencies
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from permissions import IsOwner

User = get_user_model()


# get list of all menus
class MenuListView(APIView):
    def get(self, request):
        all_menus = Menu.objects.all()
        srz_data = MenuListSerializer(instance=all_menus, many=True)
        return Response(data=srz_data.data)


# get all global stylings for the provided Menu
class MenuGlobalStylingView(APIView):
    def get(self, request, slug):
        try:
            menu = Menu.objects.get(business__slug=slug)
            styles = MenuGlobalStyling.objects.get(menu=menu)
            srz_data = MenuGlobalStylingSerializer(instance=styles)
            return Response(data=srz_data.data)
        except Menu.DoesNotExist:
            return Response({
                "error": "Business with the provided slug was not found.",
                "detail": "Unable to retrieve the menu's global styling data."
            }, status=status.HTTP_404_NOT_FOUND)


class MenuCreateView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def post(self, request, slug):
        business = get_object_or_404(Business, slug=slug)
        serializer = MenuCreateSerializer(data=request.data)

        self.check_object_permissions(request, business)

        if business.menus.exists():
            return Response(
                {"error": "A menu already exists for this business."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if serializer.is_valid():
            serializer.save(business=business)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
