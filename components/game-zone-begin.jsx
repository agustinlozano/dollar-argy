import { useFrame } from "@react-three/fiber";
import { FoundationsRockyZone } from "./game-zone-terrain-rocky-fundations";
import { TorchLight } from "./game-light-torch";
import { HumanNPCObject } from "./game-obj-human-npc";

export const FirstZone = ({ position }) => {
  // Animación o lógica para el Enclave (e.g., brillo en el mapa)
  useFrame(() => {
    // Lógica para actualizar efectos visuales, como un aura o partículas
  });

  return (
    <group position={position}>
      <group position={[0, -150, 0]}>
        <TorchLight position={[85, 60, 20]} rotation={[Math.PI / 2, 0, 0]} />
        <TorchLight position={[85, 210, 20]} rotation={[Math.PI / 2, 0, 0]} />
        <TorchLight position={[230, 60, 20]} rotation={[Math.PI / 2, 0, 0]} />
        <TorchLight position={[230, 210, 20]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <FoundationsRockyZone position={[0, -150, -5]} gridSize={[3, 3]} />
      <HumanNPCObject position={[150, 0, 8]} rotation={[0, 0, Math.PI]} />
    </group>
  );
};
