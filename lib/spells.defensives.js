import {
  CONCEPTS,
  DURATIONS,
  EFFECTS,
  REQUIRES_TYPES,
  SPELL_TYPES,
  TARGETING,
} from "./consts-v2";

export const blindingSurveys = {
  name: "Blinding Surveys",
  slug: "blinding_surveys",
  description:
    "Distrae a un enemigo con encuestas que le hacen perder 1 turno.",
  type: SPELL_TYPES.DEFENSIVE,
  targeting: TARGETING.SINGLE,
  manaCost: 10,
  cooldown: 1,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.SKIP_ENEMY_TURN,
      duration: DURATIONS.ONE_TURN,
    },
  ],
  extraSecretEffects: [],
  sideEffects: [],
  strongAgainst: [],
  meta: {
    animation: "survey_confusion",
    sound: "paper_rustle",
    color: {
      aura: "#D3D3D3",
    },
  },
};

export const liquidityInjection = {
  name: "Liquidity Injection",
  slug: "liquidity_injection",
  description: "Renueva un 20% de la vida.",
  type: SPELL_TYPES.DEFENSIVE,
  targeting: TARGETING.SELF,
  manaCost: 20,
  cooldown: 1,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.HEAL,
      duration: DURATIONS.ONE_TURN,
      value: 0.2,
    },
  ],
  extraSecretEffects: [],
  sideEffects: [],
  strongAgainst: [],
  meta: {
    animation: "liquidity_wave",
    sound: "healing_whoosh",
    color: {
      aura: "#00FA9A",
    },
  },
};

export const interestRateHike = {
  name: "Interest Rate Hike",
  slug: "interest_rate_hike",
  description:
    "Aumenta 10% la defensa contra ataques inflacionarios y reduce el ataque en un 25%.",
  type: SPELL_TYPES.DEFENSIVE,
  targeting: TARGETING.SELF,
  manaCost: 20,
  cooldown: 3,
  effects: [
    {
      requiresType: REQUIRES_TYPES.CONCEPT,
      requires: CONCEPTS.INFLATION,
      type: EFFECTS.DEFENSE_UP,
      duration: DURATIONS.ONE_TURN,
      value: 0.1,
    },
  ],
  extraSecretEffects: [],
  sideEffects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.ATTACK_DOWN,
      duration: DURATIONS.ONE_TURN,
      value: 0.25,
    },
  ],
  strongAgainst: [CONCEPTS.INFLATION],
  meta: {
    animation: "ratehike_defense",
    sound: "rate_up",
    color: {
      aura: "#FFD700",
    },
  },
};

export const fiscalSurplus = {
  name: "Fiscal Surplus",
  slug: "fiscal_surplus",
  description: "Te protege con un aura que bloquea ataques inflacionarios.",
  type: SPELL_TYPES.DEFENSIVE,
  targeting: TARGETING.SELF,
  manaCost: 60,
  cooldown: 3,
  effects: [
    {
      requiresType: REQUIRES_TYPES.CONCEPT,
      requires: CONCEPTS.INFLATION,
      type: EFFECTS.DEFENSE_UP,
      duration: DURATIONS.ONE_TURN,
      value: 1,
    },
  ],
  extraSecretEffects: [],
  sideEffects: [],
  strongAgainst: [CONCEPTS.INFLATION],
  meta: {
    animation: "surplus_aura",
    sound: "shield_pop",
    color: {
      aura: "#98FB98",
    },
  },
};

export const monetaryAnchor = {
  name: "Monetary Anchor",
  slug: "monetary_anchor",
  description: "Restaura 5% de la vida por turno durante una ronda completa.",
  type: SPELL_TYPES.DEFENSIVE,
  targeting: TARGETING.SELF,
  manaCost: 40,
  cooldown: DURATIONS.ONE_COMBAT,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.REGEN,
      value: 0.05,
      duration: DURATIONS.ONE_COMBAT,
    },
  ],
  extraSecretEffects: [],
  sideEffects: [],
  strongAgainst: [],
  meta: {
    animation: "anchor_hold",
    sound: "slow_beat",
    color: {
      aura: "#4682B4",
    },
  },
};

export const centralBankShutdown = {
  name: "Central Bank Shutdown",
  slug: "central_bank_shutdown",
  description: "Bloquea el maná enemigo y hace perder 1 turno.",
  type: SPELL_TYPES.DEFENSIVE,
  targeting: TARGETING.AREA,
  manaCost: 60,
  cooldown: 3,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.SKIP_ENEMY_TURN,
      duration: DURATIONS.ONE_TURN,
      area: 1,
    },
  ],
  extraSecretEffects: [],
  sideEffects: [],
  strongAgainst: [],
  meta: {
    animation: "bank_seal",
    sound: "lockdown",
    color: {
      aura: "#A52A2A",
    },
  },
};
