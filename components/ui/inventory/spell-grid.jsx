"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import SpellCard from "@/components/ui/inventory/spell-card";

export default function SpellGrid({ spells, selectedSpell, onSelectSpell }) {
  return (
    <div className="relative flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">Spellbook</h2>
      <ScrollArea className="grow h-[450px] pr-4">
        <div className="grid grid-cols-3 gap-2  select-none">
          {spells.map((spell) => (
            <SpellCard
              key={spell.slug}
              spell={spell}
              isSelected={selectedSpell?.slug === spell.slug}
              onSelect={() => onSelectSpell(spell)}
              className="rounded-none"
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
