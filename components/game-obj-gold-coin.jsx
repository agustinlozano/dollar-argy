import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useGameStore } from "@/stores/useGameState";
import { useInventoryStore } from "@/stores/useInventoryState";
import * as THREE from "three";
import { itemSlugs, itemTypes } from "@/lib/consts";

export function GoldCoin({ position = [0, 0, 0] }) {
  const coinRef = useRef(null);
  const animationProgress = useRef(0);

  const [isNearby, setIsNearby] = useState(false);
  const [isCollected, setIsCollected] = useState(false);

  const playerPosition = useGameStore((state) => state.playerPosition);
  const addToInventory = useInventoryStore((state) => state.add);

  // Memo geometría y material
  const coinGeometry = useMemo(
    () => new THREE.CylinderGeometry(6, 6, 4, 24),
    []
  );
  const coinMaterial = useMemo(
    () =>
      new THREE.MeshLambertMaterial({ color: "#FFD700", flatShading: true }),
    []
  );

  // Player proximity
  useEffect(() => {
    if (isCollected) return;

    const dist = new THREE.Vector2(position[0], position[1]).distanceTo(
      new THREE.Vector2(playerPosition.x, playerPosition.y)
    );

    setIsNearby(dist <= 60);
  }, [playerPosition, position, isCollected]);

  // Collect with E key
  useEffect(() => {
    if (!isNearby || isCollected) return;

    const handleKey = (e) => {
      if (e.key.toLowerCase() === "e") {
        setIsCollected(true);
        addToInventory({ slug: itemSlugs.goldCoins, type: itemTypes.coins });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isNearby, isCollected, addToInventory]);

  // Collection animation
  useFrame((_, delta) => {
    const coin = coinRef.current;
    if (!coin || !isCollected) return;

    animationProgress.current = Math.min(
      animationProgress.current + delta * 2,
      1
    );

    // Movement towards the player
    const target = new THREE.Vector3(playerPosition.x, playerPosition.y, 50);
    coin.position.lerp(target, 0.1);

    // Rotation
    coin.rotation.z += delta * 5;

    // Scaling
    const scale = 1 - animationProgress.current * 0.8;
    coin.scale.set(scale, scale, scale);

    // Hide
    if (animationProgress.current >= 1) {
      coin.visible = false;
    }
  });

  if (isCollected && animationProgress.current >= 1) return null;

  return (
    <group ref={coinRef} position={position}>
      <mesh
        castShadow
        receiveShadow
        geometry={coinGeometry}
        material={coinMaterial}
        position={[0, 0, 4]}
        rotation={[-Math.PI / 2, 1, 0]}
      />

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
          E para recolectar 🪙
        </Html>
      )}
    </group>
  );
}
