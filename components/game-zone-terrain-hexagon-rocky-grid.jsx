import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";

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
  const extrudeSettings = {
    steps: 1,
    depth: 10,
    bevelEnabled: true,
    bevelThickness: 1.8,
    bevelSize: 0.8,
    bevelOffset: 0,
    bevelSegments: 2,
  };

  // Create the basic geometry
  const geometry = new THREE.ExtrudeGeometry(baseShape, extrudeSettings);

  // Add irregularity to the top surface
  const positionAttribute = geometry.getAttribute("position");
  const normalAttribute = geometry.getAttribute("normal");

  // Create a simple deterministic noise function
  const simpleNoise = (x, y) => {
    return (
      Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2.0 +
      Math.sin(x * 0.3 + y * 0.2) * 1.5 +
      Math.cos(x * 0.7 + y * 0.4) * 0.5
    );
  };

  // Modify only the top-facing vertices
  for (let i = 0; i < positionAttribute.count; i++) {
    const normal = new THREE.Vector3(
      normalAttribute.getX(i),
      normalAttribute.getY(i),
      normalAttribute.getZ(i)
    );

    // Check if this vertex is on the top face (roughly facing up in z-direction)
    if (normal.z > 0.5) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);

      // Add some height variation
      const noise = simpleNoise(x, y);
      const heightVariation = noise * 1.0; // Scale to control the amount of variation

      positionAttribute.setZ(i, positionAttribute.getZ(i) + heightVariation);
    }
  }

  // Update the geometry
  geometry.computeVertexNormals();
  return geometry;
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
  const hexSpacing = 42 * 1;
  const verticalSpacing = hexSpacing * 0.866;

  const timeRef = useRef(0);

  useFrame((state) => {
    // timeRef.current = state.clock.getElapsedTime();
    // // Update uniforms if needed
    // rockMaterial.userData.shader &&
    //   (rockMaterial.userData.shader.uniforms.time.value = timeRef.current);
  });

  // Create custom shader material for the low-poly look
  const rockMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: "#9c9894",
      roughness: 0.65,
      metalness: 0.05,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    material.onBeforeCompile = (shader) => {
      material.userData.shader = shader;

      // Add custom uniforms and varyings
      shader.uniforms.edgeBrightness = { value: 0.15 };
      shader.uniforms.edgeWidth = { value: 0.02 };

      // Inject vertex shader code
      shader.vertexShader = `
        uniform float edgeBrightness;
        uniform float edgeWidth;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying float vEdgeFactor;
        
        ${shader.vertexShader}
      `;

      // Modify the begin_vertex to store position and normal
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
        #include <begin_vertex>
        vPosition = position;
        vNormal = normal;
        `
      );

      // Calculate the edge factor after projected position is available
      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        `
        #include <project_vertex>
        
        // Calculate the edge factor based on how close this vertex is to an edge
        // We use the dot product of the normal with the view direction to detect edges
        vec3 worldNormal = normalMatrix * normal;
        vec3 viewDir = normalize(-mvPosition.xyz);
        float edge = 1.0 - abs(dot(worldNormal, viewDir));
        vEdgeFactor = smoothstep(0.65, 0.75, edge);
        `
      );

      // Inject fragment shader code
      shader.fragmentShader = `
        uniform float edgeBrightness;
        uniform float edgeWidth;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying float vEdgeFactor;
        
        // Simple noise function for surface detail
        float simpleNoise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        ${shader.fragmentShader}
      `;

      // Modify the main fragment shader code
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        `
        #include <dithering_fragment>
        
        // Add a subtle brightening effect to the edges
        gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * (1.0 + edgeBrightness), vEdgeFactor);
        
        // Add subtle facet differentiation based on normal
        float facetBrightness = dot(vNormal, vec3(0.0, 1.0, 0.0)) * 0.1;
        gl_FragColor.rgb = gl_FragColor.rgb * (1.0 + facetBrightness);
        
        // Add subtle surface texture on top faces - stronger on more upward-facing parts
        float topFaceFactor = max(0.0, vNormal.z);
        float surfaceNoise = mix(0.0, (simpleNoise(vPosition.xy * 0.2) - 0.5) * 0.08, topFaceFactor); 
        gl_FragColor.rgb += vec3(surfaceNoise);
        `
      );
    };

    return material;
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
