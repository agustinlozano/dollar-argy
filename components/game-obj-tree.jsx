import { GAME_CONSTANTS } from "@/lib/consts";

export function ObstacleObj({ tileIndex, height = 45, position = [0, 0, 0] }) {
  const tileSize = GAME_CONSTANTS.tileSize;

  return (
    <group position={[tileIndex * tileSize + tileSize / 2, position[1], 0]}>
      {/* Tronco */}
      <mesh castShadow receiveShadow position={[0, 0, 10]}>
        <boxGeometry args={[15, 15, 20]} />
        <meshLambertMaterial color="#4d2926" flatShading />
      </mesh>

      {/* Copa */}
      <mesh castShadow receiveShadow position={[0, 0, height / 2 + 20]}>
        <boxGeometry args={[30, 30, height]} />
        <meshLambertMaterial color="#7aa21d" flatShading />
      </mesh>
    </group>
  );
}
