"use client";

import { useEffect } from "react";
import GameButton from "./game-button";

export function Controls({ onMove }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      switch (key) {
        case "arrowup":
        case "w":
          onMove("forward");
          break;
        case "arrowleft":
        case "a":
          onMove("left");
          break;
        case "arrowdown":
        case "s":
          onMove("backward");
          break;
        case "arrowright":
        case "d":
          onMove("right");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onMove]);

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
