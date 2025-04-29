// components/game-player.jsx
import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useGameStore } from "@/stores/useGameState";
// import { PivotControls } from "@react-three/drei";
import { M16M1 } from "./game-weapon-m16";
import { TorchLight } from "./game-light-torch";

const BILL_DIMENSIONS = {
  width: 41.2,
  height: 100,
  depth: 5,
  baseHeight: 55,
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

  // Animation frame
  useFrame((state, delta) => {
    if (!isMoving || !animationState.current.running) return;

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
      // Interpolate position with smoothing
      playerRef.current.position.x = THREE.MathUtils.lerp(
        animationState.current.startPosition.x,
        animationState.current.targetPosition.x,
        progress
      );
      playerRef.current.position.y = THREE.MathUtils.lerp(
        animationState.current.startPosition.y,
        animationState.current.targetPosition.y,
        progress
      );
      playerRef.current.position.z = THREE.MathUtils.lerp(
        animationState.current.startPosition.z,
        animationState.current.targetPosition.z,
        progress
      );

      // Optimized jump effect with smoother curve
      const jumpHeight = 6;
      const jumpProgress = progress < 0.5 ? progress * 2 : 2 - progress * 2;
      const jumpOffset = easeOutQuad(jumpProgress) * jumpHeight;
      playerRef.current.position.z += jumpOffset;
    }

    // Check if animation finished
    if (progress >= 1) {
      animationState.current.running = false;
      setIsMoving(false);
      onMoveComplete();

      // Ensure exact final position
      if (playerRef.current) {
        playerRef.current.position.x = animationState.current.targetPosition.x;
        playerRef.current.position.y = animationState.current.targetPosition.y;
        playerRef.current.position.z = animationState.current.targetPosition.z;
      }
    }
  });

  // Easing functions for smoother animations
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const easeOutQuad = (t) => {
    return t * (2 - t);
  };

  // Materials
  const materials = React.useMemo(
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
        <M16M1 position={[30, 25, 5]} rotation={[0, Math.PI / 2, 0]} />
        {/* Add torch light object */}
        <TorchLight position={[40, 0, 0]} />
      </group>
      {/* </PivotControls> */}
    </group>
  );
});
