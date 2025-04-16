import { GAME_CONSTANTS } from "./game";

export function Grass({ rowIndex }) {
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
