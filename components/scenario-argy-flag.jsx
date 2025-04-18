import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { GAME_CONSTANTS } from "./game";
import * as THREE from "three";

const UNITS_UP = 92;

// Creamos colores utilizando THREE.Color en lugar de strings
const COLORS = {
  flagBlue: new THREE.Color("#75AADB"),
  flagWhite: new THREE.Color("#FFFFFF"),
  poleMetal: new THREE.Color("#FFFFFF"),
  poleOrnament: new THREE.Color("#FFD700"),
  sunGold: new THREE.Color("#F6B40E"),
};

// Flag Sun component usando props de colores directamente
const FlagSun = ({ position }) => {
  const sunRayCount = 16;
  const sunRays = [];

  // Crear rays de forma imperativa
  for (let i = 0; i < sunRayCount; i++) {
    const angle = (i * Math.PI * 2) / sunRayCount;
    const radius = 5;
    sunRays.push({
      position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0],
      rotation: [0, 0, angle],
    });
  }

  return (
    <group position={position}>
      {/* Center sun */}
      <mesh castShadow>
        <circleGeometry args={[4, 32]} />
        <meshStandardMaterial
          color={COLORS.sunGold}
          side={THREE.DoubleSide}
          metalness={0.2}
          roughness={0.3}
        />
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
          <meshStandardMaterial
            color={COLORS.sunGold}
            side={THREE.DoubleSide}
            metalness={0.2}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

export function ArgyFlag() {
  const tileSize = GAME_CONSTANTS.tileSize;
  const flagRef = useRef();

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
        <mesh position={[0, 80, 0]} castShadow>
          <cylinderGeometry args={[4, 3, 25]} />
          <meshStandardMaterial
            color={COLORS.poleMetal}
            metalness={0.4}
            roughness={0.8}
          />
        </mesh>

        {/* Pole */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[2, 2, 180, 12]} />
          <meshStandardMaterial
            color={COLORS.poleMetal}
            metalness={0.4}
            roughness={0.8}
          />
        </mesh>

        {/* Ornament or finial */}
        <mesh position={[0, -90, 0]} castShadow>
          <sphereGeometry args={[3, 16, 16]} />
          <meshStandardMaterial
            color={COLORS.poleOrnament}
            metalness={0.4}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Flag with improved physics */}
      <group position={[-70, -25, 20]} ref={flagRef}>
        {/* Top stripe */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[120, 24, 0.4]} />
          <meshStandardMaterial
            color={COLORS.flagBlue}
            side={THREE.DoubleSide}
            roughness={0.8}
          />
        </mesh>

        {/* Middle white stripe */}
        <mesh position={[0, -24, 0]} castShadow>
          <boxGeometry args={[120, 24, 0.4]} />
          <meshStandardMaterial
            color={COLORS.flagWhite}
            side={THREE.DoubleSide}
            roughness={0.7}
          />
        </mesh>

        {/* Bottom blue stripe */}
        <mesh position={[0, -48, 0]} castShadow>
          <boxGeometry args={[120, 24, 0.4]} />
          <meshStandardMaterial
            color={COLORS.flagBlue}
            side={THREE.DoubleSide}
            roughness={0.8}
          />
        </mesh>

        {/* Sol de Mayo - front */}
        <FlagSun position={[0, -24, 0.4]} />

        {/* Sol de Mayo - back */}
        <FlagSun position={[0, -24, -0.4]} />
      </group>
    </group>
  );
}
