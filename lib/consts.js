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

export const spellValues = {
  nullValue: null,
};

// Items
export const itemNames = {
  goldCoins: "Gold Coins",
  rewardVoucher: "Reward Voucher",
};

export const itemSlugs = {
  goldCoins: "gold_coins",
  rewardVoucher: "reward_voucher",
};

export const itemValues = {
  goldCoinsValue: 1,
  rewardVoucherValue: 50,
};

export const itemColors = {
  goldCoinsColor: "#FFD700",
  rewardVoucherColor: "#FF6347",
};

export const expirationTurns = {
  none: 0,
  rewardVoucher: 5,
};

// Item typess
export const itemTypes = {
  coins: "coins",
  voucher: "voucher",
};

// Reward types for generation
export const rewardTypes = {
  coins: "coins",
  voucher: "voucher",
};

export const chestTypes = {
  chest: "chest",
};

/*
 * Spell definitions with properties:
 * - name: The name of the spell.
 * - description: A brief description of the spell.
 * - color: An object containing the colors for the explosion and projectile.
 * - speed: The speed of the projectile.
 * - damage: The damage dealt by the spell.
 * - manaCost: The mana cost of casting the spell.
 * - cooldown: The cooldown time before the spell can be cast again.
 * - burstCount: The number of shots in a burst (if applicable).
 * - burstInterval: The interval between shots in a burst (if applicable).
 * - type: The type of spell.
 * - animation: A reference to the casting animation.
 * - sound: A reference to the sound effect.
 */

export const rapidFire = {
  name: "Rapid Fire",
  description: "Unleash a barrage of quick shots.",
  color: {
    explosion: "#FF4500",
    projectile: "#FFA500",
  },
  speed: speed.medium,
  damage: damage.low,
  manaCost: manaCost.low,
  cooldown: cooldown.short,
  burstCount: 5,
  burstInterval: 0.1,
  type: "offensive",
  animation: "rapid_fire_cast",
  sound: "rapid_fire_launch",
};

export const singleShot = {
  name: "Single Shot",
  description: "A single, powerful shot.",
  color: {
    explosion: "#FFD700",
    projectile: "#FFD700",
  },
  speed: speed.low,
  damage: damage.medium,
  manaCost: manaCost.medium,
  cooldown: cooldown.long,
  burstCount: spellValues.nullValue,
  burstInterval: spellValues.nullValue,
  type: "offensive",
  animation: "single_shot_cast",
  sound: "single_shot_launch",
};

export const assaultRifle = {
  name: "Assault Rifle",
  description: "Rapid shots with high damage.",
  color: {
    explosion: "#FF0000",
    projectile: "#FF6347",
  },
  speed: speed.high,
  damage: damage.high,
  manaCost: manaCost.medium,
  cooldown: cooldown.short,
  burstCount: 3,
  burstInterval: 0.05,
  type: "offensive",
  animation: "assault_rifle_cast",
  sound: "assault_rifle_launch",
};
