import { ChatMessageModel } from "../models/ChatMessage";
import { useChatStore } from "../store/chatStore";
import { sseService } from "./sseService";

import { AnalysisResult } from "../models/ChatMessage";

export type { AnalysisResult };

export async function analyzePDF(file: File): Promise<void> {
  let pdfUrl: string | null = null; // Declare at function scope

  try {
    const formData = new FormData();
    formData.append("file", file);

    // Create a URL for the PDF file to display in browser window
    pdfUrl = URL.createObjectURL(file);
    useChatStore.setState({
      browserWindowUrl: pdfUrl,
      showBrowserWindow: true,
      activeTab: "browser",
      isAnalyzing: true,
    });

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
        console.log("PDF Received message:", message);
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
            // Reset analysis results
            closeSSE();
          }
        }
      },
      (error) => {
        console.error("PDF Error:", error);
        useChatStore.getState().addMessage(
          new ChatMessageModel({
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Error during analysis. Please try again.",
            timestamp: Date.now(),
          })
        );
        closeSSE();
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
    // Reset analysis results
    useChatStore.getState().setAnalysisResults(null);
    closeSSE();
  }

  function closeSSE() {
    useChatStore.getState().setIsAnalyzing(false);
    sseService.disconnect();
  }
}
