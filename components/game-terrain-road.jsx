import { useRef, useMemo, memo } from "react";
import * as THREE from "three";

const GAME_CONSTANTS = {
  minTileIndex: -8,
  maxTileIndex: 8,
  tileSize: 42,
};

// Define road colors outside component to prevent recreations
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

// Create shared geometries outside component
const tilesPerRow =
  GAME_CONSTANTS.maxTileIndex - GAME_CONSTANTS.minTileIndex + 1;
const tileSize = GAME_CONSTANTS.tileSize;
const totalWidth = tilesPerRow * tileSize;

const MIDDLE_GEOMETRY = new THREE.BoxGeometry(totalWidth, tileSize, 5);
const SIDE_GEOMETRY = new THREE.BoxGeometry(totalWidth, tileSize, 3);

// Create and prepare line geometry for dashed lines
const LINE_POINTS = new Float32Array([
  -totalWidth / 2,
  0,
  0,
  totalWidth / 2,
  0,
  0,
]);
const LINE_GEOMETRY = new THREE.BufferGeometry();
LINE_GEOMETRY.setAttribute(
  "position",
  new THREE.BufferAttribute(LINE_POINTS, 3)
);

// Pre-compute line distances
const positions = LINE_GEOMETRY.attributes.position.array;
const lineDistances = new Float32Array(2);
let currentDistance = 0;

for (let i = 0; i < positions.length - 3; i += 3) {
  const x1 = positions[i];
  const y1 = positions[i + 1];
  const z1 = positions[i + 2];
  const x2 = positions[i + 3];
  const y2 = positions[i + 4];
  const z2 = positions[i + 5];

  currentDistance += Math.sqrt(
    (x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2
  );
  lineDistances[i / 3 + 1] = currentDistance;
}

LINE_GEOMETRY.setAttribute(
  "lineDistance",
  new THREE.BufferAttribute(lineDistances, 1)
);

export function Road({ rowIndex, variant = "default" }) {
  const lineRef = useRef();

  // Create materials using useMemo to prevent recreations
  const materials = useMemo(() => {
    const { middle, sides } = roadColors[variant];
    return {
      middle: new THREE.MeshLambertMaterial({
        color: middle,
        flatShading: true,
      }),
      sides: new THREE.MeshLambertMaterial({
        color: sides,
        flatShading: true,
      }),
      line: new THREE.LineDashedMaterial({
        color: "white",
        dashSize: 20,
        gapSize: 10,
        scale: 1,
        linewidth: 2,
      }),
    };
  }, [variant]);

  // Compute line distances only once after ref is set
  useMemo(() => {
    if (lineRef.current) {
      lineRef.current.computeLineDistances();
    }
  }, []);

  return (
    <group position={[0, rowIndex * tileSize, 0]}>
      {/* Middle section */}
      <mesh
        receiveShadow
        position={[0, 0, 1.5]}
        geometry={MIDDLE_GEOMETRY}
        material={materials.middle}
      />

      {/* Left section */}
      <mesh
        position={[-totalWidth, 0, 1.5]}
        geometry={SIDE_GEOMETRY}
        material={materials.sides}
      />

      {/* Right section */}
      <mesh
        position={[totalWidth, 0, 1.5]}
        geometry={SIDE_GEOMETRY}
        material={materials.sides}
      />

      {/* Dashed line along right margin of middle section */}
      <line
        ref={lineRef}
        position={[0, tileSize / 2, 5.5]}
        geometry={LINE_GEOMETRY}
        material={materials.line}
      />
    </group>
  );
}

// Memoize the Road component to prevent unnecessary re-renders
export default memo(Road);
