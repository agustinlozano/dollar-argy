import { useMemo, memo } from "react";
import * as THREE from "three";
import { GAME_CONSTANTS } from "@/lib/consts";

// Definir colores fuera del componente
const GRASS_COLORS = {
  middle: "#60993e",
  sides: "#065143",
};

// Crear materiales compartidos
const GRASS_MATERIALS = {
  middle: new THREE.MeshLambertMaterial({
    color: GRASS_COLORS.middle,
    flatShading: true,
  }),
  sides: new THREE.MeshLambertMaterial({
    color: GRASS_COLORS.sides,
    flatShading: true,
  }),
};

function Grass({ rowIndex }) {
  // Calcular posición una sola vez
  const yPosition = useMemo(
    () => rowIndex * GAME_CONSTANTS.tileSize,
    [rowIndex]
  );

  const tilesPerRow =
    GAME_CONSTANTS.maxTileIndex - GAME_CONSTANTS.minTileIndex + 1;
  const tileSize = GAME_CONSTANTS.tileSize;
  const totalWidth = tilesPerRow * tileSize;

  // Crear geometría compartida
  const GRASS_GEOMETRY = new THREE.BoxGeometry(totalWidth, tileSize, 3);

  return (
    <group position={[0, yPosition, 0]}>
      {/* Middle section */}
      <mesh
        receiveShadow
        position={[0, 0, 1.5]}
        geometry={GRASS_GEOMETRY}
        material={GRASS_MATERIALS.middle}
      />

      {/* Left section */}
      <mesh
        position={[-totalWidth, 0, 1.5]}
        geometry={GRASS_GEOMETRY}
        material={GRASS_MATERIALS.sides}
      />

      {/* Right section */}
      <mesh
        position={[totalWidth, 0, 1.5]}
        geometry={GRASS_GEOMETRY}
        material={GRASS_MATERIALS.sides}
      />
    </group>
  );
}

// Memoizar el componente
export default memo(Grass);
