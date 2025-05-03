import { cn } from "@/lib/utils";
import { Backpack } from "lucide-react";

import "./inventory-toggle-button.css";

export function InventoryToggleButton({ children, onClick, isOpen }) {
  return (
    <div className="relative flex gap-x-4 justify-between items-center z-10">
      <button
        onClick={onClick}
        className={cn(
          "inventory-button-3d font-cormorant relative px-4 py-2 border-b bg-purple-200 flex items-center justify-center",
          isOpen && "active"
        )}
      >
        {children}
      </button>
    </div>
  );
}
