"use client";
import { useState } from "react";
import Controls from "@/components/game-controls";
import Score from "@/components/game-score";
import GameOverModal from "@/components/game-over";

export default function GamePage() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleMove = (direction) => {
    console.log("Moving:", direction);
    setScore((prev) => prev + 1);
  };

  const handleRetry = () => {
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="relative w-full h-screen bg-background text-foreground overflow-hidden">
      <Score value={score} />
      <Controls onMove={handleMove} />
      <GameOverModal score={score} visible={gameOver} onRetry={handleRetry} />
    </div>
  );
}
