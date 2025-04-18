import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GAME_CONSTANTS } from "./game";

const UNITS_UP = 92;

export function ArgyFlag() {
  const tileSize = GAME_CONSTANTS.tileSize;
  const flagRef = useRef();
  // Animación suave de la bandera
  useFrame((state) => {
    if (flagRef.current) {
      // Efecto de ondeo suave
      const time = state.clock.getElapsedTime();
      flagRef.current.rotation.y = Math.sin(time) * 0.1;
    }
  });

  return (
    <group
      position={[tileSize * 2, 0, UNITS_UP]}
      rotation={[-Math.PI / 2, -Math.PI, 0]}
    >
      {/* flagpole */}
      <group position={[-10, 0, 20]}>
        {/* Base */}
        <mesh position={[0, 80, 0]} castShadow>
          <cylinderGeometry args={[4, 3, 25]} />
          <meshStandardMaterial color="white" metalness={0.2} roughness={0.9} />
        </mesh>

        {/* Pole */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[2, 2, 180, 8]} />
          <meshStandardMaterial color="white" metalness={0.4} roughness={0.9} />
        </mesh>

        {/* Ornament or finial */}
        <mesh position={[0, -90, 0]} castShadow>
          <sphereGeometry args={[3, 16, 16]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* flag */}
      <group position={[-70, -25, 20]}>
        {/* Top stripe */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[120, 24, 0.4]} />
          <meshStandardMaterial color="#75AADB" side={THREE.DoubleSide} />
        </mesh>

        {/* Middle white stripe */}
        <mesh position={[0, -24, 0]} castShadow>
          <boxGeometry args={[120, 24, 0.4]} />
          <meshStandardMaterial color="#FFFFFF" side={THREE.DoubleSide} />
        </mesh>

        {/* Bottom blue stripe */}
        <mesh position={[0, -48, 0]} castShadow>
          <boxGeometry args={[120, 24, 0.4]} />
          <meshStandardMaterial color="#75AADB" side={THREE.DoubleSide} />
        </mesh>

        {/* Sol de Mayo */}
        <group position={[0, -24, 0.4]}>
          {/* Center sun */}
          <mesh castShadow>
            <circleGeometry args={[4, 32]} />
            <meshStandardMaterial color="#F6B40E" side={THREE.DoubleSide} />
          </mesh>

          {/* Sun rays */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 16;
            const radius = 5;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius,
                  0,
                ]}
                rotation={[0, 0, angle]}
                castShadow
              >
                <boxGeometry args={[1.5, 0.4, 0.1]} />
                <meshStandardMaterial color="#F6B40E" side={THREE.DoubleSide} />
              </mesh>
            );
          })}
        </group>

        <group position={[0, -24, -0.9]}>
          {/* Centro del sol */}
          <mesh castShadow>
            <circleGeometry args={[4, 32]} />
            <meshStandardMaterial color="#F6B40E" side={THREE.DoubleSide} />
          </mesh>

          {/* Rayos del sol */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 16;
            const radius = 5;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius,
                  0,
                ]}
                rotation={[0, 0, angle]}
                castShadow
              >
                <boxGeometry args={[1.5, 0.4, 0.1]} />
                <meshStandardMaterial color="#F6B40E" side={THREE.DoubleSide} />
              </mesh>
            );
          })}
        </group>
      </group>
    </group>
  );
}
