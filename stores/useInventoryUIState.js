import { create } from "zustand";

export const useInventoryUIStore = create((set) => ({
  isInventoryOpen: false,
  toggleInventory: () =>
    set((state) => ({ isInventoryOpen: !state.isInventoryOpen })),
  openInventory: () => set({ isInventoryOpen: true }),
  closeInventory: () => set({ isInventoryOpen: false }),
}));
