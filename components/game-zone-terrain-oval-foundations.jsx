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

// Create an oval-shaped base
export const FoundationsOvalZone = ({
  position = [0, 0, 5],
  gridSize = [3, 3],
}) => {
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
    const texture = loadTexture("/textures/stony.jpg");
    texture.repeat.set(0.008, 0.008);

    return new THREE.MeshStandardMaterial({
      color: "#6B7280", // Elegant gray tone
      roughness: 0.7, // Smoother than rocky terrain
      metalness: 0.2,
      map: texture,
      flatShading: false, // Smooth shading for elegant appearance
      emissive: "#404040",
      emissiveIntensity: 0.25,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      depthWrite: true,
      depthTest: true,
    });
  }, []);

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
