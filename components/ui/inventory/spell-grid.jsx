"use client";

import { SpellCard } from "@/components/ui/inventory/spell-card";
import { DraggableGrid } from "@/components/ui/inventory/draggable-grid";

export function SpellGrid({ spells, selectedSpell, onSelectSpell }) {
  return (
    <DraggableGrid
      items={spells}
      title="Spellbook"
      selectedItem={selectedSpell}
      onSelectItem={onSelectSpell}
      CardComponent={SpellCard}
      draggable={true}
    />
  );
}
