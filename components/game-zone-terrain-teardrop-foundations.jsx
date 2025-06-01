import * as THREE from "three";
import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { RockyMaterial } from "./game.materials";

// Create a unique teardrop-shaped base for melancholic atmosphere
export const FoundationsTeardropZone = ({
  position = [0, 0, 5],
  gridSize = [3, 3],
}) => {
  // Use R3F's useLoader for automatic caching
  const stonyTexture = useLoader(THREE.TextureLoader, "/textures/stony.jpg");

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

  const material = useMemo(() => {
    RockyMaterial.map = stonyTexture;
    RockyMaterial.needsUpdate = true;
    return RockyMaterial;
  }, [stonyTexture]);

  // Return the teardrop mesh
  return (
    <group position={position}>
      <mesh
        rotation={[0, 0, 0]}
        geometry={geometry}
        material={material}
        castShadow
      />
    </group>
  );
};
