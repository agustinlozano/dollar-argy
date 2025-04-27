import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const createHexagonShape = () => {
  const shape = new THREE.Shape();
  const size = 21; // Half of your tile size (42/2)
  const vertices = 6;

  for (let i = 0; i < vertices; i++) {
    const angle = (i * Math.PI * 2) / vertices;
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);

    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();
  return shape;
};

export const HexagonalRockyZone = ({
  position = [0, 0, 5],
  gridSize = [3, 3],
}) => {
  const hexagonShape = createHexagonShape();
  const [width, height] = gridSize;
  const hexSpacing = 42 * 0.9; // Slightly less than your tile size for tight packing
  const verticalSpacing = hexSpacing * 0.866; // cos(30°) for proper hexagon spacing

  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      {Array.from({ length: height }, (_, row) => {
        const isEvenRow = row % 2 === 0;
        return Array.from({ length: width }, (_, col) => {
          const xPos = col * hexSpacing + (isEvenRow ? 0 : hexSpacing / 2);
          const zPos = row * verticalSpacing;

          return (
            <mesh
              key={`hex-${row}-${col}`}
              position={[xPos, 0, zPos]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <shapeGeometry args={[hexagonShape]} />
              <meshStandardMaterial
                color="#696969"
                roughness={0.8}
                metalness={0.2}
                side={THREE.DoubleSide}
              >
                <textureLoader url="/textures/rock_texture.jpg" />
              </meshStandardMaterial>
            </mesh>
          );
        });
      })}
    </group>
  );
};
