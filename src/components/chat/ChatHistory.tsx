'use client';

import { useChatStore } from "@/lib/store/chatStore";

export function ChatHistory() {
  const messages = useChatStore((state) => state.messages);
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
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}