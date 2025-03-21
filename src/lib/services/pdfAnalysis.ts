import { ChatMessageModel } from "../models/ChatMessage";
import { useChatStore } from "../store/chatStore";
import { sseService } from "./sseService";

import { AnalysisResult } from "../models/ChatMessage";

export type { AnalysisResult };

export async function analyzePDF(file: File): Promise<void> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Update analyzing state
    useChatStore.getState().setIsAnalyzing(true);

    // Initial message
    useChatStore.getState().addMessage(
      new ChatMessageModel({
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Starting proposal analysis...",
        timestamp: Date.now(),
      })
    );

    // Connect to SSE stream for real-time updates
    sseService.connect(
      (message) => {
        if (typeof message === "object" && message !== null) {
          useChatStore.getState().addMessage(
            new ChatMessageModel({
              id: crypto.randomUUID(),
              role: "assistant",
              content: message.message || "Analyzing...",
              timestamp: Date.now(),
            })
          );

          if ("results" in message) {
            useChatStore.getState().setAnalysisResults(message.results as AnalysisResult);
          }
        }
      },
      (error) => {
        console.error("SSE connection error:", error);
        useChatStore.getState().addMessage(
          new ChatMessageModel({
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Error during analysis. Please try again.",
            timestamp: Date.now(),
          })
        );
        useChatStore.getState().setIsAnalyzing(false);
        sseService.disconnect();
      }
    );
  } catch (error) {
    console.error("Error analyzing PDF:", error);
    useChatStore.getState().addMessage(
      new ChatMessageModel({
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Error analyzing the PDF. Please try again.",
        timestamp: Date.now(),
      })
    );
    useChatStore.getState().setIsAnalyzing(false);
    useChatStore.getState().setAnalysisResults(null);
    sseService.disconnect();
  }
}
