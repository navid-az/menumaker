from .models import AssetGroup
from .serializers import AssetGroupSerializer

# rest dependencies
from rest_framework.views import APIView
from rest_framework.response import Response


class IconPickerView(APIView):
    def get(self, request):
        groups = AssetGroup.objects.all()
        srz_data = AssetGroupSerializer(instance=groups, many=True)
        return Response(data=srz_data.data)
