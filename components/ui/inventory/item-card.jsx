"use client";

import { cn } from "@/lib/utils";
import {
  PillBottleIcon as Potion,
  Sword,
  Shield,
  Scroll,
  Gem,
  Skull,
} from "lucide-react";

export default function ItemCard({ item, isSelected, onSelect }) {
  const getItemIcon = () => {
    switch (item.category) {
      case "potion":
        return <Potion className="h-6 w-6 stroke-1" />;
      case "weapon":
        return <Sword className="h-6 w-6 stroke-1" />;
      case "armor":
        return <Shield className="h-6 w-6 stroke-1" />;
      case "scroll":
        return <Scroll className="h-6 w-6 stroke-1" />;
      case "amulet":
        return <Gem className="h-6 w-6 stroke-1" />;
      default:
        return <Skull className="h-6 w-6 stroke-1" />;
    }
  };

  const getItemTypeColor = () => {
    if (item.type.includes("consumable")) return "text-emerald-500";
    if (item.type.includes("equipable")) return "text-amber-500";
    return "text-[#c9a959]";
  };

  return (
    <div
      className={cn(
        "relative cursor-pointer",
        // "bg-[url('/textures/item-bg.png')] bg-cover bg-center",
        "border overflow-hidden",
        isSelected
          ? "shadow-[0_0_6px_rgba(201,169,89,0.5)]"
          : "border hover:border-stone-700"
      )}
      onClick={onSelect}
    >
      <div className="p-3 h-[120px] flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <div className={cn("p-1 bg-[#1a1510]", getItemTypeColor())}>
            {getItemIcon()}
          </div>
        </div>
        <h3 className="text-sm font-bold text-[#e0d5b8] line-clamp-1 font-cormorant uppercase">
          {item.name}
        </h3>
        <p className="text-xs text-[#a3a090] line-clamp-2 mt-1">
          {item.description}
        </p>
      </div>
      {isSelected && (
        <div className="absolute inset-0 border border-stone-600 pointer-events-none"></div>
      )}
    </div>
  );
}
