import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// NPC Dimensions - now based on BILL_DIMENSIONS, about 80% of player size
const NPC_DIMENSIONS = {
  headRadius: 10, // larger head for stylization
  torsoWidth: 25, // 80% of player width
  torsoHeight: 38, // reduced for shorter NPC
  torsoDepth: 10, // slightly less than player depth
  armWidth: 7,
  armHeight: 38,
  armDepth: 10,
  legWidth: 10,
  legHeight: 35, // reduced for shorter NPC
  legDepth: 10,
  baseHeight: 55, // match player baseHeight so feet are on ground
};

// Colors for NPC parts
const NPC_COLORS = {
  skin: "#e0ac69", // Base skin tone
  shirt: "#5d8aa8", // Blue shirt
  pants: "#36454f", // Dark pants
  shoes: "#4b3621", // Brown shoes
};

export const HumanNPC = ({
  position = [0, 0, 0],
  wanderRadius = 20,
  wanderSpeed = 0.5,
  rotation = [0, 0, 0],
}) => {
  const groupRef = useRef();
  const bodyRef = useRef();

  // Animation state reference
  const animState = useRef({
    timer: Math.random() * 100, // Random start time for variation between NPCs
    targetPosition: new THREE.Vector3(
      position[0],
      position[1],
      position[2] + NPC_DIMENSIONS.baseHeight
    ),
    initialPosition: new THREE.Vector3(
      position[0],
      position[1],
      position[2] + NPC_DIMENSIONS.baseHeight
    ),
    idleTimer: 0,
    isIdle: Math.random() > 0.5, // Random initial idle state
    idleDuration: 2 + Math.random() * 3, // Random idle duration
    walkDirection: new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      0
    ).normalize(),
  });

  // Create materials with minimal properties for performance
  const materials = useMemo(() => {
    return {
      skin: new THREE.MeshLambertMaterial({ color: NPC_COLORS.skin }),
      shirt: new THREE.MeshLambertMaterial({ color: NPC_COLORS.shirt }),
      pants: new THREE.MeshLambertMaterial({ color: NPC_COLORS.pants }),
      shoes: new THREE.MeshLambertMaterial({ color: NPC_COLORS.shoes }),
    };
  }, []);

  // Animate the NPC with simple wandering behavior
  // useFrame((state, delta) => {
  //   if (!groupRef.current) return;

  //   // Update animation timer
  //   animState.current.timer += delta;

  //   // Simple bobbing animation for "breathing" effect
  //   const breathAmt = Math.sin(animState.current.timer * 2) * 0.2;
  //   bodyRef.current.position.z = breathAmt;

  //   // Handle idle/walking state
  //   if (animState.current.isIdle) {
  //     animState.current.idleTimer += delta;
  //     if (animState.current.idleTimer >= animState.current.idleDuration) {
  //       // Switch to walking
  //       animState.current.isIdle = false;
  //       animState.current.idleTimer = 0;

  //       // Choose new random direction
  //       animState.current.walkDirection
  //         .set(Math.random() - 0.5, Math.random() - 0.5, 0)
  //         .normalize();

  //       // Calculate new target position within wander radius
  //       const angle = Math.random() * Math.PI * 2;
  //       const distance = Math.random() * wanderRadius;
  //       const newX =
  //         animState.current.initialPosition.x + Math.cos(angle) * distance;
  //       const newY =
  //         animState.current.initialPosition.y + Math.sin(angle) * distance;

  //       animState.current.targetPosition.set(
  //         newX,
  //         newY,
  //         animState.current.initialPosition.z
  //       );
  //     }
  //   } else {
  //     // Walking state - move toward target
  //     const currentPos = new THREE.Vector3().copy(groupRef.current.position);
  //     const targetPos = animState.current.targetPosition;

  //     // Move toward target
  //     const moveStep = delta * wanderSpeed;
  //     const distanceToTarget = currentPos.distanceTo(targetPos);

  //     if (distanceToTarget > moveStep) {
  //       // Continue walking
  //       const directionToTarget = new THREE.Vector3()
  //         .subVectors(targetPos, currentPos)
  //         .normalize();

  //       // Apply movement
  //       groupRef.current.position.add(
  //         directionToTarget.multiplyScalar(moveStep)
  //       );

  //       // Face movement direction
  //       const angle = Math.atan2(directionToTarget.y, directionToTarget.x);
  //       groupRef.current.rotation.z = angle - Math.PI / 2;

  //       // Add walking animation (leg movement)
  //       const legSwing = Math.sin(animState.current.timer * 5) * 0.3;
  //       if (groupRef.current.children[0].children[3]) {
  //         groupRef.current.children[0].children[3].rotation.x = legSwing; // Right leg
  //       }
  //       if (groupRef.current.children[0].children[4]) {
  //         groupRef.current.children[0].children[4].rotation.x = -legSwing; // Left leg
  //       }

  //       // Arm swing animation
  //       if (groupRef.current.children[0].children[1]) {
  //         groupRef.current.children[0].children[1].rotation.x = -legSwing; // Right arm
  //       }
  //       if (groupRef.current.children[0].children[2]) {
  //         groupRef.current.children[0].children[2].rotation.x = legSwing; // Left arm
  //       }
  //     } else {
  //       // Reached target, switch to idle
  //       animState.current.isIdle = true;
  //       animState.current.idleTimer = 0;
  //       animState.current.idleDuration = 2 + Math.random() * 3; // Random idle duration

  //       // Reset limb rotations
  //       if (groupRef.current.children[0].children[1]) {
  //         groupRef.current.children[0].children[1].rotation.x = 0;
  //       }
  //       if (groupRef.current.children[0].children[2]) {
  //         groupRef.current.children[0].children[2].rotation.x = 0;
  //       }
  //       if (groupRef.current.children[0].children[3]) {
  //         groupRef.current.children[0].children[3].rotation.x = 0;
  //       }
  //       if (groupRef.current.children[0].children[4]) {
  //         groupRef.current.children[0].children[4].rotation.x = 0;
  //       }
  //     }
  //   }
  // });

  return (
    <group
      ref={groupRef}
      position={[
        position[0],
        position[1],
        position[2] + NPC_DIMENSIONS.baseHeight,
      ]}
      rotation={rotation}
    >
      {/* Body parts container */}
      <group ref={bodyRef}>
        {/* Head - simple sphere */}
        <mesh
          castShadow
          position={[
            0,
            0,
            NPC_DIMENSIONS.torsoHeight / 2 + NPC_DIMENSIONS.headRadius,
          ]}
          material={materials.skin}
        >
          <sphereGeometry args={[NPC_DIMENSIONS.headRadius, 8, 6]} />
        </mesh>

        {/* Right Arm */}
        <mesh
          castShadow
          position={[
            -(NPC_DIMENSIONS.torsoWidth / 2 + NPC_DIMENSIONS.armWidth / 2) - 1,
            0,
            NPC_DIMENSIONS.torsoHeight / 2 - NPC_DIMENSIONS.armHeight / 2 - 4,
          ]}
          material={materials.shirt}
        >
          <boxGeometry
            args={[
              NPC_DIMENSIONS.armWidth,
              NPC_DIMENSIONS.armDepth,
              NPC_DIMENSIONS.armHeight,
            ]}
          />
        </mesh>

        {/* Left Arm */}
        <mesh
          castShadow
          position={[
            NPC_DIMENSIONS.torsoWidth / 2 + NPC_DIMENSIONS.armWidth / 2 + 1,
            0,
            NPC_DIMENSIONS.torsoHeight / 2 - NPC_DIMENSIONS.armHeight / 2 - 4,
          ]}
          material={materials.shirt}
        >
          <boxGeometry
            args={[
              NPC_DIMENSIONS.armWidth,
              NPC_DIMENSIONS.armDepth,
              NPC_DIMENSIONS.armHeight,
            ]}
          />
        </mesh>

        {/* Right Leg */}
        <mesh
          castShadow
          position={[
            -NPC_DIMENSIONS.legWidth + 3,
            0,
            -NPC_DIMENSIONS.torsoHeight / 2 - NPC_DIMENSIONS.legHeight / 2,
          ]}
          material={materials.pants}
        >
          <boxGeometry
            args={[
              NPC_DIMENSIONS.legWidth,
              NPC_DIMENSIONS.legDepth,
              NPC_DIMENSIONS.legHeight,
            ]}
          />
        </mesh>

        {/* Left Leg */}
        <mesh
          castShadow
          position={[
            NPC_DIMENSIONS.legWidth - 3,
            0,
            -NPC_DIMENSIONS.torsoHeight / 2 - NPC_DIMENSIONS.legHeight / 2,
          ]}
          material={materials.pants}
        >
          <boxGeometry
            args={[
              NPC_DIMENSIONS.legWidth,
              NPC_DIMENSIONS.legDepth,
              NPC_DIMENSIONS.legHeight,
            ]}
          />
        </mesh>

        {/* Torso/Body */}
        <mesh castShadow material={materials.shirt}>
          <boxGeometry
            args={[
              NPC_DIMENSIONS.torsoWidth,
              NPC_DIMENSIONS.torsoDepth,
              NPC_DIMENSIONS.torsoHeight,
            ]}
          />
        </mesh>

        {/* Shoes - right */}
        <mesh
          castShadow
          position={[
            -NPC_DIMENSIONS.legWidth,
            NPC_DIMENSIONS.legDepth / 2,
            -NPC_DIMENSIONS.torsoHeight / 2 - NPC_DIMENSIONS.legHeight - 1,
          ]}
          material={materials.shoes}
        >
          <boxGeometry
            args={[NPC_DIMENSIONS.legWidth, NPC_DIMENSIONS.legDepth * 1.5, 2]}
          />
        </mesh>

        {/* Shoes - left */}
        <mesh
          castShadow
          position={[
            NPC_DIMENSIONS.legWidth,
            NPC_DIMENSIONS.legDepth / 2,
            -NPC_DIMENSIONS.torsoHeight / 2 - NPC_DIMENSIONS.legHeight - 1,
          ]}
          material={materials.shoes}
        >
          <boxGeometry
            args={[NPC_DIMENSIONS.legWidth, NPC_DIMENSIONS.legDepth * 1.5, 2]}
          />
        </mesh>
      </group>
    </group>
  );
};
