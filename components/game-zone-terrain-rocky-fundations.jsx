import * as THREE from "three";
import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { RockyMaterial } from "./game.materials";

// Create a unique base with a gothic shape
export const FoundationsRockyZone = ({
  position = [0, 0, 5],
  gridSize = [3, 3],
}) => {
  // Use R3F's useLoader for automatic caching
  const stonyTexture = useLoader(THREE.TextureLoader, "/textures/stony.jpg");

  // Create a symmetrical gothic shape
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

    // Base radius (approximately half of the total width)
    const baseRadius = Math.min(totalWidth, totalHeight) / 2;

    // Create gothic shape with points and arches
    const points = 8; // Number of points (even for symmetry)
    const innerRadius = baseRadius * 0.85; // Inner radius for the arches

    // First point
    let startX = centerX + baseRadius * Math.cos(0);
    let startY = centerY + baseRadius * Math.sin(0);
    shape.moveTo(startX, startY);

    // Create the gothic points and arches
    for (let i = 0; i < points; i++) {
      // Current and next angle
      const angle = (i / points) * Math.PI * 2;
      const nextAngle = ((i + 1) / points) * Math.PI * 2;

      // Current and next point coordinates
      // const x1 = centerX + baseRadius * Math.cos(angle);
      // const y1 = centerY + baseRadius * Math.sin(angle);
      const x2 = centerX + baseRadius * Math.cos(nextAngle);
      const y2 = centerY + baseRadius * Math.sin(nextAngle);

      // Midpoint for the gothic arch
      const midAngle = (angle + nextAngle) / 2;
      // const archDepth = 0.3; // Depth of the gothic arch

      // Inner point of the arch
      const archX = centerX + innerRadius * Math.cos(midAngle);
      const archY = centerY + innerRadius * Math.sin(midAngle);

      // Add control curve for the gothic arch
      // First draw from the current point to the inner arch point
      shape.lineTo(archX, archY);
      // Then from the inner arch point to the next outer point
      shape.lineTo(x2, y2);
    }

    shape.closePath();
    return shape;
  }, [gridSize]);

  // Create extruded geometry with pronounced bevel to accentuate the gothic style
  const geometry = useMemo(() => {
    const extrudeSettings = {
      steps: 2,
      depth: 10, // Un poco más profundo para más presencia
      bevelEnabled: true,
      bevelThickness: 2.5,
      bevelSize: 2.5,
      bevelOffset: 0.5, // Offset para crear sensación de piedra tallada
      bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(baseShape, extrudeSettings);
  }, [baseShape]);

  // Material with stone texture with a darker and older appearance
  const rockMaterial = useMemo(() => {
    RockyMaterial.map = stonyTexture;
    RockyMaterial.needsUpdate = true;
    return RockyMaterial;
  }, [stonyTexture]);

  // Return a unique mesh with the combined geometry
  return (
    <group position={position}>
      <mesh
        rotation={[0, 0, 0]}
        geometry={geometry}
        material={rockMaterial}
        castShadow
      />
    </group>
  );
};
