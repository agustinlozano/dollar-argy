import { DollarArgyGame } from "@/components/game";

import * as offensiveSpells from "@/lib/spells.offensives";
import * as defensivesSpells from "@/lib/spells.defensives";
import * as consumables from "@/lib/items.consumable";
import * as magicItems from "@/lib/items.magic";

export default function Home() {
  console.log([
    ...Object.values(offensiveSpells),
    ...Object.values(defensivesSpells),
  ]);

  console.log([...Object.values(consumables), ...Object.values(magicItems)]);
  return (
    <main className="flex flex-col items-center justify-center">
      <DollarArgyGame />
    </main>
  );
}
