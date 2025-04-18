import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";
import { useInventoryStore } from "@/stores/useInventoryState";

import "./game-found-tracker.css";

export function FoundTracker() {
  const { getQuantity } = useInventoryStore();
  const found = getQuantity("gold_coins");

  return (
    <div className="absolute top-5 right-[21rem]">
      <div className="flex gap-x-4 justify-between items-center z-10">
        <div
          id="found-tacker-coin-icon"
          className={cn(
            "coin-3d relative size-12 rounded-full border-2 border-dashed border-yellow-700 bg-yellow-400 text-yellow-900 flex items-center justify-center"
          )}
        >
          <DollarSign className="z-10" />
        </div>

        <div
          aria-label="amount"
          className="flex items-center gap-2 font-bold text-accent"
        >
          <span>{found || 0}</span>
        </div>
      </div>
    </div>
  );
}
