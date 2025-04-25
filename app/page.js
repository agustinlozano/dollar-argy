import { DollarArgyGame } from "@/components/game";

import * as offensiveSpells from "@/lib/spells.offensives";
import * as defensivesSpells from "@/lib/spells.defensives";
import * as consumables from "@/lib/items.consumable";
import * as magicItems from "@/lib/items.magic";

import { Inventory } from "@/components/ui/inventory/index";
import { BgGradient } from "@/components/ui/bg-gradient";

import "./styles/texture-effects.css";

export default function Home() {
  console.log([
    ...Object.values(offensiveSpells),
    ...Object.values(defensivesSpells),
  ]);

  const items = [...Object.values(consumables), ...Object.values(magicItems)];
  const spells = [
    ...Object.values(offensiveSpells),
    ...Object.values(defensivesSpells),
  ];

  console.log([...Object.values(consumables), ...Object.values(magicItems)]);
  return (
    <main className="flex flex-col items-center justify-center bg-white">
      <DollarArgyGame />
      <aside className="fixed flex top-1 right-1 w-md h-[624px] overflow-hidden">
        {/* <div className="absolute inset-0 bg-[url('/textures/glitch-texture.jpg')] bg-cover opacity-90"></div> */}
        {/* <div className="absolute inset-0 bg-[url('/textures/concrete-wall-texture.jpg')] bg-cover opacity-90"></div> */}
        {/* <div className="absolute inset-0 bg-[url('/textures/concrete-scratched.jpg')] bg-cover opacity-40"></div> */}
        {/* <div className="absolute inset-0 opacity-55 texture-fade bg-[url('/textures/grunge-frame-opt.jpg')] bg-cover bg-center rounded"></div> */}
        <div className="absolute inset-0 opacity-55 z-10 texture-fade bg-[url('/textures/grunge-frame-2.png')] bg-cover bg-center rounded invert"></div>
        <BgGradient />
        <Inventory items={items} spells={spells} />
      </aside>
    </main>
  );
}
