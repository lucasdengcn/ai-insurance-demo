import { useCallback, useEffect, useRef } from "react";
import { useChatStore } from "../store/chatStore";

interface WebSocketMessage {
  type: string;
  content: string;
}

export function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000; // 3 seconds
  const heartbeatInterval = useRef<NodeJS.Timeout>();
  const addTextMessage = useChatStore((state) => state.addTextMessage);

  const connect = useCallback(() => {
    try {
      ws.current = new WebSocket("ws://localhost:8080/ws/proposal?token=12333");

      ws.current.onopen = () => {
        console.log("WebSocket connection established");
        reconnectAttempts.current = 0;

        // Start heartbeat
        heartbeatInterval.current = setInterval(() => {
          if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ type: "ping" }));
          }
        }, 30000); // Send heartbeat every 30 seconds
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as WebSocketMessage;

          switch (message.type) {
            case "message":
              addTextMessage(message.content, "assistant");
              break;
            case "pong":
              // Heartbeat response received
              break;
            default:
              console.warn("Unknown message type:", message.type);
          }
        } catch (error) {
          console.error("Error processing WebSocket message:", error);
        }
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.current.onclose = () => {
        console.log("WebSocket connection closed");
        clearInterval(heartbeatInterval.current);

        // Attempt to reconnect if not at max attempts
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current += 1;
          console.log(`Reconnecting... Attempt ${reconnectAttempts.current}`);
          setTimeout(connect, reconnectDelay);
        } else {
          console.error("Max reconnection attempts reached");
        }
      };
    } catch (error) {
      console.error("Error creating WebSocket connection:", error);
    }
  }, [addTextMessage]);

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      clearInterval(heartbeatInterval.current);
    };
  }, [connect]);
}
