"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItemGrid } from "@/components/ui/inventory/item-grid";
import { SpellGrid } from "@/components/ui/inventory/spell-grid";
import { BgGradient } from "@/components/ui/bg-gradient";
import { CloseButton } from "@/components/ui/close-button";
import { useSound } from "@/hooks/useSound";
import { cn } from "@/lib/utils";
// import "./linear-gradrient.css";

export function Inventory({ items, spells, onClose }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [activeTab, setActiveTab] = useState("items");
  const { play: playUiSound } = useSound("/sounds/ui-minimal-feedback.wav", {
    volume: 0.5,
    startTime: 2,
    endTime: 2.4,
  });

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
    <aside className="fixed flex top-14 right-3 w-md h-[624px] overflow-hidden">
      {/* <div className="absolute inset-0 bg-[url('/textures/glitch-texture.jpg')] bg-cover opacity-90"></div> */}
      {/* <div className="absolute inset-0 bg-[url('/textures/concrete-wall-texture.jpg')] bg-cover opacity-90"></div> */}
      {/* <div className="absolute inset-0 bg-[url('/textures/concrete-scratched.jpg')] bg-cover opacity-40"></div> */}
      {/* <div className="absolute inset-0 opacity-55 texture-fade bg-[url('/textures/grunge-frame-opt.jpg')] bg-cover bg-center rounded"></div> */}
      <div className="absolute inset-0 opacity-55 z-10 texture-fade bg-[url('/textures/grunge-frame-2.png')] bg-cover bg-center rounded invert"></div>
      <BgGradient />
      <div className={cn("relative grow max-w-4xl px-6 pt-8")}>
        <div
          className="absolute inset-0 bg-[url('/textures/stiff-paint-opt.jpg')] bg-cover opacity-100"
          style={{ filter: "hue-rotate(100deg) brightness(90%)" }}
        ></div>

        {onClose && <CloseButton onClick={onClose} />}

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            playUiSound();
            setActiveTab(value);
          }}
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
                {items?.length === 0 ? (
                  <div className="text-center text-lg text-muted-foreground mt-10 font-cormorant">
                    No items in inventory
                  </div>
                ) : (
                  <ItemGrid
                    items={items}
                    selectedItem={selectedItem}
                    onSelectItem={setSelectedItem}
                  />
                )}
              </TabsContent>
              <TabsContent value="spells" className="mt-0 rounded-none">
                {spells?.length === 0 ? (
                  <div className="text-center text-lg text-muted-foreground mt-10 font-cormorant">
                    No spells in inventory
                  </div>
                ) : (
                  <SpellGrid
                    spells={spells}
                    selectedSpell={selectedSpell}
                    onSelectSpell={setSelectedSpell}
                  />
                )}
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
