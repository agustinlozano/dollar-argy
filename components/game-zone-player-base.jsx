import * as THREE from "three";
import { useMemo } from "react";
import { GameTile } from "./game-tile";
import { TorchLight } from "./game-light-torch";
import { ArgyFlag } from "./scenario-argy-flag";

export const GameZonePlayerBase = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  // Constants for the base layout
  const TILE_SIZE = 50;
  const TILE_HEIGHT = 4;
  const ROWS = 2;
  const COLS = 6;

  // Generate tiles positions
  const tilesPositions = useMemo(() => {
    const positions = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        positions.push([
          col * TILE_SIZE, // X - horizontal spread
          row * TILE_SIZE, // Y - vertical levels
          0, // Z - depth (all same level)
        ]);
      }
    }
    return positions;
  }, []);

  // Flag position in the middle of the base
  const flagPosition = useMemo(() => [TILE_SIZE * 1.5, TILE_SIZE * 1.5, 0], []);

  return (
    <group position={position} rotation={rotation}>
      {/* Base tiles */}
      {tilesPositions.map((pos, index) => (
        <GameTile
          key={index}
          position={pos}
          size={TILE_SIZE}
          height={TILE_HEIGHT}
        />
      ))}

      {/* Torches */}
      <TorchLight
        decay={1}
        position={[50, 42, 20]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <TorchLight
        decay={1}
        position={[TILE_SIZE * 5, 42, 20]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      {/* Flag in the middle */}
      <group position={flagPosition}>
        <ArgyFlag position={[0, 0, 0]} />
      </group>
    </group>
  );
};
