export function RewardVoucher({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Papel principal */}
      <mesh castShadow receiveShadow position={[0, 0, 2]}>
        <boxGeometry args={[20, 12, 2]} />
        <meshLambertMaterial color="#f5f5f5" flatShading />
      </mesh>

      {/* Sello / marca */}
      <mesh position={[5, 3, 3]}>
        <cylinderGeometry args={[2, 2, 1, 16]} />
        <meshLambertMaterial color="#e63946" flatShading />
      </mesh>
    </group>
  );
}
