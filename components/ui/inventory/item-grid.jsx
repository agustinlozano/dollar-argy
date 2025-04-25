"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ItemCard from "@/components/ui/inventory/item-card";

export default function ItemGrid({ items, selectedItem, onSelectItem }) {
  return (
    <div className="relative mt-3">
      <h2 className="text-xl font-bold mb-1 font-cormorant">Inventory</h2>
      <ScrollArea className="h-[420px]">
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
