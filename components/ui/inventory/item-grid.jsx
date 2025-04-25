"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ItemCard from "@/components/ui/inventory/item-card";

export default function ItemGrid({ items, selectedItem, onSelectItem }) {
  return (
    <div className="relative">
      <h2 className="text-xl font-bold mb-4">Inventory</h2>
      <ScrollArea className="h-[450px]">
        <div className="grid grid-cols-3 gap-2 select-none">
          {items.map((item) => (
            <ItemCard
              key={item.slug}
              item={item}
              isSelected={selectedItem?.slug === item.slug}
              onSelect={() => onSelectItem(item)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
