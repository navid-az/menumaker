from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from .models import MediaAsset, AssetGroup, MediaCollection
from .serializers import MediaAssetSerializer, AssetGroupSerializer


class MediaAssetView(APIView):
    """
    GET  /api/media/  -> list assets, filterable by:
           ?temp_id=<uuid> pending assets from a form session
           ?collection=<name> by collection
           ?content_type=<model_name>&object_id=<id> already-attached assets
    POST /api/media/  -> upload a new (initially unattached) media asset
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        qs = MediaAsset.objects.all()

        temp_id = request.query_params.get("temp_id")
        collection = request.query_params.get("collection")
        object_id = request.query_params.get("object_id")
        model_name = request.query_params.get("content_type")

        if temp_id:
            qs = qs.filter(temp_id=temp_id)
        if collection:
            qs = qs.filter(collection=collection)
        if model_name and object_id:
            content_type = get_object_or_404(
                ContentType, model=model_name.lower())
            qs = qs.filter(content_type=content_type, object_id=object_id)

        serializer = MediaAssetSerializer(
            qs, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request):
        serializer = MediaAssetSerializer(
            data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class MediaAssetDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(MediaAsset, pk=pk)

    def get(self, request, pk):
        serializer = MediaAssetSerializer(
            self.get_object(pk), context={"request": request})
        return Response(serializer.data)

    # File itself is immutable. "replacing" a file means delete + re-upload.
    # PATCH is for metadata like `order` (used later for drag-reordering).
    def patch(self, request, pk):
        asset = self.get_object(pk)
        serializer = MediaAssetSerializer(
            asset, data=request.data, partial=True, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    # DELETE triggers the post_delete signal, which removes the physical file
    def delete(self, request, pk):
        self.get_object(pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AssetGroupView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        kind = request.query_params.get("kind")
        groups = AssetGroup.objects.filter(
            Q(created_by__isnull=True) | Q(
                created_by=request.user)
        )
        # If kind is provided, only return groups of that kind
        if kind:
            groups = groups.filter(kind=kind)

        serializer = AssetGroupSerializer(
            groups, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request):
        serializer = AssetGroupSerializer(
            data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        group = serializer.save(created_by=request.user)
        return Response(
            AssetGroupSerializer(group, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )
