import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
// import { Instance, Instances } from "@react-three/drei";
import * as THREE from "three";

// Reusable geometries with reduced polygon counts for better performance
const HANDLE_GEO = new THREE.CylinderGeometry(1, 1, 10, 6);
const WRAP_GEO = new THREE.CylinderGeometry(1.5, 1, 2, 6);
const EMBER_GEO = new THREE.SphereGeometry(2, 6, 6);
const FLAME_GEO = new THREE.ConeGeometry(3, 8, 6);
// const SMOKE_GEO = new THREE.SphereGeometry(1, 4, 4);

export function GameObjTorch({
  initialPosition = [10, 0, 100],
  initialRotation = [0, 0, 0],
}) {
  const groupRef = useRef();
  const flameRef = useRef();
  const frameSkip = useRef(0);

  // Create materials only once with useMemo
  const materials = useMemo(() => {
    return {
      handle: new THREE.MeshStandardMaterial({
        color: "#8B4513",
      }),
      wrap: new THREE.MeshStandardMaterial({
        color: "#D2B48C",
      }),
      ember: new THREE.MeshBasicMaterial({
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
    };
  }, []);

  // Animate the flame - optimized to skip frames and reduce calculations
  useFrame((state) => {
    if (!flameRef.current) return;

    // Skip frames for better performance (only animate every 5 frames)
    frameSkip.current += 1;
    if (frameSkip.current < 5) return;
    frameSkip.current = 0;

    // Simpler animation with fewer calculations
    const time = state.clock.elapsedTime;
    flameRef.current.rotation.y = Math.sin(time) * 0.1;
    flameRef.current.scale.y = 1 + Math.sin(time * 2) * 0.1;
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

      {/* Animated flame - simplified with fewer meshes */}
      <group ref={flameRef} position={[0, 13, 0]}>
        <mesh
          position={[0, 1, 0]}
          geometry={FLAME_GEO}
          material={materials.flame}
        />
      </group>

      {/* Smoke particles using instanced meshes for better performance */}
      {/* <group position={[0, 20, 0]}>
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
      </group> */}
    </group>
  );
}
