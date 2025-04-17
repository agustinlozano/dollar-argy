import { createGoldCoin } from "@/components/game-utils";
import { itemTypes } from "@/lib/consts";
import { create } from "zustand";

const initialState = {
  items: [],
  spells: [], // non-stackable spells like Rapid Fire, Single Shot
};

export const useInventoryStore = create((set, get) => ({
  ...initialState,

  // Add an item or spell to the inventory
  add: (object) => {
    const isSpell = object.type === "offensive";

    if (isSpell) {
      // Spells don't stack – just add it if it's not already in
      set((state) => {
        const exists = state.spells.find((s) => s.name === object.name);
        if (exists) return state; // don't duplicate
        return { spells: [...state.spells, object] };
      });
    } else {
      // Stackable item – increase quantity or add it
      set((state) => {
        const exists = state.items.find((i) => i.name === object.name);
        if (exists) {
          return {
            items: state.items.map((i) =>
              i.name === object.name
                ? { ...i, quantity: (i.quantity || 1) + 1 }
                : i
            ),
          };
        }
        return {
          items: [...state.items, { ...object, quantity: 1 }],
        };
      });
    }
  },

  // Remove one unit of an item or remove a spell
  remove: (name) => {
    set((state) => {
      // Check in items
      const item = state.items.find((i) => i.name === name);
      if (item) {
        if ((item.quantity || 1) > 1) {
          return {
            items: state.items.map((i) =>
              i.name === name ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        }
        return {
          items: state.items.filter((i) => i.name !== name),
        };
      }

      // Check in spells
      const spellExists = state.spells.some((s) => s.name === name);
      if (spellExists) {
        return {
          spells: state.spells.filter((s) => s.name !== name),
        };
      }

      return state;
    });
  },

  // Clear everything
  clear: () => set({ ...initialState }),

  // Check if you own a certain item or spell
  has: (name) => {
    const { items, spells } = get();
    return (
      items.some((i) => i.name === name && (i.quantity || 1) > 0) ||
      spells.some((s) => s.name === name)
    );
  },

  // Get quantity of a stackable item
  getQuantity: (name) => {
    const item = get().items.find((i) => i.name === name);
    return item?.quantity || 0;
  },

  // Claim a reward from a voucher by its ID
  claimReward: (voucherId) => {
    const { items } = get();
    const voucherIndex = items.findIndex(
      (i) => i.type === itemTypes.voucher && i.id === voucherId
    );

    if (voucherIndex === -1) {
      return { success: false, message: "Voucher not found." };
    }

    const voucher = items[voucherIndex];
    if (voucher.isRedeemed) {
      return {
        success: false,
        message: "This voucher has already been redeemed.",
      };
    }

    // Mark it as redeemed and update state
    const updatedVoucher = { ...voucher, isRedeemed: true };
    const updatedItems = [...items];
    updatedItems[voucherIndex] = updatedVoucher;

    // Set new state and add the reward
    set({ items: updatedItems });
    get().add(createGoldCoin(voucher.value, "Reward from voucher."));

    return { success: true, message: "Voucher claimed successfully." };
  },
}));
