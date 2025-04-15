"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Player } from "./game-player";
import { Controls } from "./game-controls";
import { GameCamera } from "./game-camera";
import { AxisHelper2D } from "./scenario-axis-helper";
import { Road } from "./game-road";
import {
  ObstacleObj,
  generateObstacle,
  generateRewards,
} from "./game-obj-tree";
import { getRandomTerrainType } from "./game-utils";
import { MoneyChest } from "./game-obj-money-chest";
import { GoldCoin } from "./game-obj-gold-coin";
import { RewardVoucher } from "./game-obj-reward-voucher";
// import { OrbitControls } from "@react-three/drei";

// Game constants
const GAME_CONSTANTS = {
  minTileIndex: -8,
  maxTileIndex: 8,
  tileSize: 42,
};

// Grass tile component
function Grass({ rowIndex }) {
  const tilesPerRow =
    GAME_CONSTANTS.maxTileIndex - GAME_CONSTANTS.minTileIndex + 1;
  const tileSize = GAME_CONSTANTS.tileSize;

  return (
    <group position={[0, rowIndex * tileSize, 0]}>
      {/* Middle section */}
      <mesh receiveShadow position={[0, 0, 1.5]}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color="#e8f1f2" flatShading />
      </mesh>

      {/* Left section */}
      <mesh position={[-tilesPerRow * tileSize, 0, 1.5]}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color="#C7C9C9" flatShading />
      </mesh>

      {/* Right section */}
      <mesh position={[tilesPerRow * tileSize, 0, 1.5]}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color="#C7C9C9" flatShading />
      </mesh>
    </group>
  );
}

// Game environment lights
function GameLights() {
  const dirLightRef = useRef();

  useEffect(() => {
    if (dirLightRef.current) {
      dirLightRef.current.position.set(-100, -100, 200);
      dirLightRef.current.up.set(0, 0, 1);
    }
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        ref={dirLightRef}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-400}
        shadow-camera-right={400}
        shadow-camera-top={400}
        shadow-camera-bottom={-400}
        shadow-camera-near={50}
        shadow-camera-far={400}
      />
    </>
  );
}

// Main game component
export function CrossyRoad() {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [playerRotation, setPlayerRotation] = useState(0);
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  const movesQueue = useRef([]);
  const currentPosition = useRef({ currentRow: 0, currentTile: 0 });
  const playerRef = useRef();

  // En la inicialización de filas:
  useEffect(() => {
    const initialRows = [];

    for (let i = -9; i <= 50; i++) {
      if (i < 0) {
        initialRows.push({
          type: "grass",
          rowIndex: i,
          trees: [],
          rewards: [],
        });
      } else {
        const type = getRandomTerrainType();
        console.log("type", type);

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

    setRows(initialRows);
  }, []);

  // Process next move from queue
  const processNextMove = () => {
    if (movesQueue.current.length === 0) {
      setIsMoving(false);
      return;
    }

    const direction = movesQueue.current.shift();
    const tileSize = GAME_CONSTANTS.tileSize;

    // Update logical position
    let newRow = currentPosition.current.currentRow;
    let newTile = currentPosition.current.currentTile;

    if (direction === "forward") newRow += 1;
    if (direction === "backward") newRow -= 1;
    if (direction === "left") newTile -= 1;
    if (direction === "right") newTile += 1;

    // Update current position reference
    currentPosition.current = { currentRow: newRow, currentTile: newTile };

    // Update visual position and rotation
    const newX = newTile * tileSize;
    const newY = newRow * tileSize;

    let newRotation = 0;
    if (direction === "forward") newRotation = 0;
    if (direction === "left") newRotation = Math.PI / 2;
    if (direction === "right") newRotation = -Math.PI / 2;
    if (direction === "backward") newRotation = Math.PI;

    console.log(`Moving ${direction} to position:`, { x: newX, y: newY });

    // Set new position and rotation to trigger animation
    setPlayerPosition({ x: newX, y: newY });
    setPlayerRotation(newRotation);
    setIsMoving(true);

    // Update score if moving forward
    if (direction === "forward") {
      setScore(newRow);

      // Add more rows if needed
      if (newRow > rows.length - 10) {
        addMoreRows();
      }
    }
  };

  // Handler for when a move animation completes
  const handleMoveComplete = () => {
    console.log("Move complete callback received");
    // Wait a small timeout to ensure state updates are processed
    setTimeout(() => {
      processNextMove();
    }, 50);
  };

  // Add more rows (placeholder function)
  const addMoreRows = () => {
    // Add your logic for generating new rows
    console.log("Would add more rows here");
  };

  // Queue a new movement
  const queueMove = (direction) => {
    console.log("Queueing move:", direction);

    if (movesQueue.current.length > 1) return;

    // You could add validation here

    // Add move to queue
    movesQueue.current.push(direction);

    // If not currently moving, process this move immediately
    if (!isMoving) {
      processNextMove();
    }
  };

  // Handler for control button clicks
  const handleMove = (direction) => {
    queueMove(direction);
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-5 left-0 w-full text-center z-10">
        <div className="text-2xl font-bold text-white bg-black bg-opacity-50 py-1 px-4 rounded-lg inline-block">
          Score: {score}
        </div>
      </div>

      <Canvas shadows>
        <GameCamera target={playerRef} />
        <GameLights />

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
          onMoveComplete={handleMoveComplete}
        />

        {/* Optional - For debugging */}
        <axesHelper args={[100]} />

        {/* Scenario stuff */}
        <AxisHelper2D
          position={[100, -80, 1]}
          rotation={[0, 0, Math.PI / 2]}
          lengthX={1000}
          wa
          lengthY={500}
          thickness={5}
          colorX="#ffffff"
          colorY="#ffffff"
        />

        {/* <OrbitControls makeDefault /> */}
      </Canvas>

      <Controls onMove={handleMove} />
    </div>
  );
}
