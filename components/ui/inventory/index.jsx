"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ItemGrid from "@/components/ui/inventory/item-grid";
import SpellGrid from "@/components/ui/inventory/spell-grid";
import DetailPanel from "@/components/ui/inventory/panel";
import { cn } from "@/lib/utils";
// import "./linear-gradrient.css";

export function Inventory({ items, spells }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [activeTab, setActiveTab] = useState("items");

  useEffect(() => {
    if (activeTab === "items") {
      setSelectedSpell(null);
      if (!selectedItem && items.length > 0) {
        setSelectedItem(items[0]);
      }
    } else {
      setSelectedItem(null);
      if (!selectedSpell && spells.length > 0) {
        setSelectedSpell(spells[0]);
      }
    }
  }, [activeTab, items, spells]);

  return (
    <div className={cn("grow max-w-4xl")}>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        defaultValue="items"
        className="h-full"
      >
        <div className="tab-header p-3 select-none z-40">
          <TabsList className="grid grid-cols-2 rounded-none font-cormorant">
            <TabsTrigger value="items" className="px-8 rounded-none uppercase">
              Items
            </TabsTrigger>
            <TabsTrigger value="spells" className="px-8 rounded-none uppercase">
              Spells
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="relative grid grid-cols-1 gap-2 p-4 z-40 h-full">
          <div className="inventory-scroll">
            <TabsContent value="items" className="mt-0 rounded-none h-full">
              <ItemGrid
                items={items}
                selectedItem={selectedItem}
                onSelectItem={setSelectedItem}
              />
            </TabsContent>
            <TabsContent value="spells" className="mt-0 rounded-none h-full">
              <SpellGrid
                spells={spells}
                selectedSpell={selectedSpell}
                onSelectSpell={setSelectedSpell}
              />
            </TabsContent>
          </div>

          {/* <div className="detail-panel-container border-2 border-[#282118] h-[500px] overflow-y-auto">
            <DetailPanel
              selectedItem={selectedItem}
              selectedSpell={selectedSpell}
              activeTab={activeTab}
            />
          </div> */}
        </div>
      </Tabs>
    </div>
  );
}
