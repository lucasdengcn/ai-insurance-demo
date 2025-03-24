type SSECallback = (message: any) => void;

export class SSEService {
  private eventSource: EventSource | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(private baseUrl: string = "/api/analysis/stream") {}

  connect(onMessage: SSECallback, onError?: (error: Event) => void): void {
    if (this.eventSource) {
      this.disconnect();
    }

    this.eventSource = new EventSource(this.baseUrl);

    this.eventSource.onmessage = (event) => {
      try {
        console.log("SSE message received:", event.data);
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error("Error parsing SSE message:", error);
      }
    };

    this.eventSource.onopen = () => {
      console.log("SSE connection opened");
      this.reconnectAttempts = 0;
    };

    this.eventSource.addEventListener("complete", (message) => {
      console.info("complete:", message);
    });

    this.eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      if (this.eventSource?.readyState === EventSource.CLOSED) {
        this.handleReconnection(onMessage, onError);
      } else {
        // console.error("SSE Error: connection error:", error);
        if (onError) {
          onError(error);
        }
      }
    };
  }

  private handleReconnection(onMessage: SSECallback, onError?: (error: Event) => void): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
      );

      setTimeout(() => {
        this.connect(onMessage, onError);
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error("Max reconnection attempts reached");
    }
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.reconnectAttempts = 0;
    }
  }
}

export const sseService = new SSEService();
