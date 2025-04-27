import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "@/stores/useGameState";
import { enviroment } from "@/lib/env-vars";

export function PlayerTorchLight() {
  const pointLightRef = useRef();
  const playerPosition = useGameStore((state) => state.playerPosition);
  const isTorchActive = useGameStore((state) => state.isTorchActive);

  // State for flickering effect - increased base intensity
  const [baseIntensity] = useState(1.5);
  const flickerRef = useRef({
    timer: 0,
    intensity: baseIntensity,
  });

  // Use helper properly - always call it, but only enable when conditions are met
  useHelper(
    enviroment === "development" && isTorchActive ? pointLightRef : null,
    THREE.PointLightHelper,
    20,
    "orange"
  );

  // Update light position to follow player and add flickering effect
  useFrame((state, delta) => {
    if (pointLightRef.current && playerPosition && isTorchActive) {
      // Position the light to follow the player
      // Offset it slightly to create directional lighting
      pointLightRef.current.position.x = playerPosition.x;
      pointLightRef.current.position.y = playerPosition.y - 20; // Position slightly behind player
      pointLightRef.current.position.z = 100; // Increased height

      // Flickering effect
      flickerRef.current.timer += delta;

      // Random flickering calculation
      if (flickerRef.current.timer > 0.1) {
        flickerRef.current.timer = 0;
        // Create a subtle random flicker effect
        const flicker = baseIntensity * (0.85 + Math.random() * 0.3);
        pointLightRef.current.intensity = flicker;
      }
    }
  });

  // Don't render if torch is not active
  if (!isTorchActive) return null;

  return (
    <group>
      {/* Main torch light */}
      <pointLight
        ref={pointLightRef}
        position={[0, -20, 100]}
        intensity={baseIntensity}
        distance={400} // Increased light reach
        decay={1.5} // Decreased decay for slower falloff
        color="#ff9c40" // Warm orange torch color
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={1}
        shadow-camera-far={400}
      >
        {/* Optional: Add a small sphere to visualize the light source */}
        {enviroment === "development" && (
          <mesh>
            <sphereGeometry args={[5, 16, 16]} />
            <meshBasicMaterial color="#ff9c40" />
          </mesh>
        )}
      </pointLight>

      {/* Secondary ambient glow for better visibility */}
      {isTorchActive && (
        <pointLight
          position={[playerPosition.x, playerPosition.y, 50]}
          intensity={0.5}
          distance={200}
          decay={2}
          color="#fff1e0"
          castShadow={false}
        />
      )}
    </group>
  );
}
