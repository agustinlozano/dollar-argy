"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItemGrid } from "@/components/ui/inventory/item-grid";
import { SpellGrid } from "@/components/ui/inventory/spell-grid";
import { DetailPanel } from "@/components/ui/inventory/panel";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { BgGradient } from "@/components/ui/bg-gradient";
// import "./linear-gradrient.css";

export function Inventory({ items, spells, onClose }) {
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
    <aside className="fixed flex top-1 right-1 w-md h-[624px] overflow-hidden">
      {/* <div className="absolute inset-0 bg-[url('/textures/glitch-texture.jpg')] bg-cover opacity-90"></div> */}
      {/* <div className="absolute inset-0 bg-[url('/textures/concrete-wall-texture.jpg')] bg-cover opacity-90"></div> */}
      {/* <div className="absolute inset-0 bg-[url('/textures/concrete-scratched.jpg')] bg-cover opacity-40"></div> */}
      {/* <div className="absolute inset-0 opacity-55 texture-fade bg-[url('/textures/grunge-frame-opt.jpg')] bg-cover bg-center rounded"></div> */}
      <div className="absolute inset-0 opacity-55 z-10 texture-fade bg-[url('/textures/grunge-frame-2.png')] bg-cover bg-center rounded invert"></div>
      <BgGradient />
      <div className={cn("relative grow max-w-4xl px-6 pt-8")}>
        <div className="absolute inset-0 bg-[url('/textures/stiff-paint-opt.jpg')] bg-cover opacity-100"></div>

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-50 p-1 rounded-full border bg-card/50 hover:bg-opacity-80 transition-colors"
          >
            <X size={20} className="opacity-75" />
          </button>
        )}

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          defaultValue="items"
          className="p-0"
        >
          <div className="mx-auto select-none z-40">
            <TabsList className="grid grid-cols-2 rounded-none font-cormorant bg-card/75">
              <TabsTrigger
                value="items"
                className="px-8 rounded-none uppercase"
              >
                Items
              </TabsTrigger>
              <TabsTrigger
                value="spells"
                className="px-8 rounded-none uppercase"
              >
                Spells
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="relative grid grid-cols-1 gap-2 z-40">
            <div className="inventory-scroll">
              <TabsContent value="items" className="mt-0 rounded-none">
                <ItemGrid
                  items={items}
                  selectedItem={selectedItem}
                  onSelectItem={setSelectedItem}
                />
              </TabsContent>
              <TabsContent value="spells" className="mt-0 rounded-none">
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
    </aside>
  );
}
