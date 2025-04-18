import React, { useRef, useEffect, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import { enviroment } from "@/lib/env-vars";

export function GameCamera({
  target,
  followSpeed = 0.05,
  followDistance = 300,
}) {
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

  // Create a vector to store the target position
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
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
    cameraRef.current.position.set(300, -300, 300);
    cameraRef.current.lookAt(0, 0, 0);
    cameraRef.current.updateProjectionMatrix();
  }, []);

  // Update camera position every frame to follow target
  useFrame(() => {
    if (!cameraRef.current || !target.current?.mesh) return;

    // Get player position
    const playerPosition = new THREE.Vector3();
    target.current.mesh.getWorldPosition(playerPosition);

    // Update target position (maintain the original camera angle)
    targetPosition.current.set(
      playerPosition.x,
      playerPosition.y,
      0 // Keep z at 0 as we only want to follow in x,y plane
    );

    // Smooth camera follow with lerp
    const newCameraPosition = new THREE.Vector3(
      targetPosition.current.x + currentOffset.current.x,
      targetPosition.current.y + currentOffset.current.y,
      followDistance // Keep camera height constant
    );

    // Apply smooth movement to camera position
    cameraRef.current.position.lerp(newCameraPosition, followSpeed);
  });

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
