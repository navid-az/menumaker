import json
from channels.generic.websocket import AsyncWebsocketConsumer


class DashboardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        pass

    async def disconnect(self, close_code):
        pass

    # Receive messages from WebSocket (not needed much in your case, but handy)
    async def receive(self, text_data):
        pass

    # Method for broadcasting updates
    async def dashboard_update(self, event):
        pass
