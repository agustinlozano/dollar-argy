// Spells
export const speed = {
  low: 200,
  medium: 400,
  high: 600,
};

export const damage = {
  low: 15,
  medium: 25,
  high: 30,
  veryHigh: 50,
};

export const manaCost = {
  low: 10,
  medium: 15,
  high: 20,
};

export const cooldown = {
  short: 0.3,
  medium: 0.5,
  long: 1.5,
};

export const otherValues = {
  maxDistance: 1000,
  explosionRadius: 12,
};

// Items
export const itemValues = {
  goldCoinValue: 1,
  rewardVoucherValue: 50,
};

export const itemColors = {
  goldCoinColor: "#FFD700",
  rewardVoucherColor: "#FF6347",
};

export const expirationTurns = {
  none: 0,
  rewardVoucher: 5,
};

// Item types
export const itemTypes = {
  currency: "currency",
  voucher: "voucher",
};

const spells = [
  {
    name: "Rapid Fire",
    description: "Unleash a barrage of quick shots.",
    color: {
      explosion: "#FF4500",
      projectile: "#FFA500",
    },
    speed: speed.medium, // 400
    damage: damage.low, // 15
    manaCost: manaCost.low, // 10
    cooldown: cooldown.short, // 0.3
    burstCount: 5, // número de disparos en la ráfaga
    burstInterval: 0.1, // intervalo entre disparos en la ráfaga
    type: "offensive", // tipo de hechizo
    animation: "rapid_fire_cast", // referencia a la animación
    sound: "rapid_fire_launch", // referencia al sonido
  },
  {
    name: "Single Shot",
    description: "A single, powerful shot.",
    color: {
      explosion: "#FFD700",
      projectile: "#FFD700",
    },
    speed: speed.low, // 200
    damage: damage.medium, // 25
    manaCost: manaCost.medium, // 15
    cooldown: cooldown.long, // 1.5
    type: "offensive", // tipo de hechizo
    animation: "single_shot_cast", // referencia a la animación
    sound: "single_shot_launch", // referencia al sonido
  },
  {
    name: "Assault Rifle",
    description: "Rapid shots with high damage.",
    color: {
      explosion: "#FF0000",
      projectile: "#FF6347",
    },
    speed: speed.high, // 600
    damage: damage.high, // 30
    manaCost: manaCost.medium, // 12
    cooldown: cooldown.short, // 0.3
    burstCount: 3, // número de disparos en la ráfaga
    burstInterval: 0.05, // intervalo entre disparos en la ráfaga
    type: "offensive", // tipo de hechizo
    animation: "assault_rifle_cast", // referencia a la animación
    sound: "assault_rifle_launch", // referencia al sonido
  },
];

const items = [
  {
    name: "Gold Coin",
    value: itemValues.goldCoinValue,
    type: itemTypes.currency,
    color: itemColors.goldCoinColor,
    description: "A shiny gold coin used for transactions.",
    expirationTurns: expirationTurns.none,
    isRedeemed: false,
  },
  {
    name: "Reward Voucher",
    value: itemValues.rewardVoucherValue,
    type: itemTypes.voucher,
    color: itemColors.rewardVoucherColor,
    description: "A voucher that can be redeemed for rewards.",
    expirationTurns: expirationTurns.rewardVoucher,
    isRedeemed: false,
  },
];
