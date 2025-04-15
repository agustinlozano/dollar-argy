import { useRef, useEffect } from "react";

// type RoadVariant = "default" | "desert" | "neon";

// interface RoadProps {
//   rowIndex: number;
//   variant?: RoadVariant;
// }

const GAME_CONSTANTS = {
  minTileIndex: -8,
  maxTileIndex: 8,
  tileSize: 42,
};

const roadColors = {
  default: {
    middle: "#454a59",
    sides: "#393d49",
  },
  desert: {
    middle: "#04052e",
    sides: "#02010a",
  },
  neon: {
    middle: "#cae3ed",
    sides: "#B3B3B3",
  },
};

export function Road({ rowIndex, variant = "default" }) {
  const tilesPerRow =
    GAME_CONSTANTS.maxTileIndex - GAME_CONSTANTS.minTileIndex + 1;
  const tileSize = GAME_CONSTANTS.tileSize;
  const { middle, sides, line = "white" } = roadColors[variant];

  const totalWidth = tilesPerRow * tileSize;

  // Crear geometría de línea con longitud completa
  const lineRef = useRef(null);

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.computeLineDistances(); // Necesario para lineDashedMaterial
    }
  }, []);

  return (
    <group position={[0, rowIndex * tileSize, 0]}>
      {/* Middle section */}
      <mesh receiveShadow position={[0, 0, 1.5]}>
        <boxGeometry args={[totalWidth, tileSize, 5]} />
        <meshLambertMaterial color={middle} flatShading />
      </mesh>

      {/* Left section */}
      <mesh position={[-totalWidth, 0, 1.5]}>
        <boxGeometry args={[totalWidth, tileSize, 5]} />
        <meshLambertMaterial color={sides} flatShading />
      </mesh>

      {/* Right section */}
      <mesh position={[totalWidth, 0, 1.5]}>
        <boxGeometry args={[totalWidth, tileSize, 3]} />
        <meshLambertMaterial color={sides} flatShading />
      </mesh>

      {/* Dashed line along right margin of middle section */}
      <line
        ref={lineRef}
        position={[0, tileSize / 2, 5.5]} // margencito derecho
        rotation={[0, 0, 0]}
      >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={
              new Float32Array([-totalWidth / 2, 0, 0, totalWidth / 2, 0, 0])
            }
            itemSize={3}
          />
        </bufferGeometry>
        <lineDashedMaterial
          color={line}
          dashSize={20}
          gapSize={10}
          linewidth={2}
        />
      </line>
    </group>
  );
}

// Old Road tile component
// function Road({ rowIndex }) {
//   const tilesPerRow =
//     GAME_CONSTANTS.maxTileIndex - GAME_CONSTANTS.minTileIndex + 1;
//   const tileSize = GAME_CONSTANTS.tileSize;

//   return (
//     <group position={[0, rowIndex * tileSize, 0]}>
//       {/* Middle section */}
//       <mesh receiveShadow position={[0, 0, 1.5]}>
//         <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
//         <meshLambertMaterial color="#454a59" flatShading />
//       </mesh>

//       {/* Left section */}
//       <mesh position={[-tilesPerRow * tileSize, 0, 1.5]}>
//         <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
//         <meshLambertMaterial color="#393d49" flatShading />
//       </mesh>

//       {/* Right section */}
//       <mesh position={[tilesPerRow * tileSize, 0, 1.5]}>
//         <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
//         <meshLambertMaterial color="#393d49" flatShading />
//       </mesh>
//     </group>
//   );
// }
