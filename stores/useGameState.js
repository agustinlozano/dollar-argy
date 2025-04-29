// hooks/useGameState.js
import { GAME_CONSTANTS } from "@/components/game";
import {
  generateObstacle,
  generateRewards,
  generateChests,
} from "@/components/game-obj.helper";
import { getRandomTerrainType } from "@/components/game.utils";
import { create } from "zustand";

const MOVEMENT_COOLDOWN = 200; // Ms between allowed movements
const QUEUE_SIZE_LIMIT = 1; // Maximum number of moves in queue
const FRIST_ROW = 0;
const BASE_ROWS = 9;

export const useGameStore = create((set, get) => ({
  // Player State
  playerPosition: { x: 0, y: 0 },
  isMoving: false,

  // Dance State
  isDancing: false,
  danceStartPosition: null,

  // Game State
  score: 0,
  rows: [],
  activeSpells: [],

  // Torch Light State
  isTorchActive: true,

  // Movement Queue
  movesQueue: [],
  currentPosition: { currentRow: 0, currentTile: 0 },

  // throttle
  lastMoveTime: 0,

  // Actions
  initializeRows: () => {
    const initialRows = [];

    for (let i = -BASE_ROWS; i <= GAME_CONSTANTS.initialRows + BASE_ROWS; i++) {
      if (i < FRIST_ROW) {
        initialRows.push({
          type: "grass",
          rowIndex: i,
          trees: generateObstacle(),
          rewards: [],
          chests: [],
        });
      } else if (i === 22) {
        // Special campaign zone at row 6
        initialRows.push({
          type: "special",
          rowIndex: i,
          component: "FirstZone",
        });
      } else if (i > GAME_CONSTANTS.initialRows - BASE_ROWS) {
        initialRows.push({
          type: "grass",
          rowIndex: i,
          trees: generateObstacle(),
          rewards: [],
          chests: [],
        });
      } else {
        const type = getRandomTerrainType();

        if (type === "road") {
          initialRows.push({
            type: "road",
            variant: "default",
            rowIndex: i,
          });
        } else if (type === "forest") {
          const trees = generateObstacle();
          const rewards = generateRewards(trees);
          const chests = generateChests(trees, rewards);

          initialRows.push({
            type: "grass",
            rowIndex: i,
            trees,
            rewards,
            chests,
          });
        } else {
          initialRows.push({
            type: "grass",
            rowIndex: i,
            trees: [],
            rewards: [],
            chests: [],
          });
        }
      }
    }

    set({ rows: initialRows });
  },

  // Toggle torch light
  toggleTorch: () => {
    set((state) => ({ isTorchActive: !state.isTorchActive }));
  },

  // Common Player Actions
  movePlayer: (direction) => {
    const state = get();
    const now = Date.now();

    // Verificar si ha pasado suficiente tiempo desde el último movimiento
    if (now - state.lastMoveTime < MOVEMENT_COOLDOWN) {
      return; // Ignorar movimientos demasiado rápidos
    }

    // Verificar si la cola no está llena
    if (state.movesQueue.length >= QUEUE_SIZE_LIMIT) {
      return; // No agregar más movimientos si la cola está llena
    }

    // Actualizar el tiempo del último movimiento
    set({
      lastMoveTime: now,
      movesQueue: [...state.movesQueue, direction],
    });

    // Si no está en movimiento, procesar el siguiente movimiento
    if (!state.isMoving) {
      get().processNextMove();
    }
  },

  processNextMove: () => {
    const state = get();
    if (state.movesQueue.length === 0) {
      set({ isMoving: false });
      return;
    }

    // Tomamos solo el primer movimiento de la cola
    const [direction, ...remainingMoves] = state.movesQueue;
    const tileSize = GAME_CONSTANTS.tileSize;

    // Update logical position
    let newRow = state.currentPosition.currentRow;
    let newTile = state.currentPosition.currentTile;

    // Calculate potential new position
    if (direction === "forward") newRow += 1;
    if (direction === "backward") newRow -= 1;
    if (direction === "left") newTile -= 1;
    if (direction === "right") newTile += 1;

    // Check movement limits
    const isWithinLimits =
      newTile >= -10 && newTile <= 10 && newRow >= -10 && newRow <= 40;

    if (!isWithinLimits) {
      // Solo removemos el movimiento actual y continuamos con el siguiente
      set({ movesQueue: remainingMoves });
      setTimeout(() => get().processNextMove(), 50);
      return;
    }

    // Update position and rotation
    const newX = newTile * tileSize;
    const newY = newRow * tileSize;

    set({
      playerPosition: { x: newX, y: newY },
      currentPosition: { currentRow: newRow, currentTile: newTile },
      movesQueue: remainingMoves,
      isMoving: true,
    });
  },

  castSpell: () => {
    set((state) => ({
      activeSpells: [
        ...state.activeSpells,
        {
          id: Date.now(),
          position: [
            state.playerPosition.x + 30,
            state.playerPosition.y + 25,
            80, // 25 + 50 como tenías antes
          ],
        },
      ],
    }));
  },

  removeSpell: (spellId) => {
    set((state) => ({
      activeSpells: state.activeSpells.filter((spell) => spell.id !== spellId),
    }));
  },

  setIsMoving: (isMoving) => {
    set({ isMoving });

    if (!isMoving) {
      // Asegurarnos de que el siguiente movimiento tenga un delay mínimo
      const state = get();
      const timeElapsed = Date.now() - state.lastMoveTime;
      const remainingCooldown = Math.max(0, MOVEMENT_COOLDOWN - timeElapsed);

      setTimeout(() => {
        const currentState = get();
        if (currentState.movesQueue.length > 0) {
          currentState.processNextMove();
        }
      }, Math.max(50, remainingCooldown)); // Usar el mayor entre 50ms y el cooldown restante
    }
  },

  onMoveComplete: () => {
    const state = get();
    if (state.movesQueue.length > 0) {
      state.processNextMove();
    } else {
      set({ isMoving: false });
    }
  },

  setDanceState: (isDancing, startPosition = null) => {
    set({ isDancing, danceStartPosition: startPosition });
  },
}));
