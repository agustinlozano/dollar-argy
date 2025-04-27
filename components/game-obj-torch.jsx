import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GameObjTorch({
  initialPosition = [10, 0, 100],
  initialRotation = [0, 0, 0],
}) {
  const handleRef = useRef();
  const flameRef = useRef();

  // Animate the flame
  useFrame((state, delta) => {
    if (flameRef.current) {
      // Make the flame sway randomly
      flameRef.current.rotation.y +=
        Math.sin(state.clock.elapsedTime * 2) * 0.02;
      flameRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 3) * 0.1;

      // Slightly scale the flame up and down
      const scaleY = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
      flameRef.current.scale.y = scaleY;
    }
  });

  return (
    <group position={initialPosition} rotation={initialRotation}>
      {/* Torch handle - wooden part */}
      <mesh ref={handleRef} position={[0, 2, 0]}>
        <cylinderGeometry args={[1, 1, 10, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Torch wrap - cloth/bandage around top */}
      <mesh position={[0, 8, 0]}>
        <cylinderGeometry args={[1.5, 1, 2, 8]} />
        <meshStandardMaterial color="#D2B48C" roughness={1} metalness={0} />
      </mesh>

      {/* Flame base - ember part */}
      <mesh position={[0, 10, 0]}>
        <sphereGeometry args={[2, 8, 8]} />
        <meshStandardMaterial
          color="#FF4500"
          emissive="#FF4500"
          emissiveIntensity={0.5}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Animated flame */}
      <group ref={flameRef} position={[0, 13, 0]}>
        <mesh position={[0, 1, 0]}>
          <coneGeometry args={[3, 8, 8]} />
          <meshStandardMaterial
            color="#FFA500"
            emissive="#FFA500"
            emissiveIntensity={1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Inner flame */}
        <mesh position={[0, -1, 0]} scale={[0.8, 0.8, 0.8]}>
          <coneGeometry args={[3, 8, 8]} />
          <meshStandardMaterial
            color="#FFFF00"
            emissive="#FFFF00"
            emissiveIntensity={1}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* Smoke particles */}
      <group position={[0, 20, 0]}>
        {[...Array(3)].map((_, i) => (
          <mesh
            key={i}
            position={[Math.sin(i * 2) * 2, i * 2, Math.cos(i * 2) * 2]}
            scale={[0.5 + i * 0.3, 0.5 + i * 0.3, 0.5 + i * 0.3]}
          >
            <sphereGeometry args={[1, 4, 4]} />
            <meshStandardMaterial
              color="#444444"
              transparent
              opacity={0.2 - i * 0.05}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
