"use client";
import GameButton from "./game-button";

export default function Controls({ onMove }) {
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
