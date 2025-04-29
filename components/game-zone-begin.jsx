import { useFrame } from "@react-three/fiber";
import { HexagonalRockyZone } from "./game-zone-terrain-hexagon-rocky-grid";

export const FirstZone = ({ position }) => {
  // Animación o lógica para el Enclave (e.g., brillo en el mapa)
  useFrame(() => {
    // Lógica para actualizar efectos visuales, como un aura o partículas
  });

  return (
    <group position={position}>
      {/* Renderizar escenario */}
      <HexagonalRockyZone position={[0, 0, -5]} gridSize={[3, 3]} />
    </group>
  );
};
