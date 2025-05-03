import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import { useGameStore } from "@/stores/useGameState";

import "./game-torch-toggle.css";

export function TorchToggleButton() {
  const isTorchActive = useGameStore((state) => state.isTorchActive);
  const toggleTorch = useGameStore((state) => state.toggleTorch);

  return (
    <div className="relative flex gap-x-4 justify-between items-center z-10">
      <button
        onClick={toggleTorch}
        className={cn(
          "torch-button-3d relative size-10 rounded-full border-2 border-dashed border-[#992200] bg-[#f86800] text-[#992200] flex items-center justify-center",
          isTorchActive && "active"
        )}
        title={isTorchActive ? "Turn off torch" : "Turn on torch"}
      >
        <Flame className="z-10 size-6" />
      </button>
    </div>
  );
}
