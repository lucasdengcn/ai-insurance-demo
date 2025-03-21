import { useChatStore } from "../store/chatStore";
import { sseService } from "./sseService";

export interface AnalysisResult {
  coverageDistribution: Array<{ name: string; value: number }>;
  riskAssessment: Array<{ category: string; score: number }>;
  summary: string;
}

export async function analyzePDF(file: File): Promise<void> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Update analyzing state
    useChatStore.getState().setIsAnalyzing(true);

    // Initial message
    useChatStore.getState().addMessage({
      type: "assistant",
      message: "Starting proposal analysis...",
    });

    // Connect to SSE stream for real-time updates
    sseService.connect(
      (message) => {
        if (typeof message === "object" && message !== null) {
          useChatStore.getState().addMessage({
            type: "assistant",
            message: message.message || "Analyzing...",
          });

          if ("results" in message) {
            useChatStore.getState().setAnalysisResults(message.results as AnalysisResult);
          }
        }
      },
      (error) => {
        console.error("SSE connection error:", error);
        useChatStore.getState().addMessage({
          type: "assistant",
          message: "Error during analysis. Please try again.",
        });
        useChatStore.getState().setIsAnalyzing(false);
        sseService.disconnect();
      }
    );
  } catch (error) {
    console.error("Error analyzing PDF:", error);
    useChatStore.getState().addMessage({
      type: "assistant",
      message: "Error analyzing the PDF. Please try again.",
    });
    useChatStore.getState().setIsAnalyzing(false);
    useChatStore.getState().setAnalysisResults(null);
    sseService.disconnect();
  }
}
