// components/game-player.jsx
import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useGameStore } from "@/stores/useGameState";
// import { PivotControls } from "@react-three/drei";
// import { M16M1 } from "./game-weapon-m16";

const BILL_DIMENSIONS = {
  width: 41.2,
  height: 100,
  depth: 5,
  baseHeight: 55,
};

// Pre-compute easing functions for better performance
const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

const easeOutQuad = (t) => {
  return t * (2 - t);
};

export const Player = forwardRef(function PlayerBill({ position }, ref) {
  const playerRef = useRef();
  const groupRef = useRef();
  const texture = useTexture("/textures/hornero-bill.jpg");

  // Access the store for animation state
  const isMoving = useGameStore((state) => state.isMoving);
  const setIsMoving = useGameStore((state) => state.setIsMoving);
  const onMoveComplete = useGameStore((state) => state.onMoveComplete);

  // Animation state using useRef instead of useState
  const animationState = useRef({
    progress: 0,
    time: 0,
    running: false,
    stepTime: 0.2,
    startPosition: { x: 0, y: 0, z: BILL_DIMENSIONS.baseHeight },
    targetPosition: { x: 0, y: 0, z: BILL_DIMENSIONS.baseHeight },
    lastDelta: 0,
    // Cache for expensive calculations
    jumpHeightMap: new Map(),
  });

  // Expose necessary references to the parent
  useImperativeHandle(ref, () => ({
    mesh: playerRef.current,
  }));

  // Initialize player position
  useEffect(() => {
    if (!playerRef.current) return;

    playerRef.current.position.x = position.x;
    playerRef.current.position.y = position.y;
    playerRef.current.position.z = BILL_DIMENSIONS.baseHeight;

    if (groupRef.current) {
      groupRef.current.rotation.x = Math.PI / 2;
      groupRef.current.rotation.y = 0;
      groupRef.current.rotation.z = 0;
    }

    // Update initial animation state
    animationState.current.targetPosition = {
      x: position.x,
      y: position.y,
      z: BILL_DIMENSIONS.baseHeight,
    };
    animationState.current.startPosition = {
      x: position.x,
      y: position.y,
      z: BILL_DIMENSIONS.baseHeight,
    };
  }, []);

  // Detect changes in position
  useEffect(() => {
    if (!playerRef.current) return;

    const currentPos = playerRef.current.position;

    // Update animation state
    animationState.current.startPosition = {
      x: currentPos.x,
      y: currentPos.y,
      z: currentPos.z,
    };
    animationState.current.targetPosition = {
      x: position.x,
      y: position.y,
      z: BILL_DIMENSIONS.baseHeight,
    };
    animationState.current.time = 0;
    animationState.current.progress = 0;
    animationState.current.running = true;

    setIsMoving(true);
  }, [position]);

  // Precompute jump heights for common progress values
  useEffect(() => {
    const jumpHeight = 6;
    const cache = animationState.current.jumpHeightMap;

    // Precompute for 100 steps
    for (let i = 0; i <= 100; i++) {
      const progress = i / 100;
      const jumpProgress = progress < 0.5 ? progress * 2 : 2 - progress * 2;
      cache.set(progress, easeOutQuad(jumpProgress) * jumpHeight);
    }
  }, []);

  // Animation frame
  useFrame((state, delta) => {
    if (!isMoving || !animationState.current.running) return;

    // Skip animation frames when tab is not focused
    if (delta > 0.1) return;

    // Smooth out delta to prevent jerky movements
    const smoothDelta = THREE.MathUtils.lerp(
      animationState.current.lastDelta,
      delta,
      0.5
    );
    animationState.current.lastDelta = smoothDelta;

    animationState.current.time += smoothDelta;
    // Use easeInOutQuad for smoother acceleration/deceleration
    const rawProgress = Math.min(
      1,
      animationState.current.time / animationState.current.stepTime
    );
    const progress = easeInOutQuad(rawProgress);

    if (playerRef.current) {
      // Interpolate position with optimized lerp
      const startPos = animationState.current.startPosition;
      const targetPos = animationState.current.targetPosition;

      playerRef.current.position.x =
        startPos.x + (targetPos.x - startPos.x) * progress;
      playerRef.current.position.y =
        startPos.y + (targetPos.y - startPos.y) * progress;
      playerRef.current.position.z =
        startPos.z + (targetPos.z - startPos.z) * progress;

      // Optimized jump effect with cached values
      const roundedProgress = Math.round(progress * 100) / 100;
      const jumpOffset =
        animationState.current.jumpHeightMap.get(roundedProgress) || 0;
      playerRef.current.position.z += jumpOffset;
    }

    // Check if animation finished
    if (progress >= 1) {
      animationState.current.running = false;
      setIsMoving(false);
      onMoveComplete();

      // Ensure exact final position
      if (playerRef.current) {
        const targetPos = animationState.current.targetPosition;
        playerRef.current.position.x = targetPos.x;
        playerRef.current.position.y = targetPos.y;
        playerRef.current.position.z = targetPos.z;
      }
    }
  });

  // Materials
  const materials = useMemo(
    () => [
      new THREE.MeshLambertMaterial({ color: "#dbad6a" }), // right
      new THREE.MeshLambertMaterial({ color: "#dbad6a" }), // left
      new THREE.MeshLambertMaterial({ color: "#dbad6a" }), // top
      new THREE.MeshLambertMaterial({ color: "#dbad6a" }), // bottom
      new THREE.MeshLambertMaterial({ map: texture }), // front
      new THREE.MeshLambertMaterial({ color: "#dbad6a" }), // back
    ],
    [texture]
  );

  return (
    <group ref={playerRef}>
      {/* <PivotControls scale={45}> */}
      <group ref={groupRef} rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          material={materials}
        >
          <boxGeometry
            args={[
              BILL_DIMENSIONS.width,
              BILL_DIMENSIONS.height,
              BILL_DIMENSIONS.depth,
            ]}
          />
        </mesh>

        {/* Add M16 weapon object */}
        {/* <M16M1 position={[30, 25, 5]} rotation={[0, Math.PI / 2, 0]} /> */}
        {/* Add a point light */}
        <pointLight
          intensity={100}
          distance={100}
          decay={1.3}
          color="#ff9c40"
          position={[0, 0, 25]}
        />
      </group>
      {/* </PivotControls> */}
    </group>
  );
});
