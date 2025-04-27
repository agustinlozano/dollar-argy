import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Instance, Instances } from "@react-three/drei";
import * as THREE from "three";

// Reusable geometries and materials defined outside the component
const HANDLE_GEO = new THREE.CylinderGeometry(1, 1, 10, 8);
const WRAP_GEO = new THREE.CylinderGeometry(1.5, 1, 2, 8);
const EMBER_GEO = new THREE.SphereGeometry(2, 8, 8);
const FLAME_GEO = new THREE.ConeGeometry(3, 8, 8);
const SMOKE_GEO = new THREE.SphereGeometry(1, 4, 4);

export function GameObjTorch({
  initialPosition = [10, 0, 100],
  initialRotation = [0, 0, 0],
}) {
  const groupRef = useRef();
  const flameRef = useRef();

  // Create materials only once with useMemo
  const materials = useMemo(() => {
    return {
      handle: new THREE.MeshStandardMaterial({
        color: "#8B4513",
        roughness: 0.8,
        metalness: 0.2,
      }),
      wrap: new THREE.MeshStandardMaterial({
        color: "#D2B48C",
        roughness: 1,
        metalness: 0,
      }),
      ember: new THREE.MeshStandardMaterial({
        color: "#FF4500",
        emissive: "#FF4500",
        emissiveIntensity: 0.5,
        roughness: 0.7,
        metalness: 0.3,
      }),
      flame: new THREE.MeshStandardMaterial({
        color: "#FFA500",
        emissive: "#FFA500",
        emissiveIntensity: 1,
        transparent: true,
        opacity: 0.9,
      }),
      innerFlame: new THREE.MeshStandardMaterial({
        color: "#FFFF00",
        emissive: "#FFFF00",
        emissiveIntensity: 1,
        transparent: true,
        opacity: 0.7,
      }),
      smoke: new THREE.MeshStandardMaterial({
        color: "#444444",
        transparent: true,
        opacity: 0.2,
      }),
    };
  }, []);

  // Smoke positions calculated once
  const smokePositions = useMemo(() => {
    return Array(3)
      .fill()
      .map((_, i) => ({
        position: [Math.sin(i * 2) * 2, i * 2, Math.cos(i * 2) * 2],
        scale: [0.5 + i * 0.3, 0.5 + i * 0.3, 0.5 + i * 0.3],
        opacity: 0.2 - i * 0.05,
      }));
  }, []);

  // Animate the flame - optimized to avoid unnecessary calculations
  useFrame((state) => {
    if (flameRef.current) {
      // Use elapsedTime directly to avoid per-frame calculations
      const time = state.clock.elapsedTime;
      flameRef.current.rotation.y = Math.sin(time * 2) * 0.1;
      flameRef.current.rotation.z = Math.cos(time * 3) * 0.1;
      flameRef.current.scale.y = 1 + Math.sin(time * 4) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={initialPosition} rotation={initialRotation}>
      {/* Static parts of the torch */}
      <mesh
        position={[0, 2, 0]}
        geometry={HANDLE_GEO}
        material={materials.handle}
      />
      <mesh
        position={[0, 8, 0]}
        geometry={WRAP_GEO}
        material={materials.wrap}
      />
      <mesh
        position={[0, 10, 0]}
        geometry={EMBER_GEO}
        material={materials.ember}
      />

      {/* Animated flame */}
      <group ref={flameRef} position={[0, 13, 0]}>
        <mesh
          position={[0, 1, 0]}
          geometry={FLAME_GEO}
          material={materials.flame}
        />
        <mesh
          position={[0, -1, 0]}
          scale={[0.8, 0.8, 0.8]}
          geometry={FLAME_GEO}
          material={materials.innerFlame}
        />
      </group>

      {/* Smoke particles using instanced meshes for better performance */}
      <group position={[0, 20, 0]}>
        <Instances limit={3} geometry={SMOKE_GEO} material={materials.smoke}>
          {smokePositions.map((props, i) => (
            <Instance
              key={i}
              position={props.position}
              scale={props.scale}
              color="#444444"
              opacity={props.opacity}
            />
          ))}
        </Instances>
      </group>
    </group>
  );
}
