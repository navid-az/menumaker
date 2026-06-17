from accounts.models import User
from menu.models import Menu

# rest dependencies
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import ItemsSerializer


class ItemView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        JWT_authenticator = JWTAuthentication()

        response = JWT_authenticator.authenticate(request)
        if response is not None:
            user, tokene = response
            user = User.objects.get(pk=user.id)
            menu = Menu.objects.filter(owner=user)

            if menu.exists():
                items = menu.first().items.all()
                ser_data = ItemsSerializer(instance=items, many=True)
                return Response(ser_data.data)
            return Response("user with this id doesn't own any menus")
        return Response("no token is provided in the header or the header is missing")
