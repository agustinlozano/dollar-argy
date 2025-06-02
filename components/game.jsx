"use client";

import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";

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
import { SanctuaryZone } from "./game-zone-sanctuary";
import { MelancholyGarden } from "./game-zone-melancholy-garden";
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
import { useGameAudio } from "@/hooks/useGameAudio";
import { GAME_CONSTANTS } from "@/lib/consts";
import { DevCamera } from "./dev-camera";

// Main game component
// Dollar Argy is a game where a thousand Peso Argentino bill fights against a One Dollar Bill.
export function DollarArgyGame() {
  const {
    playerPosition,
    currentPosition,
    visibleRows,
    activeSpells,
    movePlayer,
    // castSpell,
    removeSpell,
    isDancing,
    danceStartPosition,
    updateVisibleRows,
  } = useGameStore();

  const { items, spells } = useInventoryStore();
  const { isInventoryOpen, toggleInventory } = useInventoryUIStore();

  // Initialize audio system
  useGameAudio();

  const playerRef = useRef();
  const containerRef = useRef();

  // Handle window resize
  const canvasSize = useResizeEffect(containerRef);

  // Actualizar filas visibles cuando cambia la posición
  useEffect(() => {
    updateVisibleRows();
  }, [playerPosition, updateVisibleRows]);

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
        {/* {enviroment === "development" && <Stats />} */}
        {enviroment === "production" && <Stats />}
        <ambientLight intensity={0.05} />
        {isDancing && danceStartPosition ? (
          <>
            <DanceCamera position={danceStartPosition} />
            <DancingIndicator position={danceStartPosition} />
          </>
        ) : (
          <GameCamera target={playerRef} />
        )}

        {/* Scenario stuff */}
        {/* <GameTile position={[0, 0, 0]} /> */}

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

        {/* Map rows - Ahora con visibleRows para mejor rendimiento */}
        {visibleRows.map((row) => {
          if (row.type === "road") {
            return (
              <Road
                key={row.rowIndex}
                rowIndex={row.rowIndex}
                variant={row.variant}
              />
            );
          } else if (row.type === "special") {
            return <Grass rowIndex={row.rowIndex} />;
            {
              /* return (
              <TerrainSection key={row.rowIndex} rowIndex={row.rowIndex}>
                {row.component === "FirstZone" && (
                  <FirstZone position={[0, 0, 0]} />
                )}
                {row.component === "SanctuaryZone" && (
                  <SanctuaryZone position={[0, 0, 0]} />
                )}
                {row.component === "MelancholyGarden" && (
                  <MelancholyGarden position={[0, 0, 0]} />
                )}
                {row.component === "GameZonePlayerBase" && (
                  <GameZonePlayerBase position={[-180, 0, 0]} />
                )}
              </TerrainSection>
            ); */
            }
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

        {enviroment === "test" && <DevCamera />}
      </Canvas>

      <GameUI
        items={items}
        spells={spells}
        isInventoryOpen={isInventoryOpen}
        onInventoryToggle={toggleInventory}
        onMove={movePlayer}
        // onCastSpell={castSpell}
      />
    </div>
  );
}
