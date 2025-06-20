import * as THREE from "three";
import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { createRockMaterial } from "./game.utils";
import { RockyMaterial } from "./game.materials";

export const GameTile = ({ position = [0, 0, 0], size = 50, height = 4 }) => {
  // Use R3F's useLoader for automatic caching
  const stonyTexture = useLoader(THREE.TextureLoader, "/textures/stony.jpg");

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
    // Configure texture properties
    stonyTexture.wrapS = stonyTexture.wrapT = THREE.RepeatWrapping;
    stonyTexture.anisotropy = 4;
    stonyTexture.magFilter = THREE.NearestFilter;
    stonyTexture.minFilter = THREE.NearestFilter;
    stonyTexture.repeat.set(0.03, 0.03);

    RockyMaterial.map = stonyTexture;
    RockyMaterial.needsUpdate = true;

    return RockyMaterial;
  }, [stonyTexture]);

  return (
    <mesh
      position={position}
      geometry={geometry}
      material={material}
      castShadow
    />
  );
};
