"use client";

import { cn } from "@/lib/utils";
import { Flame, Zap, Shield, Sparkles, Target, Skull } from "lucide-react";

export default function SpellCard({ spell, isSelected, onSelect }) {
  const getSpellIcon = () => {
    switch (spell.type) {
      case "offensive-spell":
        return <Flame className="h-6 w-6 text-[#d45050] stroke-1" />;
      case "defensive-spell":
        return <Shield className="h-6 w-6 text-[#5080d4] stroke-1" />;
      case "utility-spell":
        return <Sparkles className="h-6 w-6 text-[#50d4a0] stroke-1" />;
      case "buff-spell":
        return <Zap className="h-6 w-6 text-[#d4c050] stroke-1" />;
      default:
        return <Skull className="h-6 w-6 stroke-1" />;
    }
  };

  const getTargetingIcon = () => {
    if (spell.targeting === "area") {
      return <Target className="h-4 w-4 text-[#a3a090]" />;
    }
    return null;
  };

  return (
    <div
      className={cn(
        "relative cursor-pointer transition-all",
        // "bg-[url('/textures/spell-bg.png')] bg-cover bg-center",
        "border overflow-hidden",
        isSelected
          ? "border-[#9059c9] shadow-[0_0_12px_rgba(144,89,201,0.5)]"
          : "border-[#3a3124] hover:border-[#5a4a34]"
      )}
      onClick={onSelect}
    >
      <div className="p-3 h-[120px] flex flex-col bg-card/20 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-1">
          <div className="p-1 bg-[#1a1510]">{getSpellIcon()}</div>
          <div className="flex items-center gap-1">
            {getTargetingIcon()}
            <span className="text-xs font-bold text-[#9059c9]">
              {spell.manaCost}
            </span>
          </div>
        </div>
        <h3 className="text-sm font-bold text-[#e0d5b8] line-clamp-1 font-cormorant uppercase">
          {spell.name}
        </h3>
        <p className="text-xs text-[#a3a090] line-clamp-2 mt-1">
          {spell.description}
        </p>
      </div>
      {isSelected && (
        <div className="absolute inset-0 border border-[#9059c9] pointer-events-none"></div>
      )}
    </div>
  );
}
