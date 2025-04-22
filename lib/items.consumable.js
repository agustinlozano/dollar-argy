import { ITEM_TYPES } from "./consts-v2";

export const healthPotion = {
  name: "Poción de Vida",
  description: "Restaura 3 puntos de vida.",
  slug: "health_potion",
  type: ITEM_TYPES.CONSUMABLE,
  effects: [{ type: "heal", value: 3 }],
  useLimit: 1,
};

export const manaPotion = {
  name: "Poción de Maná",
  description: "Restaura 15 puntos de maná.",
  slug: "mana_potion",
  type: ITEM_TYPES.CONSUMABLE,
  effects: [{ type: "mana_restore", value: 15 }],
  useLimit: 1,
};
