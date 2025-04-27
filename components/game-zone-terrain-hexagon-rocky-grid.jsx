import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo } from "react";

const createHexagonShape = () => {
  const shape = new THREE.Shape();
  const size = 21;
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

const createFacetedGeometry = (baseShape) => {
  const extrudeSettings = {
    steps: 1,
    depth: 10,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 1,
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
  const hexSpacing = 42 * 0.9;
  const verticalSpacing = hexSpacing * 0.866;

  // Create custom shader material for the rock effect
  const rockMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#b4b4b4",
      roughness: 0.75,
      metalness: 0.1,
      flatShading: true,
      side: THREE.DoubleSide,
      onBeforeCompile: (shader) => {
        shader.uniforms.time = { value: 0 };
        shader.vertexShader = `
          varying vec3 vPosition;
          ${shader.vertexShader}
        `.replace(
          "#include <begin_vertex>",
          `
          #include <begin_vertex>
          vPosition = position;
          
          // Add subtle vertex displacement for surface detail
          float noise = sin(position.x * 0.5) * cos(position.y * 0.5) * sin(position.z * 0.5) * 0.5;
          transformed += normal * noise;
          `
        );

        shader.fragmentShader = `
          varying vec3 vPosition;
          ${shader.fragmentShader}
        `.replace(
          "#include <dithering_fragment>",
          `
          #include <dithering_fragment>
          
          // Add fracture lines
          float lines = abs(fract(vPosition.x * 0.5 + vPosition.y * 0.5 + vPosition.z * 0.5) - 0.5);
          lines = smoothstep(0.1, 0.2, lines);
          
          gl_FragColor.rgb = mix(gl_FragColor.rgb * 0.8, gl_FragColor.rgb, lines);
          `
        );
      },
    });
  }, []);

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
              geometry={geometry}
              material={rockMaterial}
              castShadow
              receiveShadow
            />
          );
        });
      })}
    </group>
  );
};
