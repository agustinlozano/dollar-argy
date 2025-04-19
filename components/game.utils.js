import {
  expirationTurns,
  itemColors,
  itemNames,
  itemSlugs,
  itemTypes,
  itemValues,
} from "@/lib/consts";
import { nanoid } from "nanoid";

// Intelligent generation of row types
let lastTypes = []; // Stores the last generated row types
// Variable to track if we are in the middle of a road sequence
let forcedRoadCount = 0;

export const getRandomTerrainType = () => {
  // If we are forcing roads, continue the sequence
  if (forcedRoadCount > 0) {
    forcedRoadCount--;
    lastTypes.push("road");
    if (lastTypes.length > 10) lastTypes.shift();
    return "road";
  }

  // Analyze current patterns
  const patternLength = 3;
  const currentPattern = lastTypes.slice(-patternLength);

  // Count recent types
  const recentRoads = currentPattern.filter((t) => t === "road").length;
  const recentForests = currentPattern.filter((t) => t === "forest").length;
  const recentGrass = currentPattern.filter((t) => t === "grass").length;

  let weights = {
    road: 0.4, // Base probability for road
    forest: 0.3, // Base probability for forest
    grass: 0.3, // Base probability for grass
  };

  // Adjust weights based on recent patterns
  if (recentRoads >= 2) {
    // Too many consecutive road rows, reduce probability
    weights.road *= 0.5;
    weights.forest *= 1.5;
    weights.grass *= 1.5;
  }

  if (recentForests >= 2) {
    // Too many consecutive forest rows, reduce probability
    weights.forest *= 0.5;
    weights.road *= 1.3;
    weights.grass *= 1.3;
  }

  // Ensure a minimum of empty spaces every certain time
  if (recentGrass === 0 && lastTypes.length >= 4) {
    weights.grass *= 2; // Increase probability of empty space
  }

  // Normalize weights
  const totalWeight = weights.road + weights.forest + weights.grass;
  weights.road /= totalWeight;
  weights.forest /= totalWeight;
  weights.grass /= totalWeight;

  // Generate type based on weights
  const random = Math.random();
  let result;

  if (random < weights.road) {
    result = "road";
    // When a road is generated, force at least one additional row
    forcedRoadCount = 1; // This will generate 2 rows in total (this + the next)

    // Probability of generating a third road row (30% chance)
    if (Math.random() < 0.3) {
      forcedRoadCount = 2; // This will generate 3 rows in total
    }
  } else if (random < weights.road + weights.forest) {
    result = "forest";
  } else {
    result = "grass";
  }

  // Save this type for future decisions
  lastTypes.push(result);
  if (lastTypes.length > 10) lastTypes.shift(); // Keep only the last 10

  return result;
};

const ROAD_VARIANTS = ["default", "desert", "neon"];
export const getRandomVariant = () => {
  const index = Math.floor(Math.random() * ROAD_VARIANTS.length);
  return ROAD_VARIANTS[index];
};

export const createGoldCoin = () => {
  return {
    id: nanoid(6),
    name: itemNames.goldCoins,
    slug: itemSlugs.goldCoins,
    value: itemValues.goldCoinsValue,
    type: itemTypes.coins,
    color: itemColors.goldCoinsColor,
    description: "Shiny gold coins used for transactions.",
    expirationTurns: expirationTurns.none,
    isRedeemed: false,
    quantity: 1,
  };
};

export const changeGoldCoinQuantity = (goldCoin, quantity) => {
  return {
    ...goldCoin,
    quantity,
  };
};

export const createRewardVoucher = (
  value = itemValues.rewardVoucherValue,
  description = "A voucher that can be redeemed for rewards."
) => {
  return {
    id: nanoid(6),
    name: itemNames.rewardVoucher,
    slug: itemSlugs.rewardVoucher,
    value,
    type: itemTypes.voucher,
    color: itemColors.rewardVoucherColor,
    description,
    expirationTurns: expirationTurns.rewardVoucher,
    isRedeemed: false,
  };
};
