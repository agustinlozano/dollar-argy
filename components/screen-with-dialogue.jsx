import React from "react";
import { ScreenFrameObj, DialogueWithAgustin } from "./game-obj-screen-frame";
import { ScreenFrameDialogue } from "./screen-frame-dialogue";

export function ScreenWithDialogue({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  dialogueId = "greet-agustin",
  onDialogueEnd,
}) {
  const dialogue = DialogueWithAgustin[dialogueId];

  if (!dialogue) {
    console.warn(`Dialogue with ID "${dialogueId}" not found`);
    return (
      <ScreenFrameObj position={position} rotation={rotation} scale={scale} />
    );
  }

  // Calcular posición del diálogo relativa a la pantalla
  const [x, y, z] = position;
  const dialoguePosition = [x + 50, y + 50, z + 20];

  return (
    <group>
      <ScreenFrameObj position={position} rotation={rotation} scale={scale} />
      <ScreenFrameDialogue
        dialogue={dialogue}
        position={dialoguePosition}
        speaker={dialogue.participants.npc.name}
        onDialogueEnd={onDialogueEnd}
      />
    </group>
  );
}
