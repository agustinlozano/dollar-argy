export function GoldCoin({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, 0, 4]}>
        <cylinderGeometry args={[6, 6, 4, 24]} />
        <meshLambertMaterial color="#FFD700" flatShading />
      </mesh>
    </group>
  );
}
