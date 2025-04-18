import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useGameStore } from "@/stores/useGameState";
import * as THREE from "three";

export function MoneyChest({ position = [0, 0, 0] }) {
  const chestRef = useRef();
  const lidRef = useRef();
  const animationProgress = useRef(0);

  const [isNearby, setIsNearby] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLooted, setIsLooted] = useState(false);

  const playerPosition = useGameStore((state) => state.playerPosition);

  // Memoized geometries and materials
  const baseGeometry = useMemo(() => new THREE.BoxGeometry(30, 20, 20), []);
  const lidGeometry = useMemo(() => new THREE.BoxGeometry(30, 20, 6), []);
  const lockGeometry = useMemo(() => new THREE.BoxGeometry(4, 2, 6), []);

  const baseMaterial = useMemo(
    () =>
      new THREE.MeshLambertMaterial({ color: "#8B5E3C", flatShading: true }),
    []
  );
  const lidMaterial = useMemo(
    () =>
      new THREE.MeshLambertMaterial({ color: "#A97452", flatShading: true }),
    []
  );
  const lockMaterial = useMemo(
    () =>
      new THREE.MeshLambertMaterial({ color: "#FFD700", flatShading: true }),
    []
  );

  // Check if the player is near the chest
  useEffect(() => {
    const chestPos2D = new THREE.Vector2(position[0], position[1]);
    const playerPos2D = new THREE.Vector2(playerPosition.x, playerPosition.y);
    const distance = chestPos2D.distanceTo(playerPos2D);

    setIsNearby(distance <= 60);
  }, [playerPosition, position]);

  // Handle the E key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === "e" && isNearby && !isLooted) {
        setIsOpen(true);
        setTimeout(() => setIsLooted(true), 1000);
      }
    };

    if (isNearby) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [isNearby, isLooted]);

  // Chest opening animation
  useFrame((_, delta) => {
    const lid = lidRef.current;
    if (!lid) return;

    const target = isOpen ? 1 : 0;
    animationProgress.current = THREE.MathUtils.lerp(
      animationProgress.current,
      target,
      delta * 2
    );

    lid.rotation.x = (-Math.PI / 2) * animationProgress.current;
    lid.position.z = 23 + 8 * animationProgress.current;
    lid.position.y = 10 * animationProgress.current;
  });

  return (
    <group position={position} ref={chestRef}>
      {/* Base */}
      <mesh
        castShadow
        receiveShadow
        geometry={baseGeometry}
        material={baseMaterial}
        position={[0, 0, 10]}
      />

      {/* Lid */}
      <group ref={lidRef} position={[0, 0, 23]}>
        <mesh
          castShadow
          receiveShadow
          geometry={lidGeometry}
          material={lidMaterial}
        />
        <mesh
          position={[0, -11, 0]}
          geometry={lockGeometry}
          material={lockMaterial}
        />
      </group>

      {/* UI indicator */}
      {isNearby && !isLooted && (
        <Html
          position={[0, 0, 40]}
          center
          style={{
            background: "rgba(0, 0, 0, 0.8)",
            padding: "6px 12px",
            borderRadius: "4px",
            color: "white",
            fontSize: "14px",
            fontFamily: "Arial",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          E para abrir
        </Html>
      )}
    </group>
  );
}
