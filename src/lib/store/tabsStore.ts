import { create } from "zustand";

interface TabsState {
  activeTab: string;
  setActiveTab: (id: string) => void;
  reset: () => void;
}

const initialState = {
  activeTab: "analysis",
};

export const useTabsStore = create<TabsState>((set) => ({
  ...initialState,
  setActiveTab: (id) => set({ activeTab: id }),
  reset: () => set(initialState),
}));
