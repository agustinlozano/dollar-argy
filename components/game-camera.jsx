import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import { enviroment } from "@/lib/env-vars";

export function GameCamera({
  target,
  followSpeed = 0.01,
  followDistance = 300,
}) {
  const cameraRef = useRef();
  const { size } = useThree();

  // Compute camera dimensions
  const baseSize = 300;
  const viewRatio = size.width / size.height;
  const width = viewRatio < 1 ? baseSize : baseSize * viewRatio;
  const height = viewRatio < 1 ? baseSize / viewRatio : baseSize;

  // Create a vector to store the target position
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
  const currentOffset = useRef(new THREE.Vector3(300, -300, 300));

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
    if (!cameraRef.current || !target.current) return;

    // Get player position
    const playerPosition = new THREE.Vector3();
    target.current.getWorldPosition(playerPosition);

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

    // Update camera target
    // cameraRef.current.lookAt(
    //   targetPosition.current.x,
    //   targetPosition.current.y,
    //   0
    // );
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

// Old game camera
// function GameCamera() {
//   const cameraRef = useRef();
//   const { size } = useThree();

//   // Compute camera dimensions using the same logic as original code
//   const baseSize = 300;
//   const viewRatio = size.width / size.height;
//   const width = viewRatio < 1 ? baseSize : baseSize * viewRatio;
//   const height = viewRatio < 1 ? baseSize / viewRatio : baseSize;

//   useEffect(() => {
//     if (!cameraRef.current) return;

//     // Important: we need to set up properly after the camera is created
//     cameraRef.current.up.set(0, 0, 1);
//     cameraRef.current.position.set(300, -300, 300);
//     cameraRef.current.lookAt(0, 0, 0);
//     cameraRef.current.updateProjectionMatrix();
//   }, []);

//   return (
//     <OrthographicCamera
//       ref={cameraRef}
//       makeDefault
//       left={width / -2}
//       right={width / 2}
//       top={height / 2}
//       bottom={height / -2}
//       near={100}
//       far={900}
//     />
//   );
// }
