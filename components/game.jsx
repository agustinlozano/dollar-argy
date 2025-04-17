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

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-5 left-0 w-full text-center z-10">
        <div className="text-2xl font-bold text-white bg-black bg-opacity-50 py-1 px-4 rounded-lg inline-block">
          Score {score}
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
