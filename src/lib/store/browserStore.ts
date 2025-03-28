import { create } from "zustand";

interface BrowserState {
  url: string;
  contentType: "pdf" | "image" | "url" | null;
  isVisible: boolean;
  setUrl: (url: string) => void;
  setContentType: (type: "pdf" | "image" | "url") => void;
  setVisibility: (visible: boolean) => void;
  setBrowserTarget: (url: string, type: "pdf" | "image" | "url") => void;
  reset: () => void;
}

export const useBrowserStore = create<BrowserState>((set) => ({
  url: "",
  contentType: null,
  isVisible: false,
  setUrl: (url) => set({ url }),
  setContentType: (contentType) => set({ contentType }),
  setVisibility: (isVisible) => set({ isVisible }),
  setBrowserTarget: (url, contentType) => set({ url, contentType }),
  reset: () => set({ url: "", contentType: null, isVisible: false }),
}));
