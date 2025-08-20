import json
from channels.generic.websocket import AsyncWebsocketConsumer


class DashboardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.business_slug = self.scope["url_route"]["kwargs"]["business_slug"]
        self.branch_slug = self.scope["url_route"]["kwargs"]["branch_slug"]

        # Group name for this dashboard
        self.group_name = f"dashboard_{self.business_slug}_{self.branch_slug}"

        # Join the group
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # Receive messages from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        print("Message from client:", data)

   # Called when a message is received from group
    async def dashboard_update(self, event):
        await self.send(text_data=json.dumps({
            "type": "dashboard_update",
            "payload": event["payload"]
        }))
