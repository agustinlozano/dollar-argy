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
}) {
  const pointLightRef = useRef();
  const isTorchActive = useGameStore((state) => state.isTorchActive);

  // State for flickering effect - reduced base intensity
  const flickerState = useRef({
    values: Array.from({ length: 20 }, () => 80 + Math.random() * 40),
    currentIndex: 0,
    timer: 0,
    transitionProgress: 0,
    currentIntensity: 100,
    targetIntensity: 100,
  }).current;

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
  useFrame((_, delta) => {
    if (!pointLightRef.current || !isTorchActive) return;

    flickerState.timer += delta;

    // Cambiar target cada 0.3 segundos
    if (flickerState.timer >= 0.3) {
      flickerState.timer = 0;
      flickerState.currentIntensity = flickerState.targetIntensity;
      flickerState.currentIndex =
        (flickerState.currentIndex + 1) % flickerState.values.length;
      flickerState.targetIntensity =
        flickerState.values[flickerState.currentIndex];
      flickerState.transitionProgress = 0;
    }

    // Transición suave entre valores
    flickerState.transitionProgress = Math.min(
      1,
      flickerState.transitionProgress + delta * 5
    );
    const intensity = THREE.MathUtils.lerp(
      flickerState.currentIntensity,
      flickerState.targetIntensity,
      flickerState.transitionProgress
    );

    pointLightRef.current.intensity = intensity;
  });

  // Don't render if torch is not active
  if (!isTorchActive) return null;

  return (
    <group position={position} rotation={rotation}>
      {/* Main torch light */}
      <pointLight
        ref={pointLightRef}
        intensity={100}
        distance={80}
        decay={decay}
        color="#ff9c40"
        castShadow
        shadow-mapSize-width={100}
        shadow-mapSize-height={100}
        shadow-camera-near={1}
        shadow-camera-far={200}
      >
        {/* Torch object */}
        {hideTorchObj ? null : <GameObjTorch initialPosition={[0, 0, 0]} />}
      </pointLight>
    </group>
  );
}
