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
    // Make texture more pixel-art like
    textureCache[path].magFilter = THREE.NearestFilter;
    textureCache[path].minFilter = THREE.NearestFilter;
  }
  return textureCache[path];
};

export const GameTile = ({
  position = [0, 0, 0],
  size = 50,
  height = 4,
  isSelected = false,
  isHovered = false,
}) => {
  // Create tile geometry with beveled edges for a gothic look
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();

    // Create a slightly beveled square shape
    const bevel = size * 0.05; // 5% of size for bevel
    shape.moveTo(bevel, 0);
    shape.lineTo(size - bevel, 0);
    shape.lineTo(size, bevel);
    shape.lineTo(size, size - bevel);
    shape.lineTo(size - bevel, size);
    shape.lineTo(bevel, size);
    shape.lineTo(0, size - bevel);
    shape.lineTo(0, bevel);
    shape.closePath();

    const extrudeSettings = {
      steps: 1,
      depth: height,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 2,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [size, height]);

  // Material with stone texture and pixel-art optimization
  const material = useMemo(() => {
    const texture = loadTexture("/textures/stony.jpg");
    // Make texture repeat more for pixel-art feel
    texture.repeat.set(0.03, 0.03);

    return new THREE.MeshStandardMaterial({
      color: isHovered ? "#686868" : "#575757",
      roughness: 0.9,
      metalness: 0.1,
      map: texture,
      flatShading: true,
      // Add slight emissive for selected state
      emissive: isSelected ? "#404040" : "#000000",
      emissiveIntensity: 0.2,
    });
  }, [isHovered, isSelected]);

  return (
    <mesh
      position={position}
      geometry={geometry}
      material={material}
      castShadow
      receiveShadow
    />
  );
};
