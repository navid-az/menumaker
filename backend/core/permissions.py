from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwner(BasePermission):
    message = 'you have to be the owner to get access'

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
