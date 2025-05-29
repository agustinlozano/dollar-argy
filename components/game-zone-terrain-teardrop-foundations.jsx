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

// Create a unique teardrop-shaped base for melancholic atmosphere
export const FoundationsTeardropZone = ({
  position = [0, 0, 5],
  gridSize = [3, 3],
}) => {
  // Create a teardrop shape
  const baseShape = useMemo(() => {
    const shape = new THREE.Shape();

    // Base size of the platform
    const [width, height] = gridSize;
    const hexSize = 50;
    const totalWidth = width * hexSize * 2.1;
    const totalHeight = height * hexSize * 1.82;

    // Central point (offset slightly for teardrop effect)
    const centerX = totalWidth / 2;
    const centerY = totalHeight / 2.5; // Offset for teardrop shape

    // Teardrop dimensions
    const radiusX = totalWidth / 2.5; // Horizontal radius
    const radiusY = totalHeight / 3; // Vertical radius for the round part

    // Start from the bottom point of the teardrop
    const bottomX = centerX;
    const bottomY = centerY - radiusY * 1.8; // Extended bottom point
    shape.moveTo(bottomX, bottomY);

    // Create the teardrop shape using curves
    // Left side of the teardrop (curved)
    shape.quadraticCurveTo(
      centerX - radiusX * 1.2, // Control point X (wider)
      centerY - radiusY * 0.3, // Control point Y
      centerX - radiusX * 0.8, // End point X
      centerY + radiusY * 0.5 // End point Y
    );

    // Top left curve
    shape.quadraticCurveTo(
      centerX - radiusX * 0.3, // Control point X
      centerY + radiusY * 1.2, // Control point Y (higher)
      centerX, // End point X (center top)
      centerY + radiusY * 1.1 // End point Y
    );

    // Top right curve
    shape.quadraticCurveTo(
      centerX + radiusX * 0.3, // Control point X
      centerY + radiusY * 1.2, // Control point Y (higher)
      centerX + radiusX * 0.8, // End point X
      centerY + radiusY * 0.5 // End point Y
    );

    // Right side of the teardrop (curved back to bottom)
    shape.quadraticCurveTo(
      centerX + radiusX * 1.2, // Control point X (wider)
      centerY - radiusY * 0.3, // Control point Y
      bottomX, // End point X (back to bottom)
      bottomY // End point Y
    );

    shape.closePath();
    return shape;
  }, [gridSize]);

  // Create extruded geometry with soft, flowing bevel for emotional appearance
  const geometry = useMemo(() => {
    const extrudeSettings = {
      steps: 4, // More steps for smoother curves
      depth: 8, // Slightly less deep for delicate appearance
      bevelEnabled: true,
      bevelThickness: 4,
      bevelSize: 4,
      bevelOffset: 1.2, // Larger offset for softer edges
      bevelSegments: 8, // Many segments for very smooth curves
    };

    return new THREE.ExtrudeGeometry(baseShape, extrudeSettings);
  }, [baseShape]);

  // Material with melancholic blue-gray tones
  const teardropMaterial = useMemo(() => {
    const texture = loadTexture("/textures/stony.jpg");
    texture.repeat.set(0.006, 0.006); // Finer texture repeat

    return new THREE.MeshStandardMaterial({
      color: "#4A5568", // Melancholic blue-gray
      roughness: 0.6, // Moderate roughness for soft appearance
      metalness: 0.1, // Low metalness for stone-like feel
      map: texture,
      flatShading: false, // Smooth shading for flowing appearance
      emissive: "#2D3748", // Subtle dark blue emissive
      emissiveIntensity: 0.15,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      depthWrite: true,
      depthTest: true,
    });
  }, []);

  // Return the teardrop mesh
  return (
    <group position={position}>
      <mesh
        rotation={[0, 0, 0]}
        geometry={geometry}
        material={teardropMaterial}
        castShadow
        receiveShadow
      />
    </group>
  );
};
