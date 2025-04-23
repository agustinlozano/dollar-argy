import {
  CONCEPTS,
  DURATIONS,
  EFFECTS,
  REQUIRES_TYPES,
  SPELL_TYPES,
  TARGETING,
} from "./consts-v2";

export const freedomDose = {
  slug: "freedom_dose",
  name: "Dose of Freedom",
  description:
    "Ataque básico del juego, para poder repartir pequeñas dosis de libertad.",
  type: SPELL_TYPES.OFFENSIVE,
  targeting: TARGETING.SINGLE,
  manaCost: 0,
  cooldown: 0,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.DAMAGE,
      duration: DURATIONS.ONE_TURN,
      value: 5,
    },
  ],
  extraSecretEffects: [],
  sideEffects: [],
  strongAgainst: [],
  meta: {
    animation: "light_hit",
    sound: "slap",
  },
};

export const freedomProjectile = {
  slug: "freedom_projectile",
  name: "Freedom Missile",
  description: "Un disparo certero que quita 10 puntos de vida.",
  type: SPELL_TYPES.OFFENSIVE,
  targeting: TARGETING.SINGLE,
  manaCost: 15,
  cooldown: 0,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.DAMAGE,
      duration: DURATIONS.ONE_TURN,
      value: 10,
    },
  ],
  extraSecretEffects: [],
  sideEffects: [],
  strongAgainst: [],
  meta: {
    animation: "bullet_hit",
    sound: "whoosh",
  },
};

export const austerityBlast = {
  slug: "austerity_blast",
  name: "Austerity Blast",
  description:
    "Golpe en área que congela enemigos con recortes presupuestarios.",
  type: SPELL_TYPES.OFFENSIVE,
  targeting: TARGETING.AREA,
  manaCost: 30,
  cooldown: 1,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.DAMAGE,
      duration: DURATIONS.ONE_TURN,
      value: 5,
    },
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.STUN,
      duration: DURATIONS.ONE_TURN,
      area: 4,
    },
  ],
  extraSecretEffects: [],
  sideEffects: [],
  strongAgainst: [CONCEPTS.INFLATION],
  meta: {
    animation: "ice_explosion",
    sound: "frost_hit",
  },
};

export const interestRateDrop = {
  slug: "interest_rate_drop",
  name: "Lower Interest Rate",
  description: "Dispara daño leve en área y debuffea el ataque enemigo.",
  type: SPELL_TYPES.OFFENSIVE,
  targeting: TARGETING.AREA,
  manaCost: 25,
  cooldown: 1,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.DAMAGE,
      duration: DURATIONS.ONE_TURN,
      value: 5,
      area: 3,
    },
  ],
  extraSecretEffects: [],
  sideEffects: [
    {
      requiresType: REQUIRES_TYPES.CONCEPT,
      requires: CONCEPTS.INFLATION,
      type: EFFECTS.ATTACK_DOWN,
      duration: DURATIONS.ONE_TURN,
      value: 0.2,
    },
  ],
  strongAgainst: [
    // MAYBE: could generate +investment (new concept 2 add) level in the future
  ],
  meta: {
    animation: "coin_rain",
    sound: "soft_bang",
  },
};

export const deregulationRay = {
  slug: "deregulation_ray",
  name: "Deregulation Ray",
  description: "Destruye trabas con pura eficiencia de mercado.",
  type: SPELL_TYPES.OFFENSIVE,
  targeting: TARGETING.SINGLE,
  manaCost: 25,
  cooldown: 1,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.DAMAGE,
      duration: DURATIONS.ONE_TURN,
      value: 10,
    },
  ],
  extraSecretEffects: [],
  sideEffects: [],
  strongAgainst: [CONCEPTS.BUREAUCRACY, CONCEPTS.CORRUPTION],
  meta: {
    animation: "electric_beam",
    sound: "zap",
  },
};

export const massPrivatization = {
  slug: "mass_privatization",
  name: "Mass Privatization",
  description:
    "Invoca una ráfaga de contratos que desmantelan enemigos públicos.",
  type: SPELL_TYPES.OFFENSIVE,
  targeting: TARGETING.AREA,
  manaCost: 50,
  cooldown: 2,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.DAMAGE,
      duration: DURATIONS.ONE_TURN,
      value: 15,
      targets: 3,
    },
  ],
  extraSecretEffects: [],
  sideEffects: [],
  strongAgainst: [CONCEPTS.CORRUPTION],
  meta: {
    animation: "paper_storm",
    sound: "stampede",
  },
};

export const lafferBullet = {
  slug: "laffer_bullet",
  name: "Laffer Bullet",
  description: "Proyectil que se potencia si bajás impuestos.",
  type: SPELL_TYPES.OFFENSIVE,
  targeting: TARGETING.SINGLE,
  manaCost: 40,
  cooldown: 2,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.DAMAGE,
      duration: DURATIONS.ONE_TURN,
      value: 10,
    },
  ],
  extraSecretEffects: [
    // There's one but it's applied on the item
  ],
  sideEffects: [],
  strongAgainst: [],
  meta: {
    animation: "golden_bullet",
    sound: "ka-ching",
  },
};

export const fiscalShock = {
  slug: "fiscal_shock",
  name: "Fiscal Shock",
  description: "Reduce el gasto público en el área de impacto.",
  type: SPELL_TYPES.OFFENSIVE,
  targeting: TARGETING.AREA,
  manaCost: 60,
  cooldown: 3,
  effects: [
    {
      requiresType: REQUIRES_TYPES.ANY,
      type: EFFECTS.DAMAGE,
      duration: DURATIONS.ONE_TURN,
      value: 20,
      area: 6,
    },
  ],
  extraSecretEffects: [
    {
      requiresType: REQUIRES_TYPES.CONCEPT,
      requires: CONCEPTS.INFLATION,
      type: EFFECTS.DAMAGE,
      duration: DURATIONS.INFINITE,
      value: 10,
    },
  ],
  sideEffects: [],
  strongAgainst: [CONCEPTS.INFLATION],
  meta: {
    animation: "explosive_chart",
    sound: "boom",
  },
};
