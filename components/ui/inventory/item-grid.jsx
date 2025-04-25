"use client";

import { ItemCard } from "@/components/ui/inventory/item-card";
import { DraggableGrid } from "@/components/ui/inventory/draggable-grid";

export function ItemGrid({ items, selectedItem, onSelectItem }) {
  return (
    <DraggableGrid
      items={items}
      title="Inventory"
      selectedItem={selectedItem}
      onSelectItem={onSelectItem}
      CardComponent={ItemCard}
      draggable={true}
    />
  );
}
