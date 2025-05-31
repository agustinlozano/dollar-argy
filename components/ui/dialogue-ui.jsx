import React from "react";
import { useDialogueStore } from "@/stores/useDialogueStore";
import { MetallicDialogueMenu } from "./dialogue-menu";
import { DialogueSpeaker } from "@/lib/dialogue.consts";

export function DialogueUI() {
  const {
    activeDialogue,
    currentStep,
    isDialogueActive,
    nextStep,
    endDialogue,
  } = useDialogueStore();

  if (!isDialogueActive || !activeDialogue || !currentStep) {
    return null;
  }

  const dialogueText = Array.isArray(currentStep.text)
    ? currentStep.text.join("\n\n")
    : currentStep.text;

  const isPlayerSpeaking = currentStep.speaker === DialogueSpeaker.PLAYER;

  // Get the character info based on who's speaking
  const characterInfo = isPlayerSpeaking
    ? activeDialogue.participants.player
    : activeDialogue.participants.npc;

  // Default to a placeholder if no image provided
  const characterImage = characterInfo.avatar
    ? `/characters/${characterInfo.avatar}`
    : "/characters/hornero-portrait.png";

  // Handle dialogue advancement
  const handleContinue = () => {
    nextStep();
  };

  // Handle dialogue closing
  const handleClose = () => {
    endDialogue();
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center z-50 pointer-events-none">
      <div className="pointer-events-auto">
        <MetallicDialogueMenu
          dialogueText={dialogueText}
          characterImage={characterImage}
          characterName={characterInfo.name}
          variant={"brown"}
          onClose={handleClose}
          onClick={handleContinue}
        />
      </div>
    </div>
  );
}
