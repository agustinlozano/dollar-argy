import { Text } from "@react-three/drei";
import { GAME_CONSTANTS } from "./game";

export function DebugGrid() {
  const tilesPerRow =
    GAME_CONSTANTS.maxTileIndex - GAME_CONSTANTS.minTileIndex + 1;
  const tileSize = GAME_CONSTANTS.tileSize;

  // Generate array of row indices from -9 to initialRows
  const rowIndices = Array.from(
    { length: GAME_CONSTANTS.initialRows + 10 },
    (_, i) => i - 9
  );

  // Generate array of tile indices from minTileIndex to maxTileIndex
  const tileIndices = Array.from(
    { length: tilesPerRow },
    (_, i) => i + GAME_CONSTANTS.minTileIndex
  );

  return (
    <group>
      {/* Draw the grid */}
      {rowIndices.map((rowIndex) => (
        <group key={`row-${rowIndex}`} position={[0, rowIndex * tileSize, 10]}>
          {/* Horizontal line for each row */}
          <mesh position={[0, 0, 0.1]}>
            <planeGeometry args={[tilesPerRow * tileSize, 0.5]} />
            <meshBasicMaterial color="#666666" transparent opacity={0.3} />
          </mesh>

          {/* Row number indicator */}
          <Text
            position={[-tilesPerRow * tileSize * 0.55, 0, 0.1]}
            color="#666666"
            fontSize={8}
            anchorX="left"
          >
            Row {rowIndex}
          </Text>

          {/* Tile indices and vertical lines */}
          {tileIndices.map((tileIndex) => (
            <group
              key={`tile-${rowIndex}-${tileIndex}`}
              position={[tileIndex * tileSize, 0, 0.1]}
            >
              {/* Vertical line for each tile */}
              <mesh>
                <planeGeometry args={[0.5, tileSize]} />
                <meshBasicMaterial color="#666666" transparent opacity={0.2} />
              </mesh>

              {/* Tile index number */}
              {tileIndex === 0 && (
                <Text
                  position={[0, 0, 0.1]}
                  color="#666666"
                  fontSize={6}
                  anchorX="center"
                  anchorY="bottom"
                >
                  {tileIndex}
                </Text>
              )}
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}
