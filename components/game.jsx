"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import Controls from "./game-controls";
import { Player } from "./game-player";

// Game constants
const GAME_CONSTANTS = {
  minTileIndex: -8,
  maxTileIndex: 8,
  tileSize: 42,
};

// Custom camera that actually sets up correctly
function GameCamera() {
  const cameraRef = useRef();
  const { size } = useThree();

  // Compute camera dimensions using the same logic as original code
  const baseSize = 300;
  const viewRatio = size.width / size.height;
  const width = viewRatio < 1 ? baseSize : baseSize * viewRatio;
  const height = viewRatio < 1 ? baseSize / viewRatio : baseSize;

  useEffect(() => {
    if (!cameraRef.current) return;

    // Important: we need to set up properly after the camera is created
    cameraRef.current.up.set(0, 0, 1);
    cameraRef.current.position.set(300, -300, 300);
    cameraRef.current.lookAt(0, 0, 0);
    cameraRef.current.updateProjectionMatrix();
  }, []);

  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      left={width / -2}
      right={width / 2}
      top={height / 2}
      bottom={height / -2}
      near={100}
      far={900}
    />
  );
}

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
        <meshLambertMaterial color="#baf455" flatShading />
      </mesh>

      {/* Left section */}
      <mesh position={[-tilesPerRow * tileSize, 0, 1.5]}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color="#99c846" flatShading />
      </mesh>

      {/* Right section */}
      <mesh position={[tilesPerRow * tileSize, 0, 1.5]}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color="#99c846" flatShading />
      </mesh>
    </group>
  );
}

// Road tile component
function Road({ rowIndex }) {
  const tilesPerRow =
    GAME_CONSTANTS.maxTileIndex - GAME_CONSTANTS.minTileIndex + 1;
  const tileSize = GAME_CONSTANTS.tileSize;

  return (
    <group position={[0, rowIndex * tileSize, 0]}>
      {/* Middle section */}
      <mesh receiveShadow position={[0, 0, 1.5]}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color="#454a59" flatShading />
      </mesh>

      {/* Left section */}
      <mesh position={[-tilesPerRow * tileSize, 0, 1.5]}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color="#393d49" flatShading />
      </mesh>

      {/* Right section */}
      <mesh position={[tilesPerRow * tileSize, 0, 1.5]}>
        <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color="#393d49" flatShading />
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

  // Initialize game
  // useEffect(() => {
  //   // Create initial rows of grass
  //   const initialRows = [];
  //   for (let i = -9; i <= 10; i++) {
  //     if (i < 0) {
  //       initialRows.push({ type: "grass", rowIndex: i });
  //     } else {
  //       // Alternate between grass and road for testing
  //       initialRows.push({ type: i % 2 === 0 ? "grass" : "road", rowIndex: i });
  //     }
  //   }
  //   setRows(initialRows);
  // }, []);

  // Procesa el siguiente movimiento cuando el actual termina
  const processNextMove = () => {
    if (movesQueue.current.length === 0) {
      setIsMoving(false);
      return;
    }

    setIsMoving(true);
    const direction = movesQueue.current.shift();
    const tileSize = GAME_CONSTANTS.tileSize;

    // Actualiza la posición lógica
    if (direction === "forward") currentPosition.current.currentRow += 1;
    if (direction === "backward") currentPosition.current.currentRow -= 1;
    if (direction === "left") currentPosition.current.currentTile -= 1;
    if (direction === "right") currentPosition.current.currentTile += 1;

    // Actualiza la posición visual
    let newX = currentPosition.current.currentTile * tileSize;
    let newY = currentPosition.current.currentRow * tileSize;
    setPlayerPosition({ x: newX, y: newY });

    // Actualiza la rotación
    let newRotation = 0;
    if (direction === "forward") newRotation = 0;
    if (direction === "left") newRotation = Math.PI / 2;
    if (direction === "right") newRotation = -Math.PI / 2;
    if (direction === "backward") newRotation = Math.PI;
    setPlayerRotation(newRotation);

    // Actualiza el score si avanza
    if (direction === "forward") {
      setScore(currentPosition.current.currentRow);

      // Añadir más filas si es necesario
      if (currentPosition.current.currentRow > rows.length - 10) {
        // Lógica para añadir más filas
        addMoreRows();
      }
    }
  };

  // Maneja cuando termina un movimiento
  const handleMoveComplete = () => {
    processNextMove();
  };

  // Función para añadir filas adicionales (similar al addRows del código original)
  const addMoreRows = () => {
    // Tu lógica para generar nuevas filas aleatorias
    // ...
  };

  // Función para encolar un nuevo movimiento
  const queueMove = (direction) => {
    // Podrías añadir validaciones como en el código original para comprobar
    // si es un movimiento válido antes de añadirlo a la cola

    movesQueue.current.push(direction);

    if (!isMoving) {
      processNextMove();
    }
  };

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
        <GameCamera />
        <GameLights />

        {/* Map rows */}
        {rows.map((row, index) =>
          row.type === "grass" ? (
            <Grass key={`row-${index}`} rowIndex={row.rowIndex} />
          ) : (
            <Road key={`row-${index}`} rowIndex={row.rowIndex} />
          )
        )}

        <Player
          position={playerPosition}
          rotation={playerRotation}
          onMoveComplete={handleMoveComplete}
        />

        {/* Optional - For debugging */}
        <axesHelper args={[100]} />
      </Canvas>

      <Controls onMove={handleMove} />
    </div>
  );
}
