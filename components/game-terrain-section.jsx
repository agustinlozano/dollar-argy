import { useMemo } from "react";
import * as THREE from "three";
import { GAME_CONSTANTS } from "./game";

// Define colors outside the component for reuse
const SECTION_COLORS = {
  middle: "#60993e",
  sides: "#065143",
};

// Create shared materials
const SECTION_MATERIALS = {
  middle: new THREE.MeshLambertMaterial({
    color: SECTION_COLORS.middle,
    flatShading: true,
  }),
  sides: new THREE.MeshLambertMaterial({
    color: SECTION_COLORS.sides,
    flatShading: true,
  }),
};

export function TerrainSection({ rowIndex, children }) {
  // Calculate position once
  const yPosition = useMemo(
    () => rowIndex * GAME_CONSTANTS.tileSize,
    [rowIndex]
  );

  const tilesPerRow =
    GAME_CONSTANTS.maxTileIndex - GAME_CONSTANTS.minTileIndex + 1;
  const tileSize = GAME_CONSTANTS.tileSize;
  const totalWidth = tilesPerRow * tileSize;

  // Create shared geometry
  const SECTION_GEOMETRY = useMemo(
    () => new THREE.BoxGeometry(totalWidth, tileSize, 3),
    [totalWidth, tileSize]
  );

  return (
    <group position={[0, yPosition, 0]}>
      {/* Middle section with children */}
      <group position={[0, 0, 1.5]}>
        <mesh
          receiveShadow
          geometry={SECTION_GEOMETRY}
          material={SECTION_MATERIALS.middle}
        />
        {children}
      </group>

      {/* Left section */}
      <mesh
        position={[-totalWidth, 0, 1.5]}
        geometry={SECTION_GEOMETRY}
        material={SECTION_MATERIALS.sides}
      />

      {/* Right section */}
      <mesh
        position={[totalWidth, 0, 1.5]}
        geometry={SECTION_GEOMETRY}
        material={SECTION_MATERIALS.sides}
      />
    </group>
  );
}
