import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";
import { useInventoryStore } from "@/stores/useInventoryState";

import "./game-found-tracker.css";

export function FoundTracker() {
  const { getQuantity } = useInventoryStore();
  const found = getQuantity("gold_coins");

  return (
    <div className="relative flex gap-x-4 justify-between items-center z-10 px-4">
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
          "rounded bg-accent-foreground/75 h-8 w-full flex items-center justify-center -z-10"
        )}
      />
      <div
        id="found-tacker-coin-icon"
        className={cn(
          "coin-3d relative size-12 rounded-full border border-dashed border-yellow-700 bg-yellow-400 text-yellow-900 flex items-center justify-center"
        )}
      >
        <DollarSign className="z-10" />
      </div>

      <div
        aria-label="amount"
        className="flex items-center gap-2 font-bold text-accent text-lg"
      >
        <span>{found || 0}</span>
      </div>
    </div>
  );
}
