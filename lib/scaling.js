import { EFFECTS } from "./consts-v2";

// Scaling factors per game stage
export const SCALING_FACTORS = {
  // Scaling criterion for damage effects
  DAMAGE: {
    early: 1,
    mid: 1.5,
    late: 2.25,
  },
  // Scaling criterion for percentage effects (heal, buffs, etc)
  PERCENTAGE: {
    early: 0,
    mid: 5,
    late: 10,
  },
};

// Mapping of effect types to their scaling criteria
const EFFECT_SCALING_CRITERIA = {
  [EFFECTS.DAMAGE]: "DAMAGE",
  [EFFECTS.HEAL]: "PERCENTAGE",
  [EFFECTS.DEFENSE_UP]: "PERCENTAGE",
  [EFFECTS.ATTACK_UP]: "PERCENTAGE",
  [EFFECTS.REGEN]: "PERCENTAGE",
};

/**
 * Scales an effect based on its type and game stage
 * @param {Object} effect - The effect to scale
 * @param {string} gameStage - Game stage (early, mid, late)
 * @returns {Object} Scaled effect
 */
function scaleEffect(effect, gameStage) {
  const scalingCriteria = EFFECT_SCALING_CRITERIA[effect.type];

  if (!scalingCriteria) {
    return effect; // If no scaling criteria is defined, return the effect unmodified
  }

  const scaledEffect = { ...effect };

  if (scalingCriteria === "DAMAGE") {
    // Scale damage multiplicatively
    scaledEffect.value = effect.value * SCALING_FACTORS.DAMAGE[gameStage];
  } else if (scalingCriteria === "PERCENTAGE") {
    // Increase percentage additively
    scaledEffect.value =
      effect.value + SCALING_FACTORS.PERCENTAGE[gameStage] / 100;
  }

  return scaledEffect;
}

/**
 * Applies scaling to all effects of a spell
 * @param {Object} spell - The spell to scale
 * @param {string} gameStage - Game stage (early, mid, late)
 * @returns {Object} Spell with scaled effects
 */
export function scaleSpell(spell, gameStage) {
  return {
    ...spell,
    effects: spell.effects.map((effect) => scaleEffect(effect, gameStage)),
  };
}
