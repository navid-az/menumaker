from rest_framework import serializers
from .models import Personnel


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
