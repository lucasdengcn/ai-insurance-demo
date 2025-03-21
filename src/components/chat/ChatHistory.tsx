interface Message {
  type: "user" | "assistant";
  message: string;
}

// Sample chat messages
const dummyMessages: Message[] = [
  {
    type: "assistant",
    message: "Hello! How can I help you with your insurance needs today?"
  },
  {
    type: "user",
    message: "I'm looking for information about health insurance plans."
  },
  {
    type: "assistant",
    message: "I'd be happy to help you with that. We offer several health insurance plans. Could you tell me more about what you're specifically looking for? For example, are you interested in individual or family coverage?"
  },
  {
    type: "user",
    message: "I need family coverage for myself, my spouse, and two children."
  },
  {
    type: "assistant",
    message: "Great! For family coverage, we have several options that include comprehensive benefits like regular check-ups, prescription coverage, and hospital care. Would you like me to explain our most popular family plans?"
  }
];

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