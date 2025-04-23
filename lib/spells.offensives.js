import {
  CONCEPTS,
  DURATIONS,
  EFFECTS,
  REQUIRES_TYPES,
  SPELL_TYPES,
  TARGETING,
} from "./consts-v2";

export const freedomDose = {
  name: "Dose of Freedom",
  description:
    "Ataque básico del juego, para poder repartir pequeñas dosis de libertad.",
  slug: "freedom_dose",
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
  name: "Freedom Missile",
  description: "Un disparo certero que quita 10 puntos de vida.",
  slug: "freedom_projectile",
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
  name: "Austerity Blast",
  description:
    "Golpe en área que congela enemigos con recortes presupuestarios.",
  slug: "austerity_blast",
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
  name: "Lower Interest Rate",
  description: "Dispara daño leve en área y debuffea el ataque enemigo.",
  slug: "interest_rate_drop",
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
  name: "Deregulation Ray",
  description: "Destruye trabas con pura eficiencia de mercado.",
  slug: "deregulation_ray",
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
  name: "Mass Privatization",
  description:
    "Invoca una ráfaga de contratos que desmantelan enemigos públicos.",
  slug: "mass_privatization",
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
  name: "Laffer Bullet",
  description: "Proyectil que se potencia si bajás impuestos.",
  slug: "laffer_bullet",
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
  // extraSecretEffects: [
  //   {
  //     requiresType: REQUIRES_TYPES.ITEM,
  //     requires: lowerTaxes.slug,
  //     type: EFFECTS.CRIT_CHANCE_UP,
  //     duration: DURATIONS.INFINITE,
  //     value: 1,
  //   },
  // ],
  sideEffects: [],
  strongAgainst: [],
  meta: {
    animation: "golden_bullet",
    sound: "ka-ching",
  },
};

export const fiscalShock = {
  name: "Fiscal Shock",
  description: "Reduce el gasto público en el área de impacto.",
  slug: "fiscal_shock",
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
