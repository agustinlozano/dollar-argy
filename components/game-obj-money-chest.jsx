import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useGameStore } from "@/stores/useGameState";
import * as THREE from "three";

export function MoneyChest({ position = [0, 0, 0] }) {
  const chestRef = useRef();
  const lidRef = useRef();
  const [isNearby, setIsNearby] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLooted, setIsLooted] = useState(false);
  const animationProgress = useRef(0);

  // Get player position from store
  const playerPosition = useGameStore((state) => state.playerPosition);

  // Check distance to player
  useEffect(() => {
    const checkProximity = () => {
      const distance = Math.sqrt(
        Math.pow(playerPosition.x - position[0], 2) +
          Math.pow(playerPosition.y - position[1], 2)
      );
      setIsNearby(distance <= 60); // Aproximadamente 1.5 cuadrantes de distancia
    };

    checkProximity();
  }, [playerPosition, position]);

  // Handle key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === "e" && isNearby && !isLooted) {
        setIsOpen(true);
        // Aquí más adelante agregaremos la lógica de loot
        setTimeout(() => {
          setIsLooted(true);
        }, 1000);
      }
    };

    if (isNearby) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [isNearby, isLooted]);

  // Animate chest opening
  useFrame((state, delta) => {
    if (lidRef.current) {
      if (isOpen) {
        animationProgress.current = THREE.MathUtils.lerp(
          animationProgress.current,
          1,
          delta * 2
        );
      } else {
        animationProgress.current = THREE.MathUtils.lerp(
          animationProgress.current,
          0,
          delta * 2
        );
      }

      const targetRotation = (-Math.PI / 2) * animationProgress.current;
      lidRef.current.rotation.x = targetRotation;
      lidRef.current.position.z = 23 + 8 * animationProgress.current;
      lidRef.current.position.y = 10 * animationProgress.current;
    }
  });

  return (
    <group position={position} ref={chestRef}>
      {/* Base del cofre */}
      <mesh castShadow receiveShadow position={[0, 0, 10]}>
        <boxGeometry args={[30, 20, 20]} />
        <meshLambertMaterial color="#8B5E3C" flatShading />
      </mesh>

      {/* Tapa del cofre */}
      <group ref={lidRef} position={[0, 0, 23]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[30, 20, 6]} />
          <meshLambertMaterial color="#A97452" flatShading />
        </mesh>

        {/* Cerradura (se mueve con la tapa) */}
        <mesh position={[0, -11, 0]}>
          <boxGeometry args={[4, 2, 6]} />
          <meshLambertMaterial color="#FFD700" flatShading />
        </mesh>
      </group>

      {/* UI de interacción */}
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
