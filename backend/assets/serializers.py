from rest_framework import serializers
from .models import MediaAsset, AssetGroup, MEDIA_COLLECTION_LIMITS, attach_media_assets


class MediaAssetSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = MediaAsset
        fields = ["id", "file", "url", "media_type",
                  "collection", "temp_id", "order", "created"]
        read_only_fields = ["id", "created"]
        extra_kwargs = {"file": {"write_only": True}}

    def get_url(self, obj):
        request = self.context.get("request")
        if not obj.file:
            return None
        return request.build_absolute_uri(obj.file.url) if request else obj.file.url

    def validate(self, attrs):
        collection = attrs.get("collection")
        temp_id = attrs.get("temp_id")
        limit = MEDIA_COLLECTION_LIMITS.get(collection)

        if limit is not None:
            # Only count "unattached" siblings sharing this temp_id
            # The parent object doesn't exist yet at upload time.
            existing = MediaAsset.objects.filter(
                temp_id=temp_id, collection=collection, object_id__isnull=True
            ).count()
            if existing >= limit:
                raise serializers.ValidationError(
                    f"Maximum of {limit} files allowed for '{collection}'."
                )
        return attrs

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["uploaded_by"] = user if user.is_authenticated else None
        return super().create(validated_data)


class AssetGroupSerializer(serializers.ModelSerializer):
    temp_id = serializers.CharField(
        write_only=True, required=False, allow_null=True)
    assets = serializers.SerializerMethodField()

    class Meta:
        model = AssetGroup
        fields = ["id", "name", "description",
                  "kind", "created_by", "temp_id", "assets"]
        read_only_fields = ["id", "created_by"]

    def get_assets(self, obj):
        assets = obj.assets.filter(collection=obj.media_collection)
        return MediaAssetSerializer(assets, many=True, context=self.context).data

    def create(self, validated_data):
        temp_id = validated_data.pop("temp_id", None)
        group = super().create(validated_data)
        attach_media_assets(group, temp_id, group.media_collection)
        return group
