import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import { useGameStore } from "@/stores/useGameState";
import { enviroment } from "@/lib/env-vars";
import { GameObjTorch } from "./game-obj-torch";

export function TorchLight({
  position = [0, 0, 100],
  rotation = [0, 0, 0],
  hideTorchObj = false,
  decay = 1.4,
  power = 14,
}) {
  const pointLightRef = useRef();
  const isTorchActive = useGameStore((state) => state.isTorchActive);

  // State for flickering effect - reduced base intensity
  const [baseIntensity] = useState(100);
  const flickerRef = useRef({
    timer: 0,
    intensity: baseIntensity,
    nextUpdate: 0,
  });

  // Use helper only in test environment
  useHelper(
    enviroment === "test" && isTorchActive ? pointLightRef : null,
    THREE.PointLightHelper,
    10,
    "orange"
  );

  // Create light once and update properties
  useEffect(() => {
    if (pointLightRef.current) {
      // Reduce shadow quality for better performance
      pointLightRef.current.shadow.mapSize.width = 100;
      pointLightRef.current.shadow.mapSize.height = 100;

      // Smaller area for better performance
      pointLightRef.current.distance = 150;
    }
  }, []);

  // Update light with reduced flickering frequency
  useFrame((state, delta) => {
    if (!pointLightRef.current || !isTorchActive) return;

    // Skip frames to improve performance (only update every 5 frames)
    flickerRef.current.nextUpdate -= delta;
    if (flickerRef.current.nextUpdate > 0) return;

    // Reset counter and do update less frequently
    flickerRef.current.nextUpdate = 0.25;

    // Create a subtle random flicker effect
    const flicker = baseIntensity * (0.9 + Math.random() * 0.2);
    pointLightRef.current.intensity = flicker;
  });

  // Don't render if torch is not active
  if (!isTorchActive) return null;

  return (
    <group position={position} rotation={rotation}>
      {/* Main torch light */}
      <pointLight
        ref={pointLightRef}
        intensity={baseIntensity}
        distance={150}
        decay={decay}
        color="#ff9c40"
        castShadow
        shadow-mapSize-width={100}
        shadow-mapSize-height={100}
        shadow-camera-near={1}
        shadow-camera-far={200}
        power={power}
      >
        {/* Torch object */}
        {hideTorchObj ? null : <GameObjTorch initialPosition={[0, 0, 0]} />}
      </pointLight>
    </group>
  );
}
