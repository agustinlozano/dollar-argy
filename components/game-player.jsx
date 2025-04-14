import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// Player component with animation
export function Player({ position, rotation, jumpHeight = 8 }) {
  const playerRef = useRef();
  const groupRef = useRef();

  // Animation state
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [startRotation, setStartRotation] = useState(0);

  // Clock for animation timing
  const clock = useRef({
    time: 0,
    running: false,
  });

  // When position prop changes, start animation
  useEffect(() => {
    if (playerRef.current) {
      setTargetPosition({ x: position.x, y: position.y });
      setTargetRotation(rotation);

      if (!isMoving) {
        setStartPosition({
          x: playerRef.current.position.x,
          y: playerRef.current.position.y,
        });
        setStartRotation(groupRef.current.rotation.z);
        setIsMoving(true);
        clock.current.time = 0;
        clock.current.running = true;
      }
    }
  }, [position, rotation]);

  // Initial positioning
  useEffect(() => {
    if (playerRef.current && !isMoving) {
      playerRef.current.position.x = position.x;
      playerRef.current.position.y = position.y;
      groupRef.current.rotation.z = rotation;
      setTargetPosition({ x: position.x, y: position.y });
      setStartPosition({ x: position.x, y: position.y });
      setTargetRotation(rotation);
      setStartRotation(rotation);
    }
  }, []);

  // Animation frame
  useFrame((state, delta) => {
    if (isMoving && clock.current.running) {
      // Update time and progress
      clock.current.time += delta;
      const stepTime = 0.2; // Same as in original code (seconds)
      const newProgress = Math.min(1, clock.current.time / stepTime);
      setProgress(newProgress);

      // Update position with lerp
      if (playerRef.current) {
        playerRef.current.position.x = THREE.MathUtils.lerp(
          startPosition.x,
          targetPosition.x,
          newProgress
        );

        playerRef.current.position.y = THREE.MathUtils.lerp(
          startPosition.y,
          targetPosition.y,
          newProgress
        );

        // Add the bounce effect using sine wave
        playerRef.current.position.z =
          Math.sin(newProgress * Math.PI) * jumpHeight;
      }

      // Update rotation with lerp
      if (groupRef.current) {
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
          startRotation,
          targetRotation,
          newProgress
        );
      }

      // End animation when complete
      if (newProgress >= 1) {
        setIsMoving(false);
        clock.current.running = false;

        // Notify parent component that movement is complete if needed
        // onMoveComplete && onMoveComplete();
      }
    }
  });

  return (
    <group ref={playerRef} position={[0, 0, 0]}>
      <group ref={groupRef} rotation={[0, 0, 0]}>
        {/* Player body */}
        <mesh castShadow receiveShadow position={[0, 0, 10]}>
          <boxGeometry args={[15, 15, 20]} />
          <meshLambertMaterial color="white" flatShading />
        </mesh>

        {/* Player cap */}
        <mesh castShadow receiveShadow position={[0, 0, 21]}>
          <boxGeometry args={[2, 4, 2]} />
          <meshLambertMaterial color="#f0619a" flatShading />
        </mesh>
      </group>
    </group>
  );
}

// Old Player component
// function Player({ position, rotation }) {
//   const playerRef = useRef();

//   return (
//     <group ref={playerRef} position={[position.x, position.y, 0]}>
//       <group rotation={[0, 0, rotation]}>
//         {/* Player body */}
//         <mesh castShadow receiveShadow position={[0, 0, 10]}>
//           <boxGeometry args={[15, 15, 20]} />
//           <meshLambertMaterial color="white" flatShading />
//         </mesh>

//         {/* Player cap */}
//         <mesh castShadow receiveShadow position={[0, 0, 21]}>
//           <boxGeometry args={[2, 4, 2]} />
//           <meshLambertMaterial color="#f0619a" flatShading />
//         </mesh>
//       </group>
//     </group>
//   );
// }
