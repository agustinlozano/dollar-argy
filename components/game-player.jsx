import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { PivotControls } from "@react-three/drei";

export const Player = forwardRef(function PlayerBill(
  { position, rotation, jumpHeight = 8, onMoveComplete },
  ref
) {
  const playerRef = useRef();
  const groupRef = useRef();

  const texture = useTexture("/hornero-bill.jpg");
  const billWidth = 41.2;
  const billHeight = 100;
  const billDepth = 5;
  const baseHeightForward = 25; // Altura base cuando se mueve hacia adelante/atrás
  const baseHeightSideways = 50; // Altura base cuando se mueve hacia los lados

  // Forward the ref to the parent component
  useImperativeHandle(ref, () => playerRef.current);

  // Determinar la altura base según la rotación
  const getBaseHeight = (rot) => {
    // Si la rotación es 0 o Math.PI (adelante/atrás), usar altura normal
    // Si la rotación es Math.PI/2 o -Math.PI/2 (izquierda/derecha), usar altura mayor
    return Math.abs(rot) === Math.PI / 2
      ? baseHeightSideways
      : baseHeightForward;
  };

  // Animation state
  const [targetPosition, setTargetPosition] = useState({
    x: 0,
    y: 0,
    z: baseHeightForward,
  });
  const [targetRotation, setTargetRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [startPosition, setStartPosition] = useState({
    x: 0,
    y: 0,
    z: baseHeightForward,
  });
  const [startRotation, setStartRotation] = useState(0);

  const materials = useMemo(
    () => [
      new THREE.MeshLambertMaterial({ color: "#dbad6a" }), // right
      new THREE.MeshLambertMaterial({ color: "#dbad6a" }), // left
      new THREE.MeshLambertMaterial({ color: "#dbad6a" }), // top
      new THREE.MeshLambertMaterial({ color: "#dbad6a" }), // bottom
      new THREE.MeshLambertMaterial({ map: texture }), // front (cara visible con textura)
      new THREE.MeshLambertMaterial({ color: "#dbad6a" }), // back
    ],
    [texture]
  );

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
      playerRef.current.position.z = baseHeightForward;

      if (groupRef.current) {
        groupRef.current.rotation.y = Math.PI / 2;
      }

      setTargetPosition({ x: position.x, y: position.y, z: baseHeightForward });
      setStartPosition({ x: position.x, y: position.y, z: baseHeightForward });
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

    // Determinar la altura base según la nueva rotación
    const newBaseHeight = getBaseHeight(rotation);

    // Set new target position and rotation
    setTargetPosition({ x: position.x, y: position.y, z: newBaseHeight });
    setTargetRotation(rotation);

    // Set current position as start position
    setStartPosition({
      x: playerRef.current.position.x,
      y: playerRef.current.position.y,
      z: playerRef.current.position.z,
    });

    // Set current rotation as start rotation
    setStartRotation(groupRef.current.rotation.z);

    // Start animation
    setIsMoving(true);
    animationState.current.time = 0;
    animationState.current.progress = 0;
    animationState.current.running = true;
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

      // Interpolar la altura Z entre la posición inicial y la final
      playerRef.current.position.z = THREE.MathUtils.lerp(
        startPosition.z,
        targetPosition.z,
        progress
      );

      // Agregar el efecto de salto
      const jumpOffset = Math.sin(progress * Math.PI) * jumpHeight;
      playerRef.current.position.z += jumpOffset;
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
        playerRef.current.position.z = targetPosition.z; // Usar la altura objetivo
      }

      if (groupRef.current) {
        groupRef.current.rotation.z = targetRotation;
      }

      // Notify parent that move is complete
      if (onMoveComplete) {
        onMoveComplete();
      }
    }
  });

  return (
    <group ref={playerRef} position={[0, 0, baseHeightForward]}>
      <PivotControls scale={45}>
        <group ref={groupRef} rotation={[0, Math.PI / 2, 0]}>
          <mesh
            castShadow
            receiveShadow
            position={[0, 0, billDepth / 2]}
            material={materials}
          >
            <boxGeometry args={[billWidth, billHeight, billDepth]} />
          </mesh>
        </group>
      </PivotControls>
    </group>
  );
});
