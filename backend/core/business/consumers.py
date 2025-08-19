import json
from channels.generic.websocket import AsyncWebsocketConsumer


class DashboardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.business_id = self.scope["url_route"]["kwargs"]["business_id"]
        self.branch_id = self.scope["url_route"]["kwargs"]["branch_id"]

        # Group name for this dashboard
        self.group_name = f"dashboard_{self.business_id}_{self.branch_id}"

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

    # Receive messages from WebSocket (not needed much in your case, but handy)
    async def receive(self, text_data):
        data = json.loads(text_data)
        print("Message from client:", data)

    # Method for broadcasting updates
    async def dashboard_update(self, event):
        await self.send_json({
            "event": event["event"],      # e.g. TABLE_SESSION_CREATED
            "payload": event["payload"],  # serialized data
        })
