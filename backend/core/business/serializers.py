from rest_framework import serializers
from django.utils import timezone
from django.utils.text import slugify
from django.db import transaction
from django.shortcuts import get_object_or_404

from decimal import Decimal

from .models import Business, Branch, Table, TableSession, CallWaiter, Category, Item, ItemBranch, ItemOption, ItemOptionChoice, Order, OrderItem
from pickers.models import Asset
from personnel.models import Personnel
from menu.models import Menu
from subscriptions.models import Subscription

# table session serializers


class TableSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableSession
        fields = ['code', 'started_at', 'expires_at', 'is_active']


# call waiter serializers
class CallWaiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallWaiter
        fields = ['resolved', 'created_at', 'expires_at']


# table serializers
class TablesSerializer(serializers.ModelSerializer):
    active_session = serializers.SerializerMethodField()
    active_call = serializers.SerializerMethodField()
    order = serializers.SerializerMethodField()

    class Meta:
        model = Table
        fields = '__all__'

    def get_active_session(self, obj):
        session = obj.session.filter(
            is_active=True, expires_at__gt=timezone.now()).first()
        if session:
            return TableSessionSerializer(session).data
        return None

    def get_active_call(self, obj):
        session = obj.session.filter(
            is_active=True,
            expires_at__gt=timezone.now()
        ).first()
        if not session:
            return None

        call = session.waiter_calls.filter(
            resolved=False,
            expires_at__gt=timezone.now()
        ).first()
        if call:
            return CallWaiterSerializer(call).data
        return None

    def get_order(self, obj):
        session = obj.session.filter(
            is_active=True,
            expires_at__gt=timezone.now()
        ).first()
        if not session:
            return None

        order = session.orders.first()
        if order:
            return OrdersSerializer(order).data
        return None


class TableCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        exclude = ['branch', 'created', 'updated']


# branch serializers
class BranchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'


class BranchCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        exclude = ['business']


# business serializers
class BusinessesSerializer(serializers.ModelSerializer):
    has_menu = serializers.SerializerMethodField()
    subscription_status = serializers.SerializerMethodField()
    branches = BranchesSerializer(many=True, read_only=True)

    class Meta:
        model = Business
        fields = '__all__'

    def get_has_menu(self, obj):
        return Menu.objects.filter(business=obj).exists()

    def get_subscription_status(self, obj):
        sub = Subscription.objects.filter(business=obj).first()
        return sub.status if sub else None


class BusinessCreateSerializer(serializers.ModelSerializer):
    branches = BranchesSerializer(many=True, read_only=True)

    class Meta:
        model = Business
        fields = ['name', 'name_en', 'slug',
                  'service_type', 'primary_service_type', 'branch_structure', 'branches']

    def validate(self, data):
        # Generate the slug from the English name
        slug = slugify(data['name_en'])

        # Check if a Business with this slug already exists
        if Business.objects.filter(slug=slug).exists():
            raise serializers.ValidationError(
                {"slug": "A business with this slug already exists."})

        # Add the slug to the validated data
        data['slug'] = slug
        return data

    def create(self, validated_data):
        return super().create(validated_data)


# item serializers
class ItemBranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemBranch
        fields = ["branch", "is_active", "is_available"]


class ItemOptionChoicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemOptionChoice
        exclude = ['item_option']


class ItemOptionsSerializer(serializers.ModelSerializer):
    choices = ItemOptionChoicesSerializer(
        many=True, read_only=True)

    class Meta:
        model = ItemOption
        fields = ['id', 'name', 'type', 'choices', 'required']


class ItemsSerializer(serializers.ModelSerializer):
    business = serializers.SlugRelatedField(slug_field='slug', read_only=True)
    branch_exceptions = serializers.SerializerMethodField()
    options = ItemOptionsSerializer(many=True)

    class Meta:
        model = Item
        fields = '__all__'

    # return item branches if available
    def get_branch_exceptions(self, obj):
        # Retrieve branch_slug from context
        branch_slug = self.context.get("branch_slug")
        if branch_slug:
            try:
                item_branch = ItemBranch.objects.get(
                    branch__slug=branch_slug, item=obj.pk)
                return ItemBranchSerializer(item_branch).data
            except ItemBranch.DoesNotExist:
                return None
        return None


class ItemCreateUpdateSerializer(serializers.ModelSerializer):
    # needed for making exceptional items
    # for all branches (default)
    # ONLY for the branch with the given branch_slug
    # ALL branches EXCEPT branch with the given branch_slug

    # note: if branch_slug isn't provided, we assume item is being created globally (scope='all')
    scope = serializers.ChoiceField(
        choices=['all', 'except', 'only'], write_only=True, required=False, default='all')
    branch_slug = serializers.CharField(write_only=True, required=False)

    # forbids changing business updates
    business = serializers.PrimaryKeyRelatedField(read_only=True)

    is_active = serializers.BooleanField(default=True, required=False)
    is_available = serializers.BooleanField(default=True, required=False)

    class Meta:
        model = Item
        fields = ['business', 'category', 'name', 'description',
                  'image', 'price', 'scope', 'branch_slug', 'is_available', 'is_active']

    def validate(self, attrs):
        scope = attrs.get('scope', 'all')
        branch_slug = attrs.get('branch_slug')

        # validate scope and branch_slug (branch_slug is not needed when scope is not provided or 'all')
        if scope in ['only', 'except'] and not branch_slug:
            raise serializers.ValidationError({
                "branch_slug": "This field is required when scope is 'only' or 'except'."
            })

        return attrs

    def create(self, validated_data):
        scope = validated_data.pop('scope', 'all')
        branch_slug = validated_data.pop('branch_slug', None)

        # Handle branch-specific scope
        if scope not in ['only', 'except']:
            item = Item.objects.create(
                **validated_data)
        else:
            try:
                branch = Branch.objects.get(slug=branch_slug)
                validated_data.pop('is_available')
                validated_data.pop('is_active')
                if scope == 'only':
                    item = Item.objects.create(
                        **validated_data, is_available=False, is_active=False)
                    ItemBranch.objects.create(
                        item=item, branch=branch, is_available=True, is_active=True)
                elif scope == 'except':
                    item = Item.objects.create(
                        **validated_data, is_available=True, is_active=True)
                    ItemBranch.objects.create(
                        item=item, branch=branch, is_available=False, is_active=False)
            except Branch.DoesNotExist:
                raise serializers.ValidationError(
                    {"branch_slug": "Branch not found."})
        return item


class IconsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ['id', 'name', 'image']


# category serializers
class CategoriesSerializer(serializers.ModelSerializer):
    business = serializers.SlugRelatedField(slug_field='slug', read_only=True)
    items = ItemsSerializer(many=True, read_only=True)
    icon = IconsSerializer(read_only=True)

    class Meta:
        model = Category
        fields = '__all__'


class CategoryCreateUpdateSerializer(serializers.ModelSerializer):
    # forbids changing business updates
    business = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Category
        fields = '__all__'


# Full OrderItem serializer.
# Used for standalone OrderItem endpoints where the parent order reference is required.
class OrderItemSerializer(serializers.ModelSerializer):
    items = ItemsSerializer(many=True, read_only=True)

    class Meta:
        model = OrderItem
        fields = '__all__'


# Nested OrderItem serializer.
# Used inside Order responses to avoid redundant `order` field since the parent order context is already known.
class OrderItemNestedSerializer(serializers.ModelSerializer):
    price_snapshot = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True)
    name_snapshot = serializers.CharField(read_only=True)

    class Meta:
        model = OrderItem
        exclude = ['order']


# Minimal table representation for Order responses.
# Exposes only fields relevant to order context.
class TableNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['id', 'name']


class OrdersSerializer(serializers.ModelSerializer):
    session_code = serializers.CharField(write_only=True, required=True)

    branch = serializers.SlugRelatedField(read_only=True, slug_field='pk')
    table = TableNestedSerializer(read_only=True)
    items = OrderItemNestedSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['total_price']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        session_code = validated_data.pop('session_code')

        with transaction.atomic():
            order = Order.objects.create(**validated_data)

            order_items = []
            total_price = Decimal("0.00")

            for item_data in items_data:
                item_instance = item_data['item']
                quantity = item_data['quantity']

                line_total = item_instance.price * quantity
                total_price += line_total

                order_items.append(
                    OrderItem(
                        order=order,
                        item=item_instance,
                        quantity=item_data['quantity'],
                        notes=item_data.get('notes', ''),
                        name_snapshot=item_instance.name,
                        price_snapshot=item_instance.price,
                    )
                )

            OrderItem.objects.bulk_create(order_items)

            # Update order instance and attach total_price to it
            order.total_price = total_price
            order.save(update_fields=["total_price"])

        return order

    def validate_session_code(self, value):
        table_session = get_object_or_404(
            TableSession,
            code=value,
            is_active=True,
            table__branch__slug=self.context['branch_slug']

        )
        # attach table_session to context so we avoid refetching it in view
        self.context['table_session'] = table_session

        return value


class OrderUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['id', 'total_price',
                            'created_at', 'branch', 'table_session', 'items',]

    def update(self, instance, validated_data):
        new_status = validated_data.pop('status', None)

        # if status has been changed, update timestamps accordingly
        if new_status is not None and new_status != instance.status:
            instance.transition_to(new_status)

        # Apply any other allowed fields (notes, etc.)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance


# return user's role and permissions
class RoleSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source="role.name")
    permissions = serializers.SerializerMethodField()

    class Meta:
        model = Personnel
        fields = ['user', 'role', 'business', 'branches', 'permissions']

    def get_permissions(self, obj):
        return list(
            obj.role.permissions.values_list("codename", flat=True)
        )
