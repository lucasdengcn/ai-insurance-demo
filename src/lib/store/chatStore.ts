import { create } from "zustand";

interface Message {
  type: "user" | "assistant";
  message: string;
}

interface AnalysisResult {
  result: string;
  score: number;
}

interface ChatState {
  messages: Message[];
  selectedFile: File | null;
  isAnalyzing: boolean;
  analysisResults: AnalysisResult | null;
  addMessage: (message: Message) => void;
  setSelectedFile: (file: File | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setAnalysisResults: (results: AnalysisResult) => void;
  reset: () => void;
}

const initialState = {
  messages: [
    {
      type: "assistant",
      message: "Hello! Please upload a proposal PDF file for analysis.",
    },
  ],
  selectedFile: null,
  isAnalyzing: false,
  analysisResults: null,
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setSelectedFile: (file) => set({ selectedFile: file }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisResults: (results) => set({ analysisResults: results }),
  reset: () => set(initialState),
}));
