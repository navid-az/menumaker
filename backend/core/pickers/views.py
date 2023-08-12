from django.shortcuts import render
from .models import IconGroup, Icon
from .serializers import IconGroupSerializer

# rest dependencies
from rest_framework.views import APIView
from rest_framework.response import Response


class IconPickerView(APIView):
    def get(self, request):
        groups = IconGroup.objects.all()
        srz_data = IconGroupSerializer(instance=groups, many=True)
        return Response(data=srz_data.data)
