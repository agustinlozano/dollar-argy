import { cn } from "@/lib/utils";
import { Backpack } from "lucide-react";

import "./inventory-toggle-button.css";

export function InventoryToggleButton({ onClick, isOpen }) {
  return (
    <div className="relative flex gap-x-4 justify-between items-center z-10 px-4">
      <button
        onClick={onClick}
        className={cn(
          "inventory-button-3d relative size-12 rounded-full border-2 border-dashed border-[#352879] bg-[#f8d800] text-[#352879] flex items-center justify-center",
          isOpen && "active"
        )}
      >
        <Backpack className="z-10 size-6" />
      </button>
    </div>
  );
}
