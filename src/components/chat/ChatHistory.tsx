'use client';

import { ActionMessage } from '@/components/chat/messages/ActionMessage';
import { ImageMessage } from '@/components/chat/messages/ImageMessage';
import { PdfMessage } from '@/components/chat/messages/PdfMessage';
import { TextMessage } from '@/components/chat/messages/TextMessage';
import { ChatMessage } from "@/lib/models/ChatMessage";
import { useBrowserStore } from '@/lib/store/browserStore';
import { useChatStore } from "@/lib/store/chatStore";
import { useTabsStore } from "@/lib/store/tabsStore";

export function ChatHistory() {
  const messages = useChatStore((state) => state.messages);
  const setActiveTab = useTabsStore((state) => state.setActiveTab);
  const setBrowserTarget = useBrowserStore((state) => state.setBrowserTarget);

  // Handle click on PDF or image message
  const handleMessageClick = (message: ChatMessage) => {
    if ((message.messageType === 'pdf' || message.messageType === 'image') && message.browserUrl) {
      setBrowserTarget(message.browserUrl, message.messageType);
      setActiveTab('browser'); // Switch to browser tab
    }
  };

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[70%] rounded-lg px-4 py-2 ${message.role === "user"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
              }`}
          >
            {message.messageType === 'pdf' ? (
              <PdfMessage
                message={message}
                role={message.role}
                onClick={() => handleMessageClick(message)}
              />
            ) : message.messageType === 'image' ? (
              <ImageMessage
                message={message}
                role={message.role}
                onClick={() => handleMessageClick(message)}
              />
            ) : message.messageType === 'action' ? (
              <ActionMessage content={message.content} role={message.role} />
            ) : (
              <TextMessage content={message.content} role={message.role} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}