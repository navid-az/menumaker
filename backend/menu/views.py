from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

# rest dependencies
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from mixins import MethodBasedPermissionsMixin
from permissions import demo_or_full_access

# dependencies
from .models import Menu, MenuGlobalStyling
from business.models import Business
from .serializers import MenuCreateUpdateSerializer, MenuListSerializer, MenuGlobalStylingSerializer, MenuSerializer, MenuImageCreateSerializer

from assets.models import MediaCollection, attach_media_assets


User = get_user_model()


class MenuView(MethodBasedPermissionsMixin, APIView):
    permission_classes_by_method = {
        'POST': [demo_or_full_access], 'PATCH': [demo_or_full_access]}
    required_permission_by_method = {
        'POST': ['menu.add_menu'],
        'PATCH': ['menu.change_menu']
    }

    def get(self, request, business_slug):
        menu = get_object_or_404(Menu, business__slug=business_slug)

        srz_data = MenuSerializer(instance=menu)
        return Response(data=srz_data.data)

    def post(self, request, business_slug):
        business = get_object_or_404(Business, slug=business_slug)

        # Check business ownership
        self.check_object_permissions(request, business)

        serializer = MenuCreateUpdateSerializer(data=request.data)
        if business.menus.exists():
            return Response(
                {"error": "A menu already exists for this business."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if serializer.is_valid():
            validated_data = serializer.validated_data
            temp_id = validated_data.pop('temp_id')
            menu = serializer.save(business=business)
            attach_media_assets(menu, temp_id, MediaCollection.MENU_WELCOME)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, business_slug):
        business = get_object_or_404(Business, slug=business_slug)

        # Check business ownership
        self.check_object_permissions(request, business)
        menu = business.menus.first()

        serializer = MenuCreateUpdateSerializer(
            instance=menu, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(business=business)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# get all global stylings for the provided Menu
class MenuGlobalStylingView(APIView):
    def get(self, request, business_slug):
        menu = get_object_or_404(Menu, business__slug=business_slug)
        styles = get_object_or_404(MenuGlobalStyling, menu=menu)

        srz_data = MenuGlobalStylingSerializer(instance=styles)
        return Response(data=srz_data.data)


class MenuImageCreateView(APIView):
    def post(self, request, *args, **kwargs):
        images = request.FILES.getlist("images")
        if not images:
            return Response(
                {"error": "No images provided"},
                status=status.HTTP_400_BAD_REQUEST
            )

        image_refs = []
        for image in images:
            serializer = MenuImageCreateSerializer(data={"image": image})
            if serializer.is_valid():
                instance = serializer.save()
                image_refs.append({
                    "id": instance.id,
                    "image": instance.image.url,
                    "temp_id": instance.temp_id,
                })
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response({"success": True, "image_refs": image_refs}, status=status.HTTP_201_CREATED)
