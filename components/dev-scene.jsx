"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";

import Grass from "./game-terrain-grass";
import Road from "./game-terrain-road";

import { FirstZone } from "./game-zone-begin";

import { PlayerDirectionalLight } from "./game-directional-light";
import { Player } from "./game-player";
import { ObstacleObj } from "./game-obj-tree";
import { DevCamera } from "./dev-camera";
import { M16M1 } from "./game-weapon-m16";
import { DevStudioLight } from "./dev-studio-light";

import { GAME_CONSTANTS, chestTypes, rewardTypes } from "@/lib/consts";
import { useResizeEffect } from "./game.hooks";
import { ModeToggle } from "@/app/theme-toggle";
import { GameObjTorch } from "./game-obj-torch";
import { GameZonePlayerBase } from "./game-zone-player-base";
import { MelancholyGarden } from "./game-zone-melancholy-garden";
// Hardcoded scene data
const hardcodedScene = {
  // 4 rows of grass (0-3)
  grassRows: [0, 1, 2, 3, 8, 9, 10, 11],

  // 4 rows of road (4-7)
  roadRows: [4, 5, 6, 7],

  // 2 chests in a cluster
  chests: [
    { rowIndex: 2, tileIndex: 0, type: chestTypes.chest, zOffset: 1 },
    { rowIndex: 2, tileIndex: 1, type: chestTypes.chest, zOffset: 0.5 },
  ],

  // 2 clusters of 4 vouchers
  vouchers: [
    // First cluster
    { rowIndex: 1, tileIndex: -5, type: rewardTypes.voucher, zOffset: 0.5 },
    { rowIndex: 1, tileIndex: -4, type: rewardTypes.voucher, zOffset: 1 },
    { rowIndex: 1, tileIndex: -3, type: rewardTypes.voucher, zOffset: 0.8 },
    { rowIndex: 0, tileIndex: -4, type: rewardTypes.voucher, zOffset: 0.3 },

    // Second cluster
    { rowIndex: 3, tileIndex: 4, type: rewardTypes.voucher, zOffset: 0.5 },
    { rowIndex: 3, tileIndex: 5, type: rewardTypes.voucher, zOffset: 0.8 },
    { rowIndex: 2, tileIndex: 4, type: rewardTypes.voucher, zOffset: 1 },
    { rowIndex: 2, tileIndex: 5, type: rewardTypes.voucher, zOffset: 0.3 },
  ],

  // 2 clusters of 6 coins
  coins: [
    // First cluster
    { rowIndex: 0, tileIndex: 2, type: rewardTypes.coins, zOffset: 0.8 },
    { rowIndex: 0, tileIndex: 3, type: rewardTypes.coins, zOffset: 0.5 },
    { rowIndex: 0, tileIndex: 4, type: rewardTypes.coins, zOffset: 1 },
    { rowIndex: 1, tileIndex: 2, type: rewardTypes.coins, zOffset: 0.3 },
    { rowIndex: 1, tileIndex: 3, type: rewardTypes.coins, zOffset: 0.9 },
    { rowIndex: 1, tileIndex: 4, type: rewardTypes.coins, zOffset: 0.6 },

    // Second cluster
    { rowIndex: 3, tileIndex: -6, type: rewardTypes.coins, zOffset: 0.5 },
    { rowIndex: 3, tileIndex: -5, type: rewardTypes.coins, zOffset: 0.8 },
    { rowIndex: 3, tileIndex: -4, type: rewardTypes.coins, zOffset: 0.3 },
    { rowIndex: 2, tileIndex: -6, type: rewardTypes.coins, zOffset: 0.9 },
    { rowIndex: 2, tileIndex: -5, type: rewardTypes.coins, zOffset: 0.4 },
    { rowIndex: 2, tileIndex: -4, type: rewardTypes.coins, zOffset: 0.7 },
  ],

  // 3 clusters of obstacles (trees)
  obstacles: [
    // First cluster (dense)
    { rowIndex: 0, tileIndex: -2, height: 55 },
    { rowIndex: 0, tileIndex: -3, height: 65 },
    { rowIndex: 1, tileIndex: -3, height: 45 },
    { rowIndex: 1, tileIndex: -2, height: 65 },
    { rowIndex: 1, tileIndex: -1, height: 55 },
    { rowIndex: 1, tileIndex: 0, height: 45 },

    // Second cluster (medium)
    { rowIndex: 1, tileIndex: 7, height: 65 },
    { rowIndex: 1, tileIndex: 8, height: 55 },
    { rowIndex: 2, tileIndex: 6, height: 45 },
    { rowIndex: 2, tileIndex: 7, height: 55 },
    { rowIndex: 2, tileIndex: 8, height: 65 },

    // Third cluster (sparse but taller)
    { rowIndex: 3, tileIndex: -1, height: 65 },
    { rowIndex: 3, tileIndex: 0, height: 65 },
    { rowIndex: 3, tileIndex: 1, height: 55 },
    { rowIndex: 3, tileIndex: 2, height: 55 },
  ],
};

export function DevScene() {
  const playerRef = useRef();
  const containerRef = useRef();

  // Handle window resize
  const canvasSize = useResizeEffect(containerRef);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="absolute top-4 left-4 z-10 bg-black/50 text-white p-2 rounded">
        <h1 className="text-lg font-bold">Dev Scene</h1>
        <p className="text-xs">Hardcoded terrain for testing</p>
      </div>

      <Canvas
        shadows
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
          touchAction: "none",
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <ambientLight intensity={0.5} />
        {/* <PlayerDirectionalLight /> */}
        <DevCamera />

        {/* Debug grid - always visible in dev scene */}
        {/* <DebugGrid /> */}

        {/* M16 con iluminación de estudio */}
        <group position={[0, 0, 100]}>
          <DevStudioLight
            position={[0, -42, 25]}
            intensity={0.1}
            showHelper={true}
          />
          <M16M1 position={[0, -20, 0]} />
        </group>

        {/* Player at center position */}
        <Player ref={playerRef} position={{ x: 140, y: 280 }} rotation={0} />

        {/* Zones */}
        <FirstZone position={[0, 380, 0]} />
        <MelancholyGarden position={[-280, 380, 0]} />

        <GameObjTorch />

        {/* <ArgyFlag position={[0, 0, 0]} /> */}
        {/* <GameTile position={[0, 0, 0]} /> */}

        <GameZonePlayerBase position={[0, 0, 0]} />

        <DevStudioLight
          position={[300, 180, 0]}
          intensity={1.2}
          showHelper={true}
        />

        {/* Grass rows */}
        {hardcodedScene.grassRows.map((rowIndex) => (
          <Grass key={`grass-${rowIndex}`} rowIndex={rowIndex} />
        ))}

        {/* Road rows */}
        {hardcodedScene.roadRows.map((rowIndex) => (
          <Road
            key={`road-${rowIndex}`}
            rowIndex={rowIndex}
            variant="default"
          />
        ))}

        {/* Trees */}
        {hardcodedScene.obstacles.map((tree, index) => (
          <ObstacleObj
            key={`tree-${index}`}
            tileIndex={tree.tileIndex}
            height={tree.height}
            position={[
              tree.tileIndex * GAME_CONSTANTS.tileSize,
              tree.rowIndex * GAME_CONSTANTS.tileSize,
              0,
            ]}
          />
        ))}

        {/* Coins */}
        {/* {hardcodedScene.coins.map((coin, index) => (
          <GoldCoin
            key={`coin-${index}`}
            position={[
              coin.tileIndex * GAME_CONSTANTS.tileSize,
              coin.rowIndex * GAME_CONSTANTS.tileSize,
              coin.zOffset,
            ]}
          />
        ))} */}

        {/* Vouchers */}
        {/* {hardcodedScene.vouchers.map((voucher, index) => (
          <RewardVoucher
            key={`voucher-${index}`}
            position={[
              voucher.tileIndex * GAME_CONSTANTS.tileSize,
              voucher.rowIndex * GAME_CONSTANTS.tileSize,
              voucher.zOffset,
            ]}
          />
        ))} */}

        {/* Chests */}
        {/* {hardcodedScene.chests.map((chest, index) => (
          <MoneyChest
            key={`chest-${index}`}
            position={[
              chest.tileIndex * GAME_CONSTANTS.tileSize,
              chest.rowIndex * GAME_CONSTANTS.tileSize,
              chest.zOffset,
            ]}
          />
        ))} */}

        {/* Helper axes for development */}
        <axesHelper args={[100]} />
      </Canvas>

      <ModeToggle />
    </div>
  );
}
