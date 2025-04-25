"use client";

import { useState, useEffect } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SpellCard } from "@/components/ui/inventory/spell-card";
import { cn } from "@/lib/utils";

export function SpellGrid({ spells, selectedSpell, onSelectSpell }) {
  // Keep a local copy of spells to avoid unnecessary re-renders
  const [localSpells, setLocalSpells] = useState(spells);

  // Use the useDragAndDrop hook to manage our draggable spells
  const [parentRef, draggedSpells, setDraggedSpells] = useDragAndDrop(
    localSpells,
    {
      sortable: true,
      // Add some drag styling options
      dragClass: "opacity-50 scale-[1.02] shadow-md z-10",
      dropClass: "bg-[#3a3124]/20",
      handle: false, // allow dragging from anywhere on the item
    }
  );

  // Update local spells when props change
  useEffect(() => {
    if (JSON.stringify(localSpells) !== JSON.stringify(spells)) {
      setLocalSpells(spells);
    }
  }, [spells, localSpells]);

  // Update parent component when spell order changes
  useEffect(() => {
    // This would be the place to notify the parent component
    // about the new order if needed
    // For now we're just internally managing the order
  }, [draggedSpells]);

  return (
    <div className="relative mt-3">
      <h2 className="text-xl font-bold mb-1 font-cormorant">Spellbook</h2>
      <ScrollArea className="grow h-[420px]">
        <div ref={parentRef} className="grid grid-cols-3 gap-2 select-none">
          {draggedSpells.map((spell) => (
            <div
              key={spell.slug}
              className="cursor-move group"
              data-draggable
              data-id={spell.slug}
            >
              <div className="transition-all duration-150 group-hover:scale-[1.02]">
                <SpellCard
                  spell={spell}
                  isSelected={selectedSpell?.slug === spell.slug}
                  onSelect={() => onSelectSpell(spell)}
                  className={cn(
                    "rounded-none",
                    "ring-0 group-hover:ring-1 group-hover:ring-[#9059c9]/30"
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
