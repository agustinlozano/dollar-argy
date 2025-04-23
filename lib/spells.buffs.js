import {
  CONCEPTS,
  EFFECTS,
  SPELL_TYPES,
  DURATIONS,
  REQUIRES_TYPES,
  TARGETING,
} from "./consts-v2";

export const freeMarket = {
  slug: "free_market",
  name: "Free Market",
  description: "Desata el poder de los mercados sin cadenas.",
  type: SPELL_TYPES.BUFF,
  targeting: TARGETING.SELF,
  manaCost: 35,
  cooldown: 2,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.ATTACK_UP,
      duration: DURATIONS.TWO_TURNS,
      value: 0.15,
    },
  ],
  extraSecretEffects: [],
  animation: "market_wave",
  sound: "money_flow",
};

export const freeExchangeRate = {
  slug: "free_exchange_rate",
  name: "Free Exchange Rate",
  description: "Abre la puerta a los dólares.",
  type: SPELL_TYPES.BUFF,
  targeting: TARGETING.SELF,
  manaCost: 30,
  cooldown: 2,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.DEFENSE_PENETRATION,
      duration: DURATIONS.ONE_TURN,
      value: 1,
    },
  ],
  extraSecretEffects: [
    {
      requiresType: REQUIRES_TYPES.CONCEPT,
      requires: CONCEPTS.INFLATION,
      effect: EFFECTS.CRIT_CHANCE_UP,
      duration: DURATIONS.ONE_TURN,
      value: 0.1,
    },
    {
      requiresType: REQUIRES_TYPES.CONCEPT,
      requires: CONCEPTS.REGULATIONS,
      effect: EFFECTS.CRIT_CHANCE_UP,
      duration: DURATIONS.ONE_TURN,
      value: 0.1,
    },
  ],
  animation: "dollar_wave",
  sound: "cash_register",
};

export const riskDrop = {
  slug: "country_risk_drop",
  name: "Country Risk Drop",
  description: "Suben los bonos y baja el miedo.",
  type: SPELL_TYPES.BUFF,
  targeting: TARGETING.SELF,
  manaCost: 35,
  cooldown: 2,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.DEFENSE_UP,
      duration: DURATIONS.ONE_TURN,
      value: 0.15,
    },
    {
      requiresType: REQUIRES_TYPES.CONCEPT,
      requires: CONCEPTS.BOND_SHORTER,
      type: EFFECTS.CRIT_CHANCE_UP,
      duration: DURATIONS.ONE_TURN,
      value: 1,
    },
  ],
  extraSecretEffects: [],
  animation: "bond_rise",
  sound: "ding_positive",
};
