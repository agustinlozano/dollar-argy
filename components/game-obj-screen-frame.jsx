import React, { Suspense } from "react";
import { useTexture } from "@react-three/drei";
import { DialogueSpeaker, DialogueActionType } from "@/lib/dialogue.consts";
import { ObjFallback } from "./game-obj-fallback";

export const DialogueWithAgustin = {
  "greet-agustin": {
    id: "greet-agustin",
    participants: {
      player: { name: "Hornero Billete Argentino" },
      npc: { name: "Agustin", avatar: "/characters/my-emoji-no-borders.webp" },
    },
    steps: [
      {
        id: "n1",
        speaker: DialogueSpeaker.NPC,
        text: ["Hola, bienvenido!"],
        next: "n2",
      },
      {
        id: "n2",
        speaker: DialogueSpeaker.NPC,
        text: ["El Imperio Argentino 🇦🇷 te protege."],
        action: {
          type: DialogueActionType.END,
          payload: null,
        },
      },
    ],
  },
};

function ScreenFrameContent(props) {
  const frameThickness = 4;
  const screenWidth = 80;
  const screenHeight = 160;
  const frameDepth = 8;

  // Cargar la textura del emoji
  const emojiTexture = useTexture("/characters/my-emoji-no-borders.webp");

  // Calcular escala para que el emoji encaje bien en la pantalla
  const emojiAspectRatio = 300 / 350; // 0.857
  const screenAspectRatio = screenWidth / screenHeight; // 0.5

  let emojiDisplayWidth, emojiDisplayHeight;

  if (emojiAspectRatio > screenAspectRatio) {
    emojiDisplayWidth = screenWidth * 0.6;
    emojiDisplayHeight = emojiDisplayWidth / emojiAspectRatio;
  } else {
    emojiDisplayHeight = screenHeight * 0.8;
    emojiDisplayWidth = emojiDisplayHeight * emojiAspectRatio;
  }

  return (
    <group {...props}>
      {/* Marco exterior - frame border */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry
          args={[
            screenWidth + frameThickness * 2,
            screenHeight + frameThickness * 2,
            frameDepth,
          ]}
        />
        <meshStandardMaterial
          color="#d1c1c1"
          metalness={0.7}
          roughness={0.3}
          emissive="#444444"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Pantalla interior - inner screen */}
      <mesh position={[0, 0, frameDepth / 2 + 0.1]} castShadow>
        <boxGeometry args={[screenWidth, screenHeight, 0.5]} />
        <meshStandardMaterial
          color="#000815"
          metalness={0.1}
          roughness={0.1}
          emissive="#001122"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Emoji en el centro de la pantalla */}
      <mesh position={[0, 0, frameDepth / 2 + 0.6]} rotation={[0, 0, 0]}>
        <planeGeometry args={[emojiDisplayWidth, emojiDisplayHeight]} />
        <meshBasicMaterial
          map={emojiTexture}
          transparent={true}
          alphaTest={0.1}
        />
      </mesh>

      {/* Base/stand */}
      <mesh
        position={[0, -screenHeight / 2 - frameThickness - 5, -frameDepth / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[20, 10, 15]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Soporte vertical del stand */}
      <mesh
        position={[
          0,
          -screenHeight / 2 - frameThickness / 2,
          -frameDepth / 2 - 2,
        ]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3, frameThickness, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Pequeños detalles decorativos en el marco */}
      <mesh
        position={[0, screenHeight / 2 + frameThickness, frameDepth / 2 + 0.2]}
        castShadow
      >
        <boxGeometry args={[15, 1, 0.5]} />
        <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export function ScreenFrameObj(props) {
  return (
    <Suspense fallback={<ObjFallback />}>
      <ScreenFrameContent {...props} />
    </Suspense>
  );
}
