import { GAME_CONSTANTS } from "./game";
import { rewardTypes, chestTypes } from "@/lib/consts";

// Generate obstacles (trees)
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
        const heightOptions = [45, 65, 80, 74, 105];
        const height =
          heightOptions[Math.floor(Math.random() * heightOptions.length)];

        obstacles.push({ tileIndex, height });
      }
    }
  }

  return obstacles;
};

// Generate rewards (coins and vouchers)
export const generateRewards = (existingObstacles = []) => {
  const rewards = [];
  const occupiedTiles = new Set(existingObstacles.map((obs) => obs.tileIndex));

  // Determine the number of rewards (less than trees)
  const minRewards = 1;
  const maxRewards = 3;
  const rewardCount =
    Math.floor(Math.random() * (maxRewards - minRewards + 1)) + minRewards;

  // Total tiles in the middle section
  const totalTiles =
    GAME_CONSTANTS.maxTileIndex - GAME_CONSTANTS.minTileIndex + 1;

  // Generate clusters of rewards (more spaced than trees)
  const clusters = Math.floor(Math.random() * 2) + 1; // 1-2 clusters
  const rewardsPerCluster = Math.ceil(rewardCount / clusters);

  for (let cluster = 0; cluster < clusters; cluster++) {
    // Choose a central point for the cluster
    const centerTile =
      Math.floor(Math.random() * totalTiles) + GAME_CONSTANTS.minTileIndex;

    // Distribute rewards around the center of the cluster
    for (let i = 0; i < rewardsPerCluster; i++) {
      let tileIndex;
      let attempts = 0;
      const maxAttempts = 20; // More attempts to find free space

      do {
        // Generate a random position around the center of the cluster
        // With a wider range than trees to avoid overlap
        const offset = Math.floor(Math.random() * 5) - 2; // -2 to 2
        tileIndex = centerTile + offset;

        // Ensure the object is within the limits
        tileIndex = Math.max(
          GAME_CONSTANTS.minTileIndex,
          Math.min(GAME_CONSTANTS.maxTileIndex, tileIndex)
        );

        attempts++;
        if (attempts > maxAttempts) break;
      } while (occupiedTiles.has(tileIndex));

      if (attempts <= maxAttempts) {
        occupiedTiles.add(tileIndex);

        // Select a random reward type (only coins and vouchers)
        const rewardTypesList = Object.values(rewardTypes);
        const type =
          rewardTypesList[Math.floor(Math.random() * rewardTypesList.length)];

        rewards.push({
          tileIndex,
          type,
          // Add a small random offset in Z to avoid all being at the same level
          zOffset: Math.random() * 2,
        });
      }
    }
  }

  return rewards;
};

// Generate chests
export const generateChests = (
  existingObstacles = [],
  existingRewards = []
) => {
  const chests = [];
  const occupiedTiles = new Set([
    ...existingObstacles.map((obs) => obs.tileIndex),
    ...existingRewards.map((reward) => reward.tileIndex),
  ]);

  // Maximum one cluster with 1-2 chests
  const chestCount = Math.floor(Math.random() * 2); // 1-2 chests

  // Total tiles in the middle section
  const totalTiles =
    GAME_CONSTANTS.maxTileIndex - GAME_CONSTANTS.minTileIndex + 1;

  // Choose a central point for the cluster
  const centerTile =
    Math.floor(Math.random() * totalTiles) + GAME_CONSTANTS.minTileIndex;

  // Distribute chests near the center
  for (let i = 0; i < chestCount; i++) {
    let tileIndex;
    let attempts = 0;
    const maxAttempts = 20;

    do {
      // Generate a random position near the center
      const offset = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1 to keep them together
      tileIndex = centerTile + offset;

      // Ensure the chest is within the limits
      tileIndex = Math.max(
        GAME_CONSTANTS.minTileIndex,
        Math.min(GAME_CONSTANTS.maxTileIndex, tileIndex)
      );

      attempts++;
      if (attempts > maxAttempts) break;
    } while (occupiedTiles.has(tileIndex));

    if (attempts <= maxAttempts) {
      occupiedTiles.add(tileIndex);

      chests.push({
        tileIndex,
        type: chestTypes.chest,
        zOffset: Math.random() * 2,
      });
    }
  }

  return chests;
};
