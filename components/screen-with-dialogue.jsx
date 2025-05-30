import React, { useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import { ScreenFrameObj, DialogueWithAgustin } from "./game-obj-screen-frame";
import { ScreenFrameDialogue } from "./screen-frame-dialogue";
import { XIcon } from "./ui/icons";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useSound } from "@/hooks/useSound";
import { enviroment } from "@/lib/env-vars";

export function ScreenWithDialogue({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  dialogueId = "greet-agustin",
  onDialogueEnd,
}) {
  const { play: playChestOpen } = useSound("/sounds/ui-minimal-feedback.wav", {
    volume: 0.5,
    startTime: 2,
    endTime: 2.4,
  });

  const dialogue = DialogueWithAgustin[dialogueId];

  if (!dialogue) {
    console.warn(`Dialogue with ID "${dialogueId}" not found`);
    return (
      <ScreenFrameObj position={position} rotation={rotation} scale={scale} />
    );
  }

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <ScreenFrameObj position={[0, 0, 0]} scale={scale} />
      <ScreenFrameDialogue
        dialogue={dialogue}
        position={[10, 0, -50]}
        speaker={dialogue.participants.npc.name}
        onDialogueEnd={onDialogueEnd}
      />

      {/* Botón de perfil de Twitter */}
      <Html position={[0, -35, 10]} transform center distanceFactor={100}>
        <Popover
          onOpenChange={(open) => {
            if (!open) return;
            playChestOpen();
          }}
        >
          <PopoverTrigger asChild>
            <button
              className="size-12 bg-background border-2 rounded-full flex items-center justify-center transition-colors hover:ring-2 hover:ring-amber-700/80 focus:outline-none"
              type="button"
            >
              <XIcon className="size-5 text-amber-100" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="flex gap-x-4 items-center w-64 bg-black/90 border-amber-500/30 backdrop-blur-md">
            <div>
              <img
                src={
                  enviroment === "development"
                    ? "/characters/butters.jpg"
                    : "https://pbs.twimg.com/profile_images/1874790612605538304/DV_71ZqI_400x400.jpg"
                }
                alt="Agustin's Twitter profile picture"
                className="size-20 rounded-md object-cover"
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs text-primary/75 text-balance">
                Guy from 🇦🇷 Argentina doin' software.
              </p>
              <div className="space-y-2">
                <a
                  href="https://x.com/gustinlzn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 bg-amber-600/10 hover:bg-amber-600/20 border border-amber-500/20 rounded text-amber-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <XIcon className="size-4" />
                    <span className="text-sm text-primary/75">@gustinlzn</span>
                  </div>
                </a>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Html>
    </group>
  );
}
