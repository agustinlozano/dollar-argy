import React, { useRef, useEffect, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import { enviroment } from "@/lib/env-vars";

export function DanceCamera({ position, followDistance = 300 }) {
  const cameraRef = useRef();
  const { size, invalidate } = useThree();

  // Compute camera dimensions using memoization
  const { width, height } = useMemo(() => {
    const baseSize = 300;
    const viewRatio = size.width / size.height;
    return {
      width: Math.max(baseSize, baseSize * viewRatio),
      height: Math.max(baseSize, baseSize / viewRatio),
    };
  }, [size.width, size.height]);

  // Fixed offset for dance camera
  const currentOffset = useRef(new THREE.Vector3(300, -300, 300));

  // Handle window resize
  useEffect(() => {
    if (!cameraRef.current) return;

    // Update camera frustum on resize
    cameraRef.current.left = width / -2;
    cameraRef.current.right = width / 2;
    cameraRef.current.top = height / 2;
    cameraRef.current.bottom = height / -2;
    cameraRef.current.updateProjectionMatrix();

    // Force a re-render of the scene
    invalidate();
  }, [width, height, invalidate]);

  // Set up camera on first render
  useEffect(() => {
    if (!cameraRef.current) return;

    // Set camera properties
    cameraRef.current.up.set(0, 0, 1);
    cameraRef.current.position.set(
      position.x + currentOffset.current.x,
      position.y + currentOffset.current.y,
      followDistance
    );
    cameraRef.current.lookAt(position.x, position.y, 0);
    cameraRef.current.updateProjectionMatrix();
  }, [position, followDistance]);

  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      left={width / -2}
      right={width / 2}
      top={height / 2}
      bottom={height / -2}
      near={100}
      far={enviroment === "development" ? 4000 : 800}
    />
  );
}
