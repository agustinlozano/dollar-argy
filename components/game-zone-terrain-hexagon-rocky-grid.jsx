import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";

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

  const timeRef = useRef(0);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    // Update uniforms if needed
    rockMaterial.userData.shader &&
      (rockMaterial.userData.shader.uniforms.time.value = timeRef.current);
  });

  // Create custom shader material inspired by the reference shader
  const rockMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      color: "#9c9894",
      roughness: 0.85,
      metalness: 0.1,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    material.onBeforeCompile = (shader) => {
      material.userData.shader = shader;

      // Add custom uniforms
      shader.uniforms.time = { value: 0 };

      // Common noise functions - we'll add this to both shaders
      const noiseFunctions = `
        uniform float time;
        
        // Noise functions
        float hash(vec3 p) {
          p = fract(p * vec3(443.897, 441.423, 437.195));
          p += dot(p, p + 19.19);
          return fract(p.x * p.y * p.z);
        }
        
        // Simplex-style 3D noise
        float noise3D(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f*f*(3.0-2.0*f); // Smoothstep
          
          float n = mix(
              mix(
                  mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
                  mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x),
                  f.y
              ),
              mix(
                  mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
                  mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x),
                  f.y
              ),
              f.z
          );
          
          return n;
        }
        
        // FBM (Fractal Brownian Motion)
        float fbm(vec3 p) {
          float result = 0.0;
          float amplitude = 0.5;
          float frequency = 1.0;
          
          for(int i = 0; i < 4; i++) {
            result += amplitude * noise3D(p * frequency);
            amplitude *= 0.5;
            frequency *= 2.0;
          }
          
          return result;
        }
      `;

      // Inject vertex shader code
      shader.vertexShader = `
        ${noiseFunctions}
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        ${shader.vertexShader}
      `;

      // Modify the main vertex shader code to add displacement
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
        #include <begin_vertex>
        vPosition = position;
        vNormal = normal;
        
        // Create natural looking bumps and displacements
        float displacement = fbm(position * 0.2 + time * 0.02) * 2.0;
        // Apply more dramatic displacement at the edges
        float edgeEffect = 1.0 - min(1.0, 3.0 * abs(dot(normalize(position), normal)));
        displacement = mix(displacement * 0.3, displacement, edgeEffect);
        
        // Apply the displacement
        transformed += normal * displacement;
        `
      );

      // Inject fragment shader code
      shader.fragmentShader = `
        ${noiseFunctions}
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        // Stone color functions inspired by the reference shader
        vec3 stoneColor(vec3 p, vec3 normal, float noise) {
          // Base stone colors
          vec3 baseColor = vec3(0.42, 0.35, 0.3);
          vec3 secondaryColor = vec3(0.51, 0.41, 0.32);
          vec3 accentColor = vec3(0.25, 0.22, 0.18);
          
          // Blend between base colors based on position and noise
          float blend = smoothstep(0.4, 0.6, noise);
          vec3 stoneColor = mix(baseColor, secondaryColor, blend);
          
          // Add subtle variations
          float grain = fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
          stoneColor = mix(stoneColor, accentColor, grain * 0.1);
          
          // Adjust based on normal direction for more definition
          float normalFactor = abs(dot(normal, vec3(0.0, 1.0, 0.0)));
          stoneColor = mix(stoneColor * 0.9, stoneColor * 1.1, normalFactor);
          
          return stoneColor;
        }
        
        ${shader.fragmentShader}
      `;

      // Modify the main fragment shader code to apply the stone texture
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        `
        #include <dithering_fragment>
        
        // Calculate noise based on position
        float noise = smoothstep(0.0, 1.0, fbm(vPosition * 0.5 + time * 0.01));
        
        // Calculate fracture pattern
        float edge = fbm(vPosition * 2.0) * 2.0 - 1.0;
        edge = smoothstep(0.1, 0.2, abs(edge));
        
        // Apply stone coloring
        vec3 stoneCol = stoneColor(vPosition, vNormal, noise);
        
        // Apply fractures
        gl_FragColor.rgb = mix(stoneCol, stoneCol * 0.6, edge * 0.5);
        
        // Add subtle ambient occlusion in crevices
        float ao = smoothstep(0.0, 0.5, fbm(vPosition * 4.0));
        gl_FragColor.rgb *= mix(0.8, 1.0, ao);
        
        // Add subtle specular highlights on higher areas
        float spec = pow(max(0.0, dot(vNormal, vec3(0.0, 1.0, 0.0))), 4.0) * 0.2;
        gl_FragColor.rgb += vec3(spec);
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
