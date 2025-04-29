import { useFrame } from "@react-three/fiber";
import { FoundationsRockyZone } from "./game-zone-terrain-rocky-fundations";
import { GameObjTorch } from "./game-obj-torch";
import { PlayerTorchLight } from "./game-player-torch-light";

export const FirstZone = ({ position }) => {
  // Animación o lógica para el Enclave (e.g., brillo en el mapa)
  useFrame(() => {
    // Lógica para actualizar efectos visuales, como un aura o partículas
  });

  return (
    <group position={position}>
      {/* Renderizar escenario */}
      <GameObjTorch
        initialPosition={[80, 60, 5]}
        initialRotation={[Math.PI / 2, 0, 0]}
      />
      <GameObjTorch
        initialPosition={[80, 220, 5]}
        initialRotation={[Math.PI / 2, 0, 0]}
      />
      <GameObjTorch
        initialPosition={[240, 60, 5]}
        initialRotation={[Math.PI / 2, 0, 0]}
      />
      <GameObjTorch
        initialPosition={[240, 220, 5]}
        initialRotation={[Math.PI / 2, 0, 0]}
      />
      <FoundationsRockyZone position={[0, 0, -5]} gridSize={[3, 3]} />
    </group>
  );
};
