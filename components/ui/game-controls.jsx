"use client";

import { useEffect } from "react";
import { GameButton } from "@/components/ui/game-button";
import { useDanceAnimation } from "@/hooks/useDanceAnimation";
import { useDialogueStore } from "@/stores/useDialogueStore";

export function Controls({ onMove, isInventoryOpen }) {
  const { startDance, stopDance } = useDanceAnimation();
  const { isDialogueActive } = useDialogueStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      // Check for dance command (OPTION+COMMAND+T)
      if (e.metaKey && key === "k") {
        startDance();
        return;
      }

      // Regular movement controls
      switch (key) {
        case "arrowup":
        case "w":
          stopDance();
          onMove("forward");
          break;
        case "arrowleft":
        case "a":
          stopDance();
          onMove("left");
          break;
        case "arrowdown":
        case "s":
          stopDance();
          onMove("backward");
          break;
        case "arrowright":
        case "d":
          stopDance();
          onMove("right");
          break;
        default:
          break;
      }
    };

    const handleMouseDown = (e) => {
      if (e.button === 0 && !isInventoryOpen && !isDialogueActive) {
        // Left click
        stopDance();
        // onCastSpell();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [onMove, isInventoryOpen, isDialogueActive, startDance, stopDance]);

  return (
    <div className="absolute bottom-5 w-full flex justify-center items-end">
      <div className="grid grid-cols-3 gap-2 w-[160px]">
        <GameButton
          id="forward"
          className="col-span-3"
          onClick={() => onMove("forward")}
        >
          ▲
        </GameButton>
        <GameButton id="left" onClick={() => onMove("left")}>
          ◀
        </GameButton>
        <GameButton id="backward" onClick={() => onMove("backward")}>
          ▼
        </GameButton>
        <GameButton id="right" onClick={() => onMove("right")}>
          ▶
        </GameButton>
      </div>
    </div>
  );
}
