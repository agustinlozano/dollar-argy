import * as THREE from "three";
import { useMemo } from "react";

// Create a texture loader and cache for reuse
const textureLoader = new THREE.TextureLoader();
const textureCache = {};

// Function to load texture once and reuse
const loadTexture = (path) => {
  if (!textureCache[path]) {
    textureCache[path] = textureLoader.load(path);
    // Apply optimizations to the texture
    textureCache[path].wrapS = textureCache[path].wrapT = THREE.RepeatWrapping;
    textureCache[path].anisotropy = 4; // Improve texture quality at angles
  }
  return textureCache[path];
};

const createHexagonShape = () => {
  const shape = new THREE.Shape();
  const size = 50;
  const vertices = 10;

  for (let i = 0; i < vertices; i++) {
    const angle = (i * Math.PI * 2) / vertices;
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);

    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y * 1.2);
    }
  }
  shape.closePath();
  return shape;
};

const createFacetedGeometry = (baseShape) => {
  // Use a simple extruded geometry with beveled edges
  const extrudeSettings = {
    steps: 5,
    depth: 10,
    bevelEnabled: true,
    bevelThickness: 1.8,
    bevelSize: 0.8,
    bevelOffset: 0,
    bevelSegments: 3,
  };

  return new THREE.ExtrudeGeometry(baseShape, extrudeSettings);
};

export const HexagonalRockyZone = ({
  position = [0, 0, 5],
  gridSize = [3, 3],
}) => {
  const hexagonShape = useMemo(() => createHexagonShape(), []);
  const geometry = useMemo(
    () => createFacetedGeometry(hexagonShape),
    [hexagonShape]
  );
  const [width, height] = gridSize;

  // Adjust spacing to prevent overlaps
  const hexSize = 20; // Base size of hexagons
  const xSpacing = hexSize * 2.1; // Slightly larger than diameter to prevent overlaps
  const zSpacing = hexSize * 1.82; // Adjusted for the hexagonal grid pattern

  // Create a simple material with texture and emissive properties
  const rockMaterial = useMemo(() => {
    const texture = loadTexture("/textures/stone-floor.jpg");
    texture.repeat.set(0.01, 0.01);

    return new THREE.MeshStandardMaterial({
      color: "#757575",
      roughness: 0.7,
      metalness: 0.1,
      map: texture,
      flatShading: true,
      emissive: "#404040",
      emissiveIntensity: 0.2,
      // Add polygon offset to prevent z-fighting
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      // Ensure proper depth handling
      depthWrite: true,
      depthTest: true,
    });
  }, []);

  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      {Array.from({ length: height }, (_, row) => {
        const isEvenRow = row % 2 === 0;
        return Array.from({ length: width }, (_, col) => {
          const xPos = col * xSpacing + (isEvenRow ? 0 : xSpacing / 2);
          const zPos = row * zSpacing;

          // Instead of random z-offset, use renderOrder based on position
          // This ensures consistent rendering order
          const renderOrder = row * width + col;

          return (
            <mesh
              key={`hex-${row}-${col}`}
              position={[xPos, 0, zPos]}
              rotation={[-Math.PI / 2, 0, 0]}
              geometry={geometry}
              material={rockMaterial}
              castShadow
              receiveShadow
              renderOrder={renderOrder}
            />
          );
        });
      })}
    </group>
  );
};
