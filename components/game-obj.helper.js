import { GAME_CONSTANTS } from "./game";

// Función mejorada para generar obstáculos con distribución más aleatoria
export const generateObstacle = () => {
  const occupiedTiles = new Set();
  const obstacles = [];

  // Determinar cantidad de obstáculos de forma más dinámica
  // Entre 3 y 8 árboles para una distribución más natural
  const minObstacles = 3;
  const maxObstacles = 8;
  const obstacleCount =
    Math.floor(Math.random() * (maxObstacles - minObstacles + 1)) +
    minObstacles;

  // Rango total de tiles en la sección middle
  const totalTiles =
    GAME_CONSTANTS.maxTileIndex - GAME_CONSTANTS.minTileIndex + 1;

  // Generar clusters de árboles para una distribución más natural
  const clusters = Math.floor(Math.random() * 3) + 1; // 1-3 clusters
  const treesPerCluster = Math.ceil(obstacleCount / clusters);

  for (let cluster = 0; cluster < clusters; cluster++) {
    // Elegir un punto central para el cluster
    const centerTile =
      Math.floor(Math.random() * totalTiles) + GAME_CONSTANTS.minTileIndex;

    // Distribuir árboles alrededor del centro del cluster
    for (let i = 0; i < treesPerCluster; i++) {
      let tileIndex;
      let attempts = 0;
      const maxAttempts = 15;

      do {
        // Generar una posición aleatoria alrededor del centro del cluster
        const offset = Math.floor(Math.random() * 3) - 1; // -1, 0, o 1
        tileIndex = centerTile + offset;

        // Asegurar que el árbol esté dentro de los límites
        tileIndex = Math.max(
          GAME_CONSTANTS.minTileIndex,
          Math.min(GAME_CONSTANTS.maxTileIndex, tileIndex)
        );

        attempts++;
        if (attempts > maxAttempts) break;
      } while (occupiedTiles.has(tileIndex));

      if (attempts <= maxAttempts) {
        occupiedTiles.add(tileIndex);

        // Variar alturas con más opciones para más naturalidad
        const heightOptions = [35, 45, 55, 65];
        const height =
          heightOptions[Math.floor(Math.random() * heightOptions.length)];

        obstacles.push({ tileIndex, height });
      }
    }
  }

  return obstacles;
};

// Tipos de objetos de recompensa
const REWARD_TYPES = {
  CHEST: "chest",
  COIN: "coin",
  VOUCHER: "voucher",
};

// Función para generar objetos de recompensa
export const generateRewards = (existingObstacles = []) => {
  const rewards = [];
  const occupiedTiles = new Set(existingObstacles.map((obs) => obs.tileIndex));

  // Determinar cantidad de recompensas (menos que árboles)
  const minRewards = 1;
  const maxRewards = 3;
  const rewardCount =
    Math.floor(Math.random() * (maxRewards - minRewards + 1)) + minRewards;

  // Rango total de tiles en la sección middle
  const totalTiles =
    GAME_CONSTANTS.maxTileIndex - GAME_CONSTANTS.minTileIndex + 1;

  // Generar clusters de recompensas (más espaciados que los árboles)
  const clusters = Math.floor(Math.random() * 2) + 1; // 1-2 clusters
  const rewardsPerCluster = Math.ceil(rewardCount / clusters);

  for (let cluster = 0; cluster < clusters; cluster++) {
    // Elegir un punto central para el cluster
    const centerTile =
      Math.floor(Math.random() * totalTiles) + GAME_CONSTANTS.minTileIndex;

    // Distribuir recompensas alrededor del centro del cluster
    for (let i = 0; i < rewardsPerCluster; i++) {
      let tileIndex;
      let attempts = 0;
      const maxAttempts = 20; // Más intentos para encontrar espacio libre

      do {
        // Generar una posición aleatoria alrededor del centro del cluster
        // Con un rango más amplio que los árboles para evitar superposición
        const offset = Math.floor(Math.random() * 5) - 2; // -2 a 2
        tileIndex = centerTile + offset;

        // Asegurar que el objeto esté dentro de los límites
        tileIndex = Math.max(
          GAME_CONSTANTS.minTileIndex,
          Math.min(GAME_CONSTANTS.maxTileIndex, tileIndex)
        );

        attempts++;
        if (attempts > maxAttempts) break;
      } while (occupiedTiles.has(tileIndex));

      if (attempts <= maxAttempts) {
        occupiedTiles.add(tileIndex);

        // Seleccionar tipo de recompensa aleatoriamente
        const rewardTypes = Object.values(REWARD_TYPES);
        const type =
          rewardTypes[Math.floor(Math.random() * rewardTypes.length)];

        rewards.push({
          tileIndex,
          type,
          // Agregar un pequeño offset aleatorio en Z para evitar que todos estén al mismo nivel
          zOffset: Math.random() * 2,
        });
      }
    }
  }

  return rewards;
};
