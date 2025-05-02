import { useEffect } from "react";

import { Controls } from "./game-controls";
import { Inventory } from "./inventory/inventory";
import { FoundTracker } from "./game-found-tracker";
import { TorchToggleButton } from "./game-torch-toggle";
import { InventoryToggleButton } from "./inventory/inventory-toggle-button";
import { DialogueMenu } from "./dialogue-menu";

import { useGameStore } from "@/stores/useGameState";
import { useInventoryStore } from "@/stores/useInventoryState";

// Import sample items and spells
import * as offensiveSpells from "@/lib/spells.offensives";
import * as defensiveSpells from "@/lib/spells.defensives";
import * as buffSpells from "@/lib/spells.buffs";
import * as consumables from "@/lib/items.consumable";
import * as magicItems from "@/lib/items.magic";
import { BgGradient } from "./bg-gradient";

export function GameUI({
  items,
  spells,
  isInventoryOpen,
  onInventoryToggle,
  onMove,
  onCastSpell,
}) {
  const addToInventory = useInventoryStore((state) => state.addNew);
  const initializeRows = useGameStore((state) => state.initializeRows);

  // Initialize rows when the component mounts
  useEffect(() => {
    initializeRows();

    // Add some sample items and spells for testing
    const sampleItems = [
      ...Object.values(consumables),
      ...Object.values(magicItems),
    ];
    const sampleSpells = [
      ...Object.values(offensiveSpells).slice(0, 2),
      ...Object.values(defensiveSpells).slice(0, 2),
      ...Object.values(buffSpells).slice(0, 2),
    ];

    // Add items and spells to inventory using the new method
    sampleItems.forEach((item) => addToInventory(item));
    sampleSpells.forEach((spell) => addToInventory(spell));
  }, [initializeRows, addToInventory]);

  // Add ESC key handler to close inventory
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isInventoryOpen) {
        onInventoryToggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInventoryOpen, onInventoryToggle]);

  return (
    <>
      {/* Top UI Elements */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-start">
        <div className="flex items-start gap-4">
          <FoundTracker />
        </div>
        <div className="flex items-start gap-4">
          <TorchToggleButton />
          <InventoryToggleButton
            onClick={onInventoryToggle}
            isOpen={isInventoryOpen}
          />
        </div>
      </div>

      {/* Center UI Elements */}
      <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
        <Controls
          onMove={onMove}
          onCastSpell={onCastSpell}
          isInventoryOpen={isInventoryOpen}
        />
      </div>

      {/* Dialogue */}
      {/* create a fixed position on the center of the screen */}
      <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center">
        <div className="relative z-10">
          <BgGradient className="-z-10" />
          <div
            role="presentation"
            className="pointer-events-none absolute inset-0 opacity-55 z-10 texture-fade bg-[url('/textures/grunge-frame-3.1.png')] bg-cover bg-center rounded invert"
          ></div>
          <DialogueMenu />
        </div>
      </div>

      {/* Inventory Modal */}
      {isInventoryOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-50">
          {/* Background overlay */}
          <div
            role="presentation"
            className="pointer-events-none absolute inset-0 bg-black/50"
            onClick={onInventoryToggle}
          ></div>
          <div className="relative z-10">
            <Inventory
              items={items}
              spells={spells}
              onClose={onInventoryToggle}
            />
          </div>
        </div>
      )}
    </>
  );
}
