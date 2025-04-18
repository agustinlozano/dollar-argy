import { useRef, useMemo, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { GAME_CONSTANTS } from "./game";
import * as THREE from "three";

const UNITS_UP = 92;

const COLORS = {
  flagBlue: "#75AADB",
  flagWhite: "#FFFFFF",
  poleMetal: "#FFFFFF",
  poleOrnament: "#FFD700",
  sunGold: "#F6B40E",
};

// We calculate the sun rays once
const createSunRays = () => {
  const sunRayCount = 16;
  const radius = 5;

  return Array.from({ length: sunRayCount }, (_, i) => {
    const angle = (i * Math.PI * 2) / sunRayCount;
    return {
      position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0],
      rotation: [0, 0, angle],
    };
  });
};

const MEMOIZED_SUN_RAYS = createSunRays();

// Flag Sun component memoized
const FlagSun = memo(({ position, sunMaterial }) => {
  return (
    <group position={position}>
      {/* Center sun */}
      <mesh castShadow>
        <circleGeometry args={[4, 32]} />
        <meshStandardMaterial {...sunMaterial} />
      </mesh>

      {/* Sun rays */}
      {MEMOIZED_SUN_RAYS.map((ray, i) => (
        <mesh
          key={i}
          position={ray.position}
          rotation={ray.rotation}
          castShadow
        >
          <boxGeometry args={[1.5, 0.4, 0.1]} />
          <meshStandardMaterial {...sunMaterial} />
        </mesh>
      ))}
    </group>
  );
});

FlagSun.displayName = "FlagSun";

// FlagStripes component memoized for static parts
const FlagStripes = memo(({ position, materials }) => (
  <group position={position}>
    {/* Top stripe */}
    <mesh position={[0, 0, 0]} castShadow>
      <boxGeometry args={[120, 24, 0.4]} />
      <meshStandardMaterial {...materials.flagBlue} />
    </mesh>

    {/* Middle white stripe */}
    <mesh position={[0, -24, 0]} castShadow>
      <boxGeometry args={[120, 24, 0.4]} />
      <meshStandardMaterial {...materials.flagWhite} />
    </mesh>

    {/* Bottom blue stripe */}
    <mesh position={[0, -48, 0]} castShadow>
      <boxGeometry args={[120, 24, 0.4]} />
      <meshStandardMaterial {...materials.flagBlue} />
    </mesh>

    {/* Sol de Mayo - front */}
    <FlagSun position={[0, -24, 0.4]} sunMaterial={materials.sun} />
    {/* Sol de Mayo - back */}
    <FlagSun position={[0, -24, -0.4]} sunMaterial={materials.sun} />
  </group>
));

FlagStripes.displayName = "FlagStripes";

// FlagPole component memoized
const FlagPole = memo(({ materials }) => (
  <group position={[-10, 0, 20]}>
    {/* Base */}
    <mesh position={[0, 80, 0]} castShadow>
      <cylinderGeometry args={[4, 3, 25]} />
      <meshStandardMaterial {...materials.pole} />
    </mesh>

    {/* Pole */}
    <mesh position={[0, 0, 0]} castShadow>
      <cylinderGeometry args={[2, 2, 180, 12]} />
      <meshStandardMaterial {...materials.pole} />
    </mesh>

    {/* Ornament or finial */}
    <mesh position={[0, -90, 0]} castShadow>
      <sphereGeometry args={[3, 16, 16]} />
      <meshStandardMaterial {...materials.ornament} />
    </mesh>
  </group>
));

FlagPole.displayName = "FlagPole";

export function ArgyFlag() {
  const flagRef = useRef();

  // We memoize the materials (data) within the component
  // [TODO]: Try to found out why materials cannot be
  // memoized here, but it does in @game-constants.jsx
  const materials = useMemo(
    () => ({
      sun: {
        color: COLORS.sunGold,
        side: THREE.DoubleSide,
        metalness: 0.2,
        roughness: 0.3,
      },
      pole: {
        color: COLORS.poleMetal,
        metalness: 0.4,
        roughness: 0.8,
      },
      ornament: {
        color: COLORS.poleOrnament,
        metalness: 0.4,
        roughness: 0.1,
      },
      flagBlue: {
        color: COLORS.flagBlue,
        side: THREE.DoubleSide,
        roughness: 0.8,
      },
      flagWhite: {
        color: COLORS.flagWhite,
        side: THREE.DoubleSide,
        roughness: 0.7,
      },
    }),
    []
  );

  const initialPosition = useMemo(
    () => [GAME_CONSTANTS.tileSize * 2, 0, UNITS_UP],
    []
  );

  useFrame((state) => {
    if (flagRef.current) {
      const time = state.clock.getElapsedTime();
      // Waving motion
      flagRef.current.rotation.y = Math.sin(time) * 0.03;
      flagRef.current.rotation.z = Math.sin(time * 1.5) * 0.01;
      // Subtle position adjustment to simulate cloth physics
      flagRef.current.position.z = Math.sin(time * 2) * -0.9 + 20;
    }
  });

  return (
    <group position={initialPosition} rotation={[-Math.PI / 2, -Math.PI, 0]}>
      <FlagPole materials={materials} />
      <group position={[-70, -25, 20]} ref={flagRef}>
        <FlagStripes position={[0, 0, 0]} materials={materials} />
      </group>
    </group>
  );
}
