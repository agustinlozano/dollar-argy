import { Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { FoundationsOvalZone } from "./game-zone-terrain-oval-foundations";
import { TorchLight } from "./game-light-torch";
import { DialogueTrigger } from "./dialogue-trigger";
import { dialogues } from "@/lib/dialogues";
import { HologramMadwoman } from "./game-obj-mad-hologram-woman";
import { ObjFallback } from "./game-obj-fallback";

export const SanctuaryZone = ({ position }) => {
  // Animation logic for the Sanctuary (e.g., gentle glow effects)
  useFrame(() => {
    // Logic for updating visual effects, like ambient lighting or particle systems
  });

  return (
    <group position={position}>
      <group position={[0, -150, 0]}>
        {/* Softer torch lighting arrangement for sanctuary atmosphere */}
        <TorchLight position={[100, 80, 25]} rotation={[Math.PI / 2, 0, 0]} />
        <TorchLight position={[100, 190, 25]} rotation={[Math.PI / 2, 0, 0]} />
        <TorchLight position={[215, 80, 25]} rotation={[Math.PI / 2, 0, 0]} />
        <TorchLight position={[215, 190, 25]} rotation={[Math.PI / 2, 0, 0]} />
      </group>

      {/* Use the new oval foundations */}
      <FoundationsOvalZone position={[0, -150, -5]} gridSize={[3, 3]} />

      <DialogueTrigger
        dialogueId={dialogues["greet-mad-hologram-woman"].id}
        position={[150, 0, 0]}
        interactionDistance={100}
      >
        <Suspense
          fallback={
            <ObjFallback position={[0, 0, 8]} rotation={[0, 0, Math.PI]} />
          }
        >
          <HologramMadwoman position={[0, 0, 8]} rotation={[0, 0, Math.PI]} />
        </Suspense>
      </DialogueTrigger>
    </group>
  );
};
