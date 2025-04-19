import { useInventoryStore } from "@/stores/useInventoryState";
import { InventoryMenu } from "@/components/ui/inventory";

export function GameInventory() {
  const { items, spells } = useInventoryStore();

  return (
    <div className="absolute top-5 right-5 z-10">
      <InventoryMenu items={items} spells={spells} />
    </div>
  );
}
