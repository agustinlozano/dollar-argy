import {
  DURATIONS,
  EFFECTS,
  ITEM_TYPES,
  REQUIRES_TYPES,
  TARGETING,
} from "./consts-v2";
import { lafferBullet } from "./spells.offensives";

export const lowerTaxes = {
  name: "Lower Taxes Talisman",
  description: "Baja la presión tributaria, sube la inversión.",
  slug: "lower_taxes",
  type: ITEM_TYPES.PASSIVE,
  targeting: TARGETING.SELF,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.ATTACK_UP,
      duration: DURATIONS.INFINITE,
      value: 0.08,
    },
  ],
  extraSecretEffects: [
    {
      requiresType: REQUIRES_TYPES.SPELL,
      requires: lafferBullet.slug,
      type: EFFECTS.CRIT_CHANCE_UP,
      duration: DURATIONS.INFINITE,
      value: 1,
    },
  ],
};
