import React, { useState, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import { useGameStore } from "@/stores/useGameState";
import { useDialogueStore } from "@/stores/useDialogueStore";
import { useSound } from "@/hooks/useSound";
import * as THREE from "three";

export function DialogueTrigger({
  dialogueId,
  children,
  position = [0, 0, 0],
  interactionDistance = 80,
}) {
  const [isNearby, setIsNearby] = useState(false);
  const [isTalking, setIsTalking] = useState(false);

  const triggerDialogue = useDialogueStore((state) => state.triggerDialogue);
  const isDialogueActive = useDialogueStore((state) => state.isDialogueActive);
  const playerPosition = useGameStore((state) => state.playerPosition);
  const { play: playSound } = useSound("/sounds/ui-hovers.wav", {
    volume: 1,
    startTime: 1.8,
    endTime: 2.4,
  });

  const npcRef = useRef();

  // Update the isTalking state when dialogue ends
  useEffect(() => {
    if (!isDialogueActive && isTalking) {
      setIsTalking(false);
    }
  }, [isDialogueActive, isTalking]);

  // Player proximity detection
  useEffect(() => {
    if (isTalking || !npcRef.current) return;

    // Get world position of the NPC
    const worldPosition = new THREE.Vector3();
    npcRef.current.getWorldPosition(worldPosition);

    const dist = new THREE.Vector2(worldPosition.x, worldPosition.y).distanceTo(
      new THREE.Vector2(playerPosition.x, playerPosition.y)
    );

    const isPlayerNearby = dist <= interactionDistance;
    setIsNearby(isPlayerNearby);
  }, [playerPosition, position, isTalking, interactionDistance]);

  // Interact with E key
  useEffect(() => {
    if (!isNearby || isTalking) return;

    const handleKey = (e) => {
      if (e.key.toLowerCase() === "e") {
        setIsTalking(true);
        triggerDialogue({ slug: dialogueId });
        playSound();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isNearby, isTalking, triggerDialogue, dialogueId]);

  return (
    <group ref={npcRef} position={position}>
      {children}

      {isNearby && !isTalking && (
        <Html
          position={[0, 0, 120]}
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
          E para hablar 💬
        </Html>
      )}
    </group>
  );
}
