// hooks/useGameState.js
import { GAME_CONSTANTS } from "@/components/game";
import { generateObstacle, generateRewards } from "@/components/game-obj-tree";
import { getRandomTerrainType } from "@/components/game-utils";
import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  // Player State
  playerPosition: { x: 0, y: 0 },
  playerRotation: 0,
  isMoving: false,

  // Game State
  score: 0,
  rows: [],
  activeSpells: [],

  // Movement Queue
  movesQueue: [],
  currentPosition: { currentRow: 0, currentTile: 0 },

  // Actions
  // Nueva acción para inicializar las filas
  initializeRows: () => {
    const initialRows = [];

    for (let i = -9; i <= GAME_CONSTANTS.initialRows; i++) {
      if (i < 0) {
        initialRows.push({
          type: "grass",
          rowIndex: i,
          trees: [],
          rewards: [],
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
          initialRows.push({
            type: "grass",
            rowIndex: i,
            trees: generateObstacle(),
            rewards: generateRewards(),
          });
        } else {
          initialRows.push({
            type: "grass",
            rowIndex: i,
            trees: [],
            rewards: [],
          });
        }
      }
    }

    set({ rows: initialRows });
  },

  // To generate more map.
  addMoreRows: () => {
    const state = get();
    const currentRows = [...state.rows];
    const newRowIndex = currentRows[currentRows.length - 1].rowIndex + 1;

    const type = getRandomTerrainType();
    let newRow;

    if (type === "road") {
      newRow = {
        type: "road",
        variant: "default",
        rowIndex: newRowIndex,
      };
    } else if (type === "forest") {
      newRow = {
        type: "grass",
        rowIndex: newRowIndex,
        trees: generateObstacle(),
        rewards: generateRewards(),
      };
    } else {
      newRow = {
        type: "grass",
        rowIndex: newRowIndex,
        trees: [],
        rewards: [],
      };
    }

    set({ rows: [...currentRows, newRow] });
  },

  // Common Player Actions
  movePlayer: (direction) => {
    const state = get();
    if (state.movesQueue.length > 1) return;

    set((state) => ({
      movesQueue: [...state.movesQueue, direction],
    }));

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

    const direction = state.movesQueue[0];
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
      set((state) => ({
        movesQueue: state.movesQueue.slice(1),
      }));
      return;
    }

    // Update position and rotation
    const newX = newTile * tileSize;
    const newY = newRow * tileSize;
    let newRotation = 0;

    if (direction === "forward") newRotation = 0;
    if (direction === "left") newRotation = Math.PI / 2;
    if (direction === "right") newRotation = -Math.PI / 2;
    if (direction === "backward") newRotation = Math.PI;

    set((state) => ({
      playerPosition: { x: newX, y: newY },
      playerRotation: newRotation,
      currentPosition: { currentRow: newRow, currentTile: newTile },
      movesQueue: state.movesQueue.slice(1),
      isMoving: true,
    }));

    // Add more rows if needed
    if (direction === "forward" && newRow > state.rows.length - 10) {
      get().addMoreRows();
    }
  },

  castSpell: () => {
    set((state) => ({
      activeSpells: [
        ...state.activeSpells,
        {
          id: Date.now(),
          position: [
            state.playerPosition.x,
            state.playerPosition.y,
            75, // 25 + 50 como tenías antes
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
  },

  onMoveComplete: () => {
    const state = get();
    if (state.movesQueue.length > 0) {
      state.processNextMove();
    } else {
      set({ isMoving: false });
    }
  },
}));
