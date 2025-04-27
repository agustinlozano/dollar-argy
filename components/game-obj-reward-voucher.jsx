import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useGameStore } from "@/stores/useGameState";
import { useInventoryStore } from "@/stores/useInventoryState";
import { itemSlugs, itemTypes } from "@/lib/consts";
import * as THREE from "three";

export function RewardVoucher({ position = [0, 0, 0] }) {
  const voucherRef = useRef(null);
  const animationProgress = useRef(0);

  const [isNearby, setIsNearby] = useState(false);
  const [isCollected, setIsCollected] = useState(false);

  const playerPosition = useGameStore((state) => state.playerPosition);
  const addToInventory = useInventoryStore((state) => state.add);

  // Memoized geometries and materials
  const paperGeometry = useMemo(() => new THREE.BoxGeometry(20, 12, 2), []);
  const paperMaterial = useMemo(
    () =>
      new THREE.MeshLambertMaterial({ color: "#f5f5f5", flatShading: true }),
    []
  );

  const sealGeometry = useMemo(
    () => new THREE.CylinderGeometry(2, 2, 1, 16),
    []
  );
  const sealMaterial = useMemo(
    () =>
      new THREE.MeshLambertMaterial({ color: "#e63946", flatShading: true }),
    []
  );

  // Cleanup function
  const cleanup = () => {
    if (paperGeometry) {
      paperGeometry.dispose();
    }
    if (paperMaterial) {
      paperMaterial.dispose();
    }
    if (sealGeometry) {
      sealGeometry.dispose();
    }
    if (sealMaterial) {
      sealMaterial.dispose();
    }
    if (voucherRef.current) {
      // Dispose any additional resources from child meshes
      voucherRef.current.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) {
            child.geometry.dispose();
          }
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
    }
  };

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
        // addToInventory({
        //   slug: itemSlugs.rewardVoucher,
        //   type: itemTypes.voucher,
        // });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isNearby, isCollected, addToInventory]);

  // Collection animation
  useFrame((_, delta) => {
    const voucher = voucherRef.current;
    if (!voucher || !isCollected) return;

    animationProgress.current = Math.min(
      animationProgress.current + delta * 2,
      1
    );

    // Movement towards the player
    const target = new THREE.Vector3(playerPosition.x, playerPosition.y, 50);
    voucher.position.lerp(target, 0.1);

    // Rotation
    voucher.rotation.z += delta * 3;
    voucher.rotation.x += delta * 2;

    // Scaling
    const scale = 1 - animationProgress.current * 0.8;
    voucher.scale.set(scale, scale, scale);

    // Hide and cleanup when animation completes
    if (animationProgress.current >= 1) {
      voucher.visible = false;
      cleanup();
    }
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanup();
  }, []);

  if (isCollected && animationProgress.current >= 1) return null;

  return (
    <group ref={voucherRef} position={position}>
      {/* Papel principal */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0, 4]}
        geometry={paperGeometry}
        material={paperMaterial}
      />

      {/* Sello / marca */}
      <mesh
        position={[5, 3, 5]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={sealGeometry}
        material={sealMaterial}
      />

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
          E para recolectar 📝
        </Html>
      )}
    </group>
  );
}
