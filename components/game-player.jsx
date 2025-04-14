import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function Player({ position, rotation, jumpHeight = 8, onMoveComplete }) {
  const playerRef = useRef();
  const groupRef = useRef();

  // Animation state
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [startRotation, setStartRotation] = useState(0);

  // Animation progress
  const animationState = useRef({
    progress: 0,
    time: 0,
    running: false,
    stepTime: 0.2, // Seconds per step
  });

  // Initialize player position on first render
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.position.x = position.x;
      playerRef.current.position.y = position.y;

      if (groupRef.current) {
        groupRef.current.rotation.z = rotation;
      }

      setTargetPosition({ x: position.x, y: position.y });
      setStartPosition({ x: position.x, y: position.y });
      setTargetRotation(rotation);
      setStartRotation(rotation);
    }
  }, []);

  // Detect changes in target position or rotation
  useEffect(() => {
    if (!playerRef.current) return;

    // Only start a new movement if the position actually changed
    if (
      targetPosition.x === position.x &&
      targetPosition.y === position.y &&
      targetRotation === rotation
    ) {
      return;
    }

    // Set new target position and rotation
    setTargetPosition({ x: position.x, y: position.y });
    setTargetRotation(rotation);

    // Set current position as start position
    setStartPosition({
      x: playerRef.current.position.x,
      y: playerRef.current.position.y,
    });

    // Set current rotation as start rotation
    setStartRotation(groupRef.current.rotation.z);

    // Start animation
    setIsMoving(true);
    animationState.current.time = 0;
    animationState.current.progress = 0;
    animationState.current.running = true;

    // Debug
    console.log(
      "Starting move from",
      { x: playerRef.current.position.x, y: playerRef.current.position.y },
      "to",
      { x: position.x, y: position.y }
    );
  }, [position, rotation]);

  // Animation frame
  useFrame((state, delta) => {
    if (!isMoving || !animationState.current.running) return;

    // Update animation time and progress
    animationState.current.time += delta;
    const progress = Math.min(
      1,
      animationState.current.time / animationState.current.stepTime
    );
    animationState.current.progress = progress;

    // Update position with smooth interpolation
    if (playerRef.current) {
      playerRef.current.position.x = THREE.MathUtils.lerp(
        startPosition.x,
        targetPosition.x,
        progress
      );

      playerRef.current.position.y = THREE.MathUtils.lerp(
        startPosition.y,
        targetPosition.y,
        progress
      );

      // Add bounce effect
      playerRef.current.position.z = Math.sin(progress * Math.PI) * jumpHeight;
    }

    // Update rotation with smooth interpolation
    if (groupRef.current) {
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        startRotation,
        targetRotation,
        progress
      );
    }

    // Check if animation is complete
    if (progress >= 1) {
      // Reset animation state
      animationState.current.running = false;
      setIsMoving(false);

      // Make sure final position is exact
      if (playerRef.current) {
        playerRef.current.position.x = targetPosition.x;
        playerRef.current.position.y = targetPosition.y;
        playerRef.current.position.z = 0;
      }

      if (groupRef.current) {
        groupRef.current.rotation.z = targetRotation;
      }

      // Notify parent that move is complete
      console.log("Move complete!");
      if (onMoveComplete) {
        onMoveComplete();
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
