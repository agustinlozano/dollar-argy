"use client";

import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Player } from "./game-player";
import { Controls } from "./game-controls";
import { GameCamera } from "./game-camera";
import { Grass } from "./game-terrain-grass";
import { Road } from "./game-road";
import { AxisHelper2D } from "./scenario-axis-helper";
import { ObstacleObj } from "./game-obj-tree";
import { MoneyChest } from "./game-obj-money-chest";
import { GoldCoin } from "./game-obj-gold-coin";
import { RewardVoucher } from "./game-obj-reward-voucher";
import { PlayerDirectionalLight } from "./game-directional-light";
import { SpellEffect } from "./game-spell";

import { enviroment } from "@/lib/env-vars";

import { useGameStore } from "@/stores/useGameState";
import { PivotControls } from "@react-three/drei";

// Game constants
export const GAME_CONSTANTS = {
  minTileIndex: -8,
  maxTileIndex: 8,
  tileSize: 42,
  initialRows: 50,
};

// Main game component
// Dollar Argy is a game where a thousand Peso Argentino bill
// fights against a One Dollar Bill.
export function DollarArgyGame() {
  const {
    playerPosition,
    playerRotation,
    score,
    rows,
    activeSpells,
    movePlayer,
    castSpell,
    removeSpell,
    initializeRows,
  } = useGameStore();

  const playerRef = useRef();

  // Inicializar filas al montar el componente
  useEffect(() => {
    initializeRows();
  }, []);

  // // En la inicialización de filas:
  // useEffect(() => {
  //   const initialRows = [];

  //   for (let i = -9; i <= GAME_CONSTANTS.initialRows; i++) {
  //     if (i < 0) {
  //       initialRows.push({
  //         type: "grass",
  //         rowIndex: i,
  //         trees: [],
  //         rewards: [],
  //       });
  //     } else {
  //       const type = getRandomTerrainType();
  //       console.log("type", type);

  //       if (type === "road") {
  //         initialRows.push({
  //           type: "road",
  //           variant: "default",
  //           rowIndex: i,
  //         });
  //       } else if (type === "forest") {
  //         initialRows.push({
  //           type: "grass",
  //           rowIndex: i,
  //           trees: generateObstacle(),
  //           rewards: generateRewards(),
  //         });
  //       } else {
  //         initialRows.push({
  //           type: "grass",
  //           rowIndex: i,
  //           trees: [],
  //           rewards: [],
  //         });
  //       }
  //     }
  //   }

  //   setRows(initialRows);
  // }, []);

  // // Process next move from queue
  // const processNextMove = () => {
  //   if (movesQueue.current.length === 0) {
  //     setIsMoving(false);
  //     return;
  //   }

  //   const direction = movesQueue.current.shift();
  //   const tileSize = GAME_CONSTANTS.tileSize;

  //   // Update logical position
  //   let newRow = currentPosition.current.currentRow;
  //   let newTile = currentPosition.current.currentTile;

  //   // Calculate potential new position
  //   if (direction === "forward") newRow += 1;
  //   if (direction === "backward") newRow -= 1;
  //   if (direction === "left") newTile -= 1;
  //   if (direction === "right") newTile += 1;

  //   // Check movement limits
  //   const isWithinLimits =
  //     newTile >= -10 && // Left limit
  //     newTile <= 10 && // Right limit
  //     newRow >= -10 && // Backward limit
  //     newRow <= 40; // Forward limit

  //   // If movement is outside limits, cancel it
  //   if (!isWithinLimits) {
  //     console.log("Movement cancelled: Outside allowed area");
  //     setIsMoving(false);
  //     processNextMove(); // Process next move in queue if any
  //     return;
  //   }

  //   // Update current position reference
  //   currentPosition.current = { currentRow: newRow, currentTile: newTile };

  //   // Update visual position and rotation
  //   const newX = newTile * tileSize;
  //   const newY = newRow * tileSize;

  //   let newRotation = 0;
  //   if (direction === "forward") newRotation = 0;
  //   if (direction === "left") newRotation = Math.PI / 2;
  //   if (direction === "right") newRotation = -Math.PI / 2;
  //   if (direction === "backward") newRotation = Math.PI;

  //   console.log(`Moving ${direction} to position:`, { x: newX, y: newY });

  //   // Set new position and rotation to trigger animation
  //   setPlayerPosition({ x: newX, y: newY });
  //   setPlayerRotation(newRotation);
  //   setIsMoving(true);

  //   // Update score if moving forward
  //   if (direction === "forward") {
  //     // Add more rows if needed
  //     if (newRow > rows.length - 10) {
  //       addMoreRows();
  //     }
  //   }
  // };

  // // Handler for when a move animation completes
  // const handleMoveComplete = () => {
  //   console.log("Move complete callback received");
  //   // Wait a small timeout to ensure state updates are processed
  //   setTimeout(() => {
  //     processNextMove();
  //   }, 50);
  // };

  // // Add more rows (placeholder function)
  // const addMoreRows = () => {
  //   // Add your logic for generating new rows
  //   console.log("Would add more rows here");
  // };

  // // Queue a new movement
  // const queueMove = (direction) => {
  //   console.log("Queueing move:", direction);

  //   if (movesQueue.current.length > 1) return;

  //   // You could add validation here

  //   // Add move to queue
  //   movesQueue.current.push(direction);

  //   // If not currently moving, process this move immediately
  //   if (!isMoving) {
  //     processNextMove();
  //   }
  // };

  // // Handler for control button clicks
  // const handleMove = (direction) => {
  //   queueMove(direction);
  // };

  // const handleCastSpell = () => {
  //   const spellId = spellIdCounter.current++;
  //   const spellPosition = [
  //     playerPosition.x,
  //     playerPosition.y,
  //     // TODO: 25 is bc the bill is 25 units tall use a constant
  //     25 + 50, // Adjust height as needed
  //   ];

  //   setActiveSpells((spells) => [
  //     ...spells,
  //     {
  //       id: spellId,
  //       position: spellPosition,
  //     },
  //   ]);
  // };

  // const handleSpellComplete = (spellId) => {
  //   setActiveSpells((spells) => spells.filter((spell) => spell.id !== spellId));
  // };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-5 left-0 w-full text-center z-10">
        <div className="text-2xl font-bold text-white bg-black bg-opacity-50 py-1 px-4 rounded-lg inline-block">
          Score: {score}
        </div>
      </div>

      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <GameCamera target={playerRef} />
        <PlayerDirectionalLight />

        {/* Map rows */}
        {rows.map((row, index) =>
          row.type === "road" ? (
            <Road
              key={row.rowIndex}
              rowIndex={row.rowIndex}
              variant={row.variant}
            />
          ) : (
            <group key={row.rowIndex}>
              <Grass rowIndex={row.rowIndex} />
              {row.trees &&
                row.trees.map((tree, treeIndex) => (
                  <ObstacleObj
                    key={`tree-${row.rowIndex}-${treeIndex}`}
                    tileIndex={tree.tileIndex}
                    height={tree.height}
                    position={[
                      tree.tileIndex * GAME_CONSTANTS.tileSize,
                      row.rowIndex * GAME_CONSTANTS.tileSize,
                      0,
                    ]}
                  />
                ))}
              {row.rewards &&
                row.rewards.map((reward, rewardIndex) => {
                  const position = [
                    reward.tileIndex * GAME_CONSTANTS.tileSize,
                    row.rowIndex * GAME_CONSTANTS.tileSize,
                    reward.zOffset,
                  ];

                  switch (reward.type) {
                    case "chest":
                      return (
                        <MoneyChest
                          key={`chest-${row.rowIndex}-${rewardIndex}`}
                          position={position}
                        />
                      );
                    case "coin":
                      return (
                        <GoldCoin
                          key={`coin-${row.rowIndex}-${rewardIndex}`}
                          position={position}
                        />
                      );
                    case "voucher":
                      return (
                        <RewardVoucher
                          key={`voucher-${row.rowIndex}-${rewardIndex}`}
                          position={position}
                        />
                      );
                    default:
                      return null;
                  }
                })}
            </group>
          )
        )}

        <Player
          ref={playerRef}
          position={playerPosition}
          rotation={playerRotation}
        />

        {/* Render active spells */}
        {activeSpells.map((spell) => (
          <SpellEffect
            key={spell.id}
            position={spell.position}
            onComplete={() => removeSpell(spell.id)}
          />
        ))}

        {/* Optional - For debugging */}
        <axesHelper args={[100]} />

        {/* Scenario stuff */}
        <AxisHelper2D
          position={[100, -80, 1]}
          rotation={[0, 0, Math.PI / 2]}
          lengthX={1000}
          lengthY={800}
          thickness={5}
          colorX="#ffffff"
          colorY="#ffffff"
        />

        {enviroment === "test" && (
          <OrbitControls
            makeDefault
            minDistance={100}
            maxZoom={2}
            minZoom={0.1}
            maxPolarAngle={Math.PI / 2}
            enablePan={true}
          />
        )}
      </Canvas>

      <Controls onMove={movePlayer} onCastSpell={castSpell} />
    </div>
  );
}
