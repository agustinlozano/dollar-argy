import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useGameStore } from "@/stores/useGameState";
import { useInventoryStore } from "@/stores/useInventoryState";
import * as THREE from "three";

export function GoldCoin({ position = [0, 0, 0] }) {
  const coinRef = useRef();
  const [isNearby, setIsNearby] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  const playerPosition = useGameStore((state) => state.playerPosition);
  const addToInventory = useInventoryStore((state) => state.add);

  // Check if player is near the coin
  useEffect(() => {
    if (isCollected) return;

    const coinPos2D = new THREE.Vector2(position[0], position[1]);
    const playerPos2D = new THREE.Vector2(playerPosition.x, playerPosition.y);
    const distance = coinPos2D.distanceTo(playerPos2D);

    setIsNearby(distance <= 60);
  }, [playerPosition, position, isCollected]);

  // Handle the E key press
  useEffect(() => {
    if (!isNearby || isCollected) return;

    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === "e") {
        setIsCollected(true);
        addToInventory({ slug: "gold_coins", type: "coin" });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isNearby, isCollected, addToInventory]);

  // Animation when collecting the coin
  useFrame((_, delta) => {
    if (!isCollected || !coinRef.current) return;

    // Update animation progress
    setAnimationProgress((prev) => {
      const newProgress = prev + delta * 2;
      return newProgress >= 1 ? 1 : newProgress;
    });

    // Move coin towards player position
    const targetPosition = new THREE.Vector3(
      playerPosition.x,
      playerPosition.y,
      50 // Float up a bit
    );

    const currentPos = coinRef.current.position;
    currentPos.lerp(targetPosition, 0.1);

    // Rotate coin while moving
    coinRef.current.rotation.z += delta * 5;

    // Scale down as it moves
    const scale = 1 - animationProgress * 0.8;
    coinRef.current.scale.set(scale, scale, scale);

    // Make coin disappear when animation completes
    if (animationProgress >= 1) {
      coinRef.current.visible = false;
    }
  });

  if (isCollected && animationProgress >= 1) return null;

  return (
    <group ref={coinRef} position={position}>
      <mesh
        castShadow
        receiveShadow
        position={[0, 0, 4]}
        rotation={[-Math.PI / 2, 1, 0]}
      >
        <cylinderGeometry args={[6, 6, 4, 24]} />
        <meshLambertMaterial color="#FFD700" flatShading />
      </mesh>

      {/* Interaction indicator */}
      {isNearby && !isCollected && (
        <Html
          position={[0, 0, 20]}
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
          E para recolectar
        </Html>
      )}
    </group>
  );
}
