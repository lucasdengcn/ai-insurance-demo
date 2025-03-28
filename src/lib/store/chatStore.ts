import { create } from "zustand";

import { AnalysisResult, ChatMessage, ChatMessageModel } from "../models/ChatMessage";

interface ChatState {
  messages: ChatMessage[];
  selectedFile: File | null;
  isAnalyzing: boolean;
  analysisResults: AnalysisResult | null;
  showBrowserWindow: boolean;
  browserWindowUrl: string;
  activeTab: string;
  addMessage: (message: ChatMessage) => void;
  setSelectedFile: (file: File | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setAnalysisResults: (results: AnalysisResult | null) => void;
  setShowBrowserWindow: (show: boolean) => void;
  setBrowserWindowUrl: (url: string) => void;
  setActiveTab: (tab: string) => void;
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
  showBrowserWindow: false,
  browserWindowUrl: "",
  activeTab: "analysis",
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, new ChatMessageModel(message)] })),
  setSelectedFile: (file) => set({ selectedFile: file }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisResults: (results) => set({ analysisResults: results }),
  setShowBrowserWindow: (show) => set({ showBrowserWindow: show }),
  setBrowserWindowUrl: (url) => set({ browserWindowUrl: url }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  reset: () => set(initialState),
}));
