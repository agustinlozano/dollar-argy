export function MoneyChest({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Base del cofre */}
      <mesh castShadow receiveShadow position={[0, 0, 10]}>
        <boxGeometry args={[30, 20, 20]} />
        <meshLambertMaterial color="#8B5E3C" flatShading />
      </mesh>

      {/* Tapa del cofre */}
      <mesh castShadow receiveShadow position={[0, 0, 23]}>
        <boxGeometry args={[30, 20, 6]} />
        <meshLambertMaterial color="#A97452" flatShading />
      </mesh>

      {/* Cerradura */}
      <mesh position={[0, -10, 15]}>
        <boxGeometry args={[4, 4, 6]} />
        <meshLambertMaterial color="#FFD700" flatShading />
      </mesh>
    </group>
  );
}
