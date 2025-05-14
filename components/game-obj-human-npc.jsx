import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

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
  neckWidth: 3,
  neckDepth: 3,
  neckHeight: 6,
};

// Colors for NPC parts
const NPC_COLORS = {
  skin: "#F6C9B9", // Base skin tone
  shirt: "#5d8aa8", // Blue shirt
  pants: "#36454f", // Dark pants
  shoes: "#4b3621", // Brown shoes
  hair: "#3A3226", // Dark brown hair
};

export const HumanNPCObject = ({
  position = [0, 0, 0],
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
      hair: new THREE.MeshLambertMaterial({ color: NPC_COLORS.hair }),
    };
  }, []);

  // Animate the NPC with simple wandering behavior
  // useFrame((state, delta) => {});

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

        {/* Hair - simple low-poly hair */}
        <mesh
          castShadow
          position={[
            0,
            -1,
            NPC_DIMENSIONS.torsoHeight / 2 +
              NPC_DIMENSIONS.headRadius * 1.2 +
              5,
          ]}
          material={materials.hair}
        >
          <boxGeometry
            args={[
              NPC_DIMENSIONS.headRadius * 1.8,
              NPC_DIMENSIONS.headRadius * 0.9,
              NPC_DIMENSIONS.headRadius * 0.7,
            ]}
          />
        </mesh>

        {/* Hair fringe */}
        <mesh
          castShadow
          position={[
            0,
            4,
            NPC_DIMENSIONS.torsoHeight / 2 +
              NPC_DIMENSIONS.headRadius * 1.5 +
              3,
          ]}
          material={materials.hair}
          rotation={[-0.2, 0, 0]}
        >
          <boxGeometry
            args={[
              NPC_DIMENSIONS.headRadius * 1.4,
              NPC_DIMENSIONS.headRadius * 0.6,
              NPC_DIMENSIONS.headRadius * 0.3,
            ]}
          />
        </mesh>

        {/* Hair top layer */}
        <mesh
          castShadow
          position={[
            0,
            -5,
            NPC_DIMENSIONS.torsoHeight / 2 +
              NPC_DIMENSIONS.headRadius * 1.5 +
              3,
          ]}
          material={materials.hair}
          rotation={[0.2, 0, 0]}
        >
          <boxGeometry
            args={[
              NPC_DIMENSIONS.headRadius * 1.4,
              NPC_DIMENSIONS.headRadius * 0.6,
              NPC_DIMENSIONS.headRadius * 0.3,
            ]}
          />
        </mesh>

        {/* Hair side - right */}
        <mesh
          castShadow
          position={[
            -NPC_DIMENSIONS.headRadius * 0.8,
            -2,
            NPC_DIMENSIONS.torsoHeight / 2 +
              NPC_DIMENSIONS.headRadius * 0.8 +
              1,
          ]}
          material={materials.hair}
        >
          <boxGeometry
            args={[
              NPC_DIMENSIONS.headRadius * 0.4,
              NPC_DIMENSIONS.headRadius * 0.8,
              NPC_DIMENSIONS.headRadius * 1,
            ]}
          />
        </mesh>

        {/* Hair side - left */}
        <mesh
          castShadow
          position={[
            NPC_DIMENSIONS.headRadius * 0.8,
            -2,
            NPC_DIMENSIONS.torsoHeight / 2 +
              NPC_DIMENSIONS.headRadius * 0.8 +
              1,
          ]}
          material={materials.hair}
        >
          <boxGeometry
            args={[
              NPC_DIMENSIONS.headRadius * 0.4,
              NPC_DIMENSIONS.headRadius * 0.8,
              NPC_DIMENSIONS.headRadius * 1,
            ]}
          />
        </mesh>

        {/* hair back side */}
        <mesh
          castShadow
          position={[
            0,
            -8,
            NPC_DIMENSIONS.torsoHeight / 2 + NPC_DIMENSIONS.headRadius,
          ]}
          rotation={[0, 0, Math.PI / 2]}
          material={materials.hair}
        >
          <boxGeometry
            args={[
              NPC_DIMENSIONS.headRadius * 0.5,
              NPC_DIMENSIONS.headRadius * 1.6,
              NPC_DIMENSIONS.headRadius * 1.5,
            ]}
          />
        </mesh>

        {/* Neck */}
        <mesh
          castShadow
          position={[0, 0, NPC_DIMENSIONS.torsoHeight / 2]}
          rotation={[Math.PI / 2, 0, 0]}
          material={materials.skin}
        >
          <cylinderGeometry
            args={[
              NPC_DIMENSIONS.neckWidth,
              NPC_DIMENSIONS.neckDepth,
              NPC_DIMENSIONS.neckHeight,
              6,
            ]}
          />
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
            -NPC_DIMENSIONS.legWidth + 3,
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
            NPC_DIMENSIONS.legWidth - 3,
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
