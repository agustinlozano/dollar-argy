import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { GAME_CONSTANTS } from "./game";
import * as THREE from "three";

const UNITS_UP = 92;

// Flag Sun component to avoid repetition
const FlagSun = ({ position }) => {
  const sunRayCount = 16;

  const materials = useMemo(
    () => ({
      sunGold: new THREE.MeshStandardMaterial({
        color: "#F6B40E",
        side: THREE.DoubleSide,
        metalness: 0.2,
        roughness: 0.3,
      }),
    }),
    []
  );

  // Create sun rays geometry once using useMemo
  const sunRays = useMemo(() => {
    return [...Array(sunRayCount)].map((_, i) => {
      const angle = (i * Math.PI * 2) / sunRayCount;
      const radius = 5;
      return {
        position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0],
        rotation: [0, 0, angle],
      };
    });
  }, [sunRayCount]);

  return (
    <group position={position}>
      {/* Center sun */}
      <mesh castShadow>
        <circleGeometry args={[4, 32]} />
        <primitive object={materials.sunGold} />
      </mesh>

      {/* Sun rays */}
      {sunRays.map((ray, i) => (
        <mesh
          key={i}
          position={ray.position}
          rotation={ray.rotation}
          castShadow
        >
          <boxGeometry args={[1.5, 0.4, 0.1]} />
          <primitive object={materials.sunGold} />
        </mesh>
      ))}
    </group>
  );
};

export function ArgyFlag() {
  const tileSize = GAME_CONSTANTS.tileSize;
  const flagRef = useRef();

  // Memoize materials for better performance
  const materials = useMemo(
    () => ({
      flagBlue: new THREE.MeshStandardMaterial({
        color: "#75AADB",
        side: THREE.DoubleSide,
        roughness: 0.8,
      }),
      flagWhite: new THREE.MeshStandardMaterial({
        color: "#FFFFFF",
        side: THREE.DoubleSide,
        roughness: 0.7,
      }),
      poleMetal: new THREE.MeshStandardMaterial({
        color: "white",
        metalness: 0.4,
        roughness: 0.8,
      }),
      poleOrnament: new THREE.MeshStandardMaterial({
        color: "#FFD700",
        metalness: 0.6,
        roughness: 0.1,
      }),
    }),
    []
  );

  // Enhanced flag animation with more natural movement
  useFrame((state) => {
    if (flagRef.current) {
      const time = state.clock.getElapsedTime();
      // More complex movement for a realistic flag wave
      flagRef.current.rotation.y = Math.sin(time) * 0.03;
      flagRef.current.rotation.z = Math.sin(time * 1.5) * 0.01;

      // Subtle position adjustment to simulate cloth physics
      flagRef.current.position.z = Math.sin(time * 2) * -0.9 + 20;
    }
  });

  return (
    <group
      position={[tileSize * 2, 0, UNITS_UP]}
      rotation={[-Math.PI / 2, -Math.PI, 0]}
    >
      {/* Flagpole */}
      <group position={[-10, 0, 20]}>
        {/* Base */}
        <mesh position={[0, 80, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[4, 3, 25]} />
          <primitive object={materials.poleMetal} />
        </mesh>

        {/* Pole */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2, 2, 180, 12]} />
          <primitive object={materials.poleMetal} />
        </mesh>

        {/* Ornament or finial */}
        <mesh position={[0, -90, 0]} castShadow receiveShadow>
          <sphereGeometry args={[3, 16, 16]} />
          <primitive object={materials.poleOrnament} />
        </mesh>
      </group>

      {/* Flag with improved physics */}
      <group position={[-70, -25, 20]} ref={flagRef}>
        {/* Top stripe */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[120, 24, 0.4]} />
          <primitive object={materials.flagBlue} />
        </mesh>

        {/* Middle white stripe */}
        <mesh position={[0, -24, 0]} castShadow>
          <boxGeometry args={[120, 24, 0.4]} />
          <primitive object={materials.flagWhite} />
        </mesh>

        {/* Bottom blue stripe */}
        <mesh position={[0, -48, 0]} castShadow>
          <boxGeometry args={[120, 24, 0.4]} />
          <primitive object={materials.flagBlue} />
        </mesh>

        {/* Sol de Mayo - front */}
        <FlagSun position={[0, -24, 0.4]} />

        {/* Sol de Mayo - back */}
        <FlagSun position={[0, -24, -0.9]} />
      </group>
    </group>
  );
}
