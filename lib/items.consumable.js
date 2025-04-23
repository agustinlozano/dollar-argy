import { EFFECTS, ITEM_TYPES, ITEMS_CATEGORIES } from "./consts-v2";

export const healthPotion = {
  name: "Poción de Vida",
  description: "Restaura 3 puntos de vida.",
  slug: "health_potion",
  type: ITEM_TYPES.CONSUMABLE,
  category: ITEMS_CATEGORIES.POTION,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.HEAL,
      duration: DURATIONS.ONE_TURN,
      value: 3,
    },
  ],
};

export const manaPotion = {
  name: "Poción de Maná",
  description: "Restaura 15 puntos de maná.",
  slug: "mana_potion",
  type: ITEM_TYPES.CONSUMABLE,
  category: ITEMS_CATEGORIES.POTION,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.MANA_RESTORE,
      duration: DURATIONS.ONE_TURN,
      value: 15,
    },
  ],
  useLimit: 1,
};
