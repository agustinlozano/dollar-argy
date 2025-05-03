"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { PlayerDirectionalLight } from "./game-directional-light";

import { GameUI } from "@/components/ui/game-ui";
import { DancingIndicator } from "./ui/game-dance-badge";

import { Player } from "./game-player";
import { GameCamera } from "./game-camera";
import { DanceCamera } from "./game-dance-camera";

import Grass from "./game-terrain-grass";
import Road from "./game-terrain-road";

import { TerrainSection } from "./game-terrain-section";
import { FirstZone } from "./game-zone-begin";
import { GameZonePlayerBase } from "./game-zone-player-base";

import { ObstacleObj } from "./game-obj-tree";
import { MoneyChest } from "./game-obj-money-chest";
import { GoldCoin } from "./game-obj-gold-coin";
import { RewardVoucher } from "./game-obj-reward-voucher";

import { SpellEffect } from "./game-spell";

import { enviroment } from "@/lib/env-vars";

import { useGameStore } from "@/stores/useGameState";
import { useInventoryStore } from "@/stores/useInventoryState";
import { useInventoryUIStore } from "@/stores/useInventoryUIState";

import { useResizeEffect } from "./game.hooks";

// Game constants
export const GAME_CONSTANTS = {
  minTileIndex: -8,
  maxTileIndex: 8,
  tileSize: 42,
  initialRows: 50,
};

// Main game component
// Dollar Argy is a game where a thousand Peso Argentino bill fights against a One Dollar Bill.
export function DollarArgyGame() {
  const {
    playerPosition,
    rows,
    activeSpells,
    movePlayer,
    castSpell,
    removeSpell,
    isDancing,
    danceStartPosition,
  } = useGameStore();

  const { items, spells } = useInventoryStore();
  const { isInventoryOpen, toggleInventory } = useInventoryUIStore();

  const playerRef = useRef();
  const containerRef = useRef();

  // Handle window resize
  const canvasSize = useResizeEffect(containerRef);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <Canvas
        shadows
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
          // Prevent default touch actions to avoid zooming or other gestures
          touchAction: "none",
        }}
        onCreated={({ gl }) => {
          // Limit pixel ratio (2x) for better performance
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <ambientLight intensity={0.02} />
        {isDancing && danceStartPosition ? (
          <>
            <DanceCamera position={danceStartPosition} />
            <DancingIndicator position={danceStartPosition} />
          </>
        ) : (
          <GameCamera target={playerRef} />
        )}

        {/* debug grid */}
        {/* <DebugGrid /> */}

        {/* Scenario stuff */}
        {/* <TorchLight position={[0, -30, 6.5]} rotation={[Math.PI / 2, 0, 0]} /> */}
        {/* <ArgyFlag position={[GAME_CONSTANTS.tileSize * 2, 0, 0]} />
        <GameTile position={[0, 0, 0]} /> */}
        <GameZonePlayerBase position={[-180, -42, 0]} />

        <Player ref={playerRef} position={playerPosition} />
        <PlayerDirectionalLight />

        {/* Render active spells */}
        {activeSpells.map((spell) => (
          <SpellEffect
            key={spell.id}
            position={spell.position}
            onComplete={() => removeSpell(spell.id)}
          />
        ))}

        {/* Map rows */}
        {rows.map((row) => {
          if (row.type === "road") {
            return (
              <Road
                key={row.rowIndex}
                rowIndex={row.rowIndex}
                variant={row.variant}
              />
            );
          } else if (row.type === "special") {
            return (
              <TerrainSection key={row.rowIndex} rowIndex={row.rowIndex}>
                <FirstZone position={[0, 0, 0]} />
              </TerrainSection>
            );
          } else {
            return (
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
                {/* Render rewards (coins and vouchers) */}
                {row.rewards &&
                  row.rewards.map((reward, rewardIndex) => {
                    const position = [
                      reward.tileIndex * GAME_CONSTANTS.tileSize,
                      row.rowIndex * GAME_CONSTANTS.tileSize,
                      reward.zOffset,
                    ];

                    switch (reward.type) {
                      case "coins":
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
                {/* Render chests separately */}
                {row.chests &&
                  row.chests.map((chest, chestIndex) => (
                    <MoneyChest
                      key={`chest-${row.rowIndex}-${chestIndex}`}
                      position={[
                        chest.tileIndex * GAME_CONSTANTS.tileSize,
                        row.rowIndex * GAME_CONSTANTS.tileSize,
                        chest.zOffset,
                      ]}
                    />
                  ))}
              </group>
            );
          }
        })}

        {/* Optional - For debugging */}
        <axesHelper args={[100]} />

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

      <GameUI
        items={items}
        spells={spells}
        isInventoryOpen={isInventoryOpen}
        onInventoryToggle={toggleInventory}
        onMove={movePlayer}
        onCastSpell={castSpell}
      />
    </div>
  );
}
