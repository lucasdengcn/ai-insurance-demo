import { create } from "zustand";

import { AnalysisResult, ChatMessage, ChatMessageModel } from "../models/ChatMessage";

interface ChatState {
  messages: ChatMessage[];
  currentMessage: ChatMessage | null;
  isAnalyzing: boolean;
  analysisResults: AnalysisResult | null;
  addMessage: (message: ChatMessage) => void;
  addTextMessage: (content: string, role: "user" | "assistant") => void;
  addPdfMessage: (content: string, url: string, role: "user" | "assistant") => void;
  addImageMessage: (content: string, url: string, role: "user" | "assistant") => void;
  addActionMessage: (
    content: string,
    role: "user" | "assistant",
    actionType?: "approval" | "confirm" | "open" | "info",
    actionData?: Record<string, any>
  ) => void;
  addApprovalMessage: (
    content: string,
    role: "user" | "assistant",
    actionData?: Record<string, any>
  ) => void;
  addConfirmMessage: (
    content: string,
    role: "user" | "assistant",
    actionData?: Record<string, any>
  ) => void;
  addOpenLinkMessage: (content: string, url: string, role: "user" | "assistant") => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setAnalysisResults: (results: AnalysisResult | null) => void;
  setCurrentMessage: (message: ChatMessage | null) => void;
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
  currentMessage: null,
  isAnalyzing: false,
  analysisResults: null,
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, new ChatMessageModel(message)] })),
  addTextMessage: (content, role) =>
    set((state) => ({
      messages: [
        ...state.messages,
        new ChatMessageModel({
          id: crypto.randomUUID(),
          content,
          role,
          timestamp: Date.now(),
          messageType: "text",
        }),
      ],
    })),
  addPdfMessage: (content, url, role) =>
    set((state) => ({
      messages: [
        ...state.messages,
        new ChatMessageModel({
          id: crypto.randomUUID(),
          content,
          role,
          timestamp: Date.now(),
          browserUrl: url,
          messageType: "pdf",
        }),
      ],
    })),
  addImageMessage: (content, url, role) =>
    set((state) => ({
      messages: [
        ...state.messages,
        new ChatMessageModel({
          id: crypto.randomUUID(),
          content,
          role,
          timestamp: Date.now(),
          browserUrl: url,
          messageType: "image",
        }),
      ],
    })),
  addActionMessage: (content, role, actionType = "info", actionData) =>
    set((state) => ({
      messages: [
        ...state.messages,
        new ChatMessageModel({
          id: crypto.randomUUID(),
          content,
          role,
          timestamp: Date.now(),
          messageType: "action",
          actionType,
          actionData,
        }),
      ],
    })),
  addApprovalMessage: (content, role, actionData) =>
    set((state) => ({
      messages: [
        ...state.messages,
        new ChatMessageModel({
          id: crypto.randomUUID(),
          content,
          role,
          timestamp: Date.now(),
          messageType: "action",
          actionType: "approval",
          actionData,
        }),
      ],
    })),
  addConfirmMessage: (content, role, actionData) =>
    set((state) => ({
      messages: [
        ...state.messages,
        new ChatMessageModel({
          id: crypto.randomUUID(),
          content,
          role,
          timestamp: Date.now(),
          messageType: "action",
          actionType: "confirm",
          actionData,
        }),
      ],
    })),
  addOpenLinkMessage: (content, url, role) =>
    set((state) => ({
      messages: [
        ...state.messages,
        new ChatMessageModel({
          id: crypto.randomUUID(),
          content,
          role,
          timestamp: Date.now(),
          messageType: "action",
          actionType: "open",
          actionData: { url },
        }),
      ],
    })),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisResults: (results) => set({ analysisResults: results }),
  setCurrentMessage: (message) => set({ currentMessage: message }),
  reset: () => set(initialState),
}));
