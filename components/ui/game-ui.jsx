import { useEffect, useState } from "react";

import { Controls } from "./game-controls";
import { Inventory } from "./inventory/inventory";
import { FoundTracker } from "./game-found-tracker";
import { InventoryToggleButton } from "./inventory/inventory-toggle-button";
import { MetallicDialogueMenu } from "./metallic-dialogue-menu";

import { useGameStore } from "@/stores/useGameState";
import { useInventoryStore } from "@/stores/useInventoryState";

// Import sample items and spells
import * as offensiveSpells from "@/lib/spells.offensives";
import * as defensiveSpells from "@/lib/spells.defensives";
import * as buffSpells from "@/lib/spells.buffs";
import * as consumables from "@/lib/items.consumable";
import * as magicItems from "@/lib/items.magic";

import { GothicButton } from "./gothic-button";
import { DialogueWrapper } from "./dialogue-wrapper";
import { sleep } from "@/lib/utils";

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
  // Estado para controlar la visibilidad del diálogo
  const [showDialogue, setShowDialogue] = useState(false); // Hardcodeado a true para mostrar inmediatamente

  useEffect(() => {
    sleep(2000).then(() => {
      setShowDialogue(true);
    });
  }, []);

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
      {/* Background overlay */}
      {isInventoryOpen && (
        <div
          role="presentation"
          className="pointer-events-none absolute inset-0 bg-black/50"
          onClick={onInventoryToggle}
        ></div>
      )}
      {/* Top UI Elements */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-start">
        <div className="flex items-start gap-4">
          <FoundTracker />
        </div>
        <div className="flex items-start gap-2">
          <InventoryToggleButton
            onClick={onInventoryToggle}
            isOpen={isInventoryOpen}
          >
            Inventory
          </InventoryToggleButton>
          <GothicButton variant="silver">Quests</GothicButton>
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

      {/* Dialogue - MetallicDialogueMenu con animación simplificada */}
      <div
        className={`fixed left-1/2 transform -translate-x-1/2 z-50 max-w-3xl w-full ${
          showDialogue
            ? "animate-in fade-in slide-in-from-bottom duration-300 fill-mode-forwards ease-out"
            : "animate-out fade-out slide-out-to-bottom duration-300 fill-mode-forwards ease-in"
        }`}
        style={{
          bottom: "calc(100vh / 6)",
          width: "90%",
          maxWidth: "800px",
          pointerEvents: showDialogue ? "auto" : "none",
        }}
      >
        <MetallicDialogueMenu
          dialogueText="¡Bienvenido a mi mundo! Soy un NPC con características humanas y estoy aquí para ayudarte en tu aventura."
          characterName="Humano NPC"
          variant="silver"
          onClose={() => {
            setShowDialogue(false);
          }}
        />
      </div>

      {/* Inventory Modal */}
      {isInventoryOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-50">
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
