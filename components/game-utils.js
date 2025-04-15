// Generación inteligente de tipos de filas
let lastTypes = []; // Almacena los últimos tipos de fila generados

export const getRandomTerrainType = () => {
  // Análisis de patrones actuales
  const patternLength = 3;
  const currentPattern = lastTypes.slice(-patternLength);

  // Contar tipos recientes
  const recentRoads = currentPattern.filter((t) => t === "road").length;
  const recentForests = currentPattern.filter((t) => t === "forest").length;
  const recentGrass = currentPattern.filter((t) => t === "grass").length;

  let weights = {
    road: 0.4, // Probabilidad base para road
    forest: 0.3, // Probabilidad base para forest
    grass: 0.3, // Probabilidad base para grass
  };

  // Ajustar pesos según patrones recientes
  if (recentRoads >= 2) {
    // Demasiadas filas de carretera seguidas, reducir probabilidad
    weights.road *= 0.5;
    weights.forest *= 1.5;
    weights.grass *= 1.5;
  }

  if (recentForests >= 2) {
    // Demasiadas filas de bosque seguidas, reducir probabilidad
    weights.forest *= 0.5;
    weights.road *= 1.3;
    weights.grass *= 1.3;
  }

  // Asegurar un mínimo de espacios vacíos cada cierto tiempo
  if (recentGrass === 0 && lastTypes.length >= 4) {
    weights.grass *= 2; // Incrementar probabilidad de espacio vacío
  }

  // Normalizar pesos
  const totalWeight = weights.road + weights.forest + weights.grass;
  weights.road /= totalWeight;
  weights.forest /= totalWeight;
  weights.grass /= totalWeight;

  // Generar tipo basado en pesos
  const random = Math.random();
  let result;

  if (random < weights.road) {
    result = "road";
  } else if (random < weights.road + weights.forest) {
    result = "forest";
  } else {
    result = "grass";
  }

  // Guardar este tipo para futuras decisiones
  lastTypes.push(result);
  if (lastTypes.length > 10) lastTypes.shift(); // Mantener solo los últimos 10

  return result;
};

const ROAD_VARIANTS = ["default", "desert", "neon"];
export const getRandomVariant = () => {
  const index = Math.floor(Math.random() * ROAD_VARIANTS.length);
  return ROAD_VARIANTS[index];
};
