import * as THREE from "three";
import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { RockyBrighterMaterial } from "./game.materials";

// Create an oval-shaped base
export const FoundationsOvalZone = ({
  position = [0, 0, 5],
  gridSize = [3, 3],
}) => {
  // Use R3F's useLoader for automatic caching
  const stonyTexture = useLoader(THREE.TextureLoader, "/textures/stony.jpg");

  // Create an oval shape
  const baseShape = useMemo(() => {
    const shape = new THREE.Shape();

    // Base size of the platform
    const [width, height] = gridSize;
    const hexSize = 50;
    const totalWidth = width * hexSize * 2.1;
    const totalHeight = height * hexSize * 1.82;

    // Central point
    const centerX = totalWidth / 2;
    const centerY = totalHeight / 2;

    // Oval dimensions
    const radiusX = totalWidth / 2.2; // Horizontal radius
    const radiusY = totalHeight / 2.8; // Vertical radius (smaller for oval effect)

    // Create oval shape using ellipse
    shape.ellipse(centerX, centerY, radiusX, radiusY, 0, Math.PI * 2, false, 0);

    return shape;
  }, [gridSize]);

  // Create extruded geometry with smooth bevel for elegant oval appearance
  const geometry = useMemo(() => {
    const extrudeSettings = {
      steps: 3,
      depth: 12, // Slightly deeper for more presence
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: 3,
      bevelOffset: 0.8, // Smooth offset for refined appearance
      bevelSegments: 5, // More segments for smoother curves
    };

    return new THREE.ExtrudeGeometry(baseShape, extrudeSettings);
  }, [baseShape]);

  // Material with marble-like texture for elegant appearance
  const ovalMaterial = useMemo(() => {
    RockyBrighterMaterial.map = stonyTexture;
    RockyBrighterMaterial.needsUpdate = true;
    return RockyBrighterMaterial;
  }, [stonyTexture]);

  // Return the oval mesh
  return (
    <group position={position}>
      <mesh
        rotation={[0, 0, 0]}
        geometry={geometry}
        material={ovalMaterial}
        castShadow
        receiveShadow
      />
    </group>
  );
};
