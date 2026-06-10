import { create } from "zustand";

type CompareState = {
  ids: string[];
  toggle: (id: string) => void;
  clear: () => void;
};

export const useCompareStore = create<CompareState>((set) => ({
  ids: [],
  toggle: (id) =>
    set((state) => ({
      ids: state.ids.includes(id)
        ? state.ids.filter((item) => item !== id)
        : state.ids.length >= 3
          ? [...state.ids.slice(1), id]
          : [...state.ids, id],
    })),
  clear: () => set({ ids: [] }),
}));
