from core.socket import socket
from core.utils.exceptions import ValidationError

from chats.views.base import BaseView
from chats.models import Chat, ChatMessage
from chats.serializers import ChatMessagesSerializer

from attachments.models import FileAttachment, AudioAttachment

from rest_framework.response import Response

from django.utils.timezone import now
from django.core.files.storage import FileSystemStorage
from django.conf import settings

import uuid


class ChatMessagesView(BaseView):
    def get(self, request, chat_id):
        # Checking if chat belongs to user
        chat = self.chat_belongs_to_user(
            user_id=request.user.id,
            chat_id=chat_id
        )

        # Marking messages as seen
        self.mark_messages_as_seen(chat_id, request.user.id)

        # Update all chat messages as seen
        socket.emit('mark_messages_as_seen', {
            "query": {
                "chat_id": chat_id,
                "exclude_user_id": request.user.id
            }
        })

        # Getting chat messages
        messages = ChatMessage.objects.filter(
            chat_id=chat.id,
            deleted_at__isnull=True
        ).order_by('created_at').all()

        serializer = ChatMessagesSerializer(messages, many=True)

        # Sending update chat to users
        socket.emit('update_chat', {
            "query": {
                "users": [chat.from_user_id, chat.to_user_id]
            }
        })

        return Response({
            "messages": serializer.data
        })
