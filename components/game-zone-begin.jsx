import { Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { FoundationsRockyZone } from "./game-zone-terrain-rocky-fundations";
import { TorchLight } from "./game-light-torch";
import { DialogueTrigger } from "./dialogue-trigger";
import { dialogues } from "@/lib/dialogues";
import { GrumpyManObj } from "./game-obj-grumpy-man";
import { ObjFallback } from "./game-obj-fallback";

export function FirstZone({ position = [0, 0, 0] }) {
  // Animación o lógica para el Enclave (e.g., brillo en el mapa)
  useFrame(() => {
    // Lógica para actualizar efectos visuales, como un aura o partículas
  });

  return (
    <group position={position}>
      <group position={[0, -150, 0]}>
        {/* <TorchLight
          decay={1.2}
          position={[85, 60, 20]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <TorchLight
          decay={1.2}
          position={[85, 210, 20]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <TorchLight
          decay={1.2}
          position={[230, 60, 20]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <TorchLight
          decay={1.2}
          position={[230, 210, 20]}
          rotation={[Math.PI / 2, 0, 0]}
        /> */}
      </group>
      <FoundationsRockyZone position={[0, -150, -5]} gridSize={[3, 3]} />

      <DialogueTrigger
        dialogueId={dialogues["greet-grumpy-man"].id}
        position={[150, 0, 0]}
        interactionDistance={100}
      >
        <Suspense
          fallback={
            <ObjFallback position={[0, 0, 8]} rotation={[0, 0, Math.PI]} />
          }
        >
          <GrumpyManObj position={[0, 0, 8]} rotation={[0, 0, Math.PI]} />
        </Suspense>
      </DialogueTrigger>
    </group>
  );
}
