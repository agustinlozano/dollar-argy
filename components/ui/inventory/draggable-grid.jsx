"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { cn } from "@/lib/utils";
import "./fade-to-bottom.css";

export function DraggableGrid({
  items,
  title,
  selectedItem,
  onSelectItem,
  CardComponent,
  draggable = false,
  className,
}) {
  // Keep a local copy of items to avoid unnecessary re-renders
  const [localItems, setLocalItems] = useState(items);

  // Set up drag and drop if enabled
  const [parentRef, draggedItems, setDraggedItems] = useDragAndDrop(
    localItems,
    {
      sortable: draggable,
      // Add some drag styling options
      dragClass: "opacity-50 scale-[1.02] shadow-md z-10",
      dropClass: "bg-[#3a3124]/20",
      handle: false,
    }
  );

  // Update local items when props change
  useEffect(() => {
    if (JSON.stringify(localItems) !== JSON.stringify(items)) {
      setLocalItems(items);
    }
  }, [items, localItems]);

  // Determine which items array to use based on whether dragging is enabled
  const displayItems = draggable ? draggedItems : items;

  return (
    <div className={cn("relative mt-3", className)}>
      <h2 className="text-xl font-bold mb-1 font-cormorant">{title}</h2>
      <ScrollArea className="grow h-[490px]">
        <div className={cn(draggable && "p-1 fade-to-bottom")}>
          <div
            ref={draggable ? parentRef : null}
            className="grid grid-cols-3 gap-2 select-none"
          >
            {displayItems.map((item, index) => (
              <div
                key={item.slug}
                className={cn(draggable && "cursor-move group")}
                data-draggable={draggable ? "true" : undefined}
                data-id={item.slug}
              >
                <div
                  className={cn(
                    draggable &&
                      "transition-all duration-150 group-hover:scale-[1.02]"
                  )}
                >
                  <CardComponent
                    {...(item.type?.includes("spell")
                      ? { spell: item }
                      : { item })}
                    isSelected={selectedItem?.slug === item.slug}
                    onSelect={() => onSelectItem(item)}
                    className={cn(
                      "rounded-none",
                      draggable &&
                        "ring-0 group-hover:ring-1 group-hover:ring-[#9059c9]/30"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
