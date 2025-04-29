import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import { useGameStore } from "@/stores/useGameState";
import { enviroment } from "@/lib/env-vars";
import { GameObjTorch } from "./game-obj-torch";

export function TorchLight({ position = [0, 0, 100] }) {
  const pointLightRef = useRef();
  const isTorchActive = useGameStore((state) => state.isTorchActive);

  // State for flickering effect - increased base intensity
  const [baseIntensity] = useState(100);
  const flickerRef = useRef({
    timer: 0,
    intensity: baseIntensity,
  });

  // Use helper properly - always call it, but only enable when conditions are met
  useHelper(
    enviroment === "test" && isTorchActive ? pointLightRef : null,
    THREE.PointLightHelper,
    20,
    "orange"
  );

  // Update light position to follow player and add flickering effect
  useFrame((state, delta) => {
    if (pointLightRef.current && isTorchActive) {
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
    <group position={position}>
      {/* Main torch light */}
      <pointLight
        ref={pointLightRef}
        intensity={baseIntensity}
        distance={400}
        decay={1.4}
        color="#ff9c40"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={1}
        shadow-camera-far={400}
        power={14} // Add power to increase overall light intensity
      >
        {/* Torch object */}
        <GameObjTorch initialPosition={[0, 0, 0]} />
      </pointLight>
    </group>
  );
}
