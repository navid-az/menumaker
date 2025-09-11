from rest_framework import serializers
from .models import Personnel


class PersonnelListSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    branches = serializers.SerializerMethodField()

    class Meta:
        model = Personnel
        fields = ['user', 'branches', 'role', 'is_active', 'is_owner']

    def get_is_owner(self, obj):
        if obj.role.name == 'Owner':
            return True
        return False

    def get_user(self, obj):
        # prefer name, fallback to phone_number, fallback to id
        if hasattr(obj.user, "name") and obj.user.name:
            return obj.user.name
        elif hasattr(obj.user, "phone_number") and obj.user.phone_number:
            return obj.user.phone_number
        return obj.user.id

    def get_role(self, obj):
        return getattr(obj.role, "name", obj.role.id)

    def get_branches(self, obj):
        branch_names = []
        for branch in obj.branches.all():
            branch_names.append(branch.name)
        return branch_names


class PersonnelAssignSerializer(serializers.ModelSerializer):
    branches = serializers.ListField(
        child=serializers.IntegerField(),
        required=False
    )

    class Meta:
        model = Personnel
        fields = ['branches', 'role']

    def validate(self, data):
        user_id = self.context.get("user_id")
        business_slug = self.context.get("business_slug")
        branches = data.get('branches')

        # make sure both are provided
        if not user_id or not business_slug:
            raise serializers.ValidationError(
                "Missing user or business in context.")

        # check if the same user is already assigned to one of the branches under the same business
        overlapping = Personnel.objects.filter(
            user__pk=user_id,
            business__slug=business_slug,
            branches__pk__in=branches
        ).distinct()

        if overlapping.exists():
            raise serializers.ValidationError(
                "This user is already assigned as a personnel"
            )
        return data


class PersonnelUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Personnel
        fields = ['branches', 'role']
