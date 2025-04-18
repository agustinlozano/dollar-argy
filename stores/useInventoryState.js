import {
  changeGoldCoinQuantity,
  createGoldCoin,
} from "@/components/game-utils";
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
      set((state) => {
        const exists = state.spells.find((s) => s.slug === object.slug);
        if (exists) return state;
        return { spells: [...state.spells, object] };
      });
    } else {
      set((state) => {
        const exists = state.items.find((i) => i.slug === object.slug);
        if (exists) {
          return {
            items: state.items.map((i) =>
              i.slug === object.slug
                ? { ...i, quantity: (i.quantity || 1) + 1 }
                : i
            ),
          };
        }
        return {
          // items: [...state.items, { ...object, quantity: 1 }],
          items: [...state.items, createGoldCoin()],
        };
      });
    }
  },

  // Remove one unit of an item or remove a spell
  remove: (slug) => {
    set((state) => {
      const item = state.items.find((i) => i.slug === slug);
      if (item) {
        if ((item.quantity || 1) > 1) {
          return {
            items: state.items.map((i) =>
              i.slug === slug ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        }
        return {
          items: state.items.filter((i) => i.slug !== slug),
        };
      }

      const spellExists = state.spells.some((s) => s.slug === slug);
      if (spellExists) {
        return {
          spells: state.spells.filter((s) => s.slug !== slug),
        };
      }

      return state;
    });
  },

  // Clear everything
  clear: () => set({ ...initialState }),

  // Check if you own a certain item or spell
  has: (slug) => {
    const { items, spells } = get();
    return (
      items.some((i) => i.slug === slug && (i.quantity || 1) > 0) ||
      spells.some((s) => s.slug === slug)
    );
  },

  // Get quantity of a stackable item
  getQuantity: (slug) => {
    const item = get().items.find((i) => i.slug === slug);
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

    const updatedVoucher = { ...voucher, isRedeemed: true };
    const updatedItems = [...items];
    updatedItems[voucherIndex] = updatedVoucher;

    const coinIndex = updatedItems.findIndex((i) => i.slug === "gold_coins");

    if (coinIndex !== -1) {
      const coin = updatedItems[coinIndex];
      const newQuantity = coin.quantity + voucher.value;
      updatedItems[coinIndex] = changeGoldCoinQuantity(coin, newQuantity);
    } else {
      const newCoin = changeGoldCoinQuantity(createGoldCoin(), voucher.value);
      updatedItems.push(newCoin);
    }

    set({ items: updatedItems });
    return { success: true, message: "Voucher claimed successfully." };
  },
}));
