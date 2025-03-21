import { create } from "zustand";

import { AnalysisResult, ChatMessage, ChatMessageModel } from "../models/ChatMessage";

interface ChatState {
  messages: ChatMessage[];
  selectedFile: File | null;
  isAnalyzing: boolean;
  analysisResults: AnalysisResult | null;
  addMessage: (message: ChatMessage) => void;
  setSelectedFile: (file: File | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setAnalysisResults: (results: AnalysisResult | null) => void;
  reset: () => void;
}

const initialState = {
  messages: [
    new ChatMessageModel({
      id: "initial",
      role: "assistant",
      content: "Hello! Please upload a proposal PDF file for analysis.",
      timestamp: Date.now(),
    }),
  ],
  selectedFile: null,
  isAnalyzing: false,
  analysisResults: null,
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, new ChatMessageModel(message)] })),
  setSelectedFile: (file) => set({ selectedFile: file }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisResults: (results) => set({ analysisResults: results }),
  reset: () => set(initialState),
}));
