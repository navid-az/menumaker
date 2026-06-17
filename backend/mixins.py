# allows setting permissions based on HTTP method
class MethodBasedPermissionsMixin:
    permission_classes_by_method = {}  # Default empty dict

    def get_permissions(self):
        # Get permission classes for current HTTP method (POST, GET, etc.)
        # If method not in dict, fall back to self.permission_classes
        return [
            perm() for perm in
            self.permission_classes_by_method.get(
                self.request.method,
                self.permission_classes
            )
        ]
