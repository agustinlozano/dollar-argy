"use client";
import { GameButton } from "@/components/ui/game-button";

export default function GameOverModal({ score, onRetry, visible }) {
  return (
    <div
      className={`
        absolute inset-0 flex items-center justify-center
        transition-opacity duration-300
        ${visible ? "visible opacity-100" : "invisible opacity-0"}
      `}
    >
      <div className="bg-card text-foreground p-6 flex flex-col items-center gap-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">Game Over</h1>
        <p className="text-lg">
          Your score: <span className="font-mono">{score}</span>
        </p>
        <GameButton
          className="bg-destructive text-destructive-foreground px-12 py-4 text-lg"
          onClick={onRetry}
        >
          Retry
        </GameButton>
      </div>
    </div>
  );
}
