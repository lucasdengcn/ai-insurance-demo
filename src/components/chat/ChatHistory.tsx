interface Message {
  type: "user" | "assistant";
  message: string;
}

interface ChatHistoryProps {
  messages: Message[];
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[70%] rounded-lg px-4 py-2 ${message.type === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
              }`}
          >
            <p className="whitespace-pre-wrap break-words">{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}