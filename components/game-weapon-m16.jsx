import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function M16M1({ position = [0, 0, 0] }) {
  const group = useRef();

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} position={position} scale={[1, 1, 1]}>
      {/* Stock */}
      <mesh position={[-16, 0, 0]}>
        <boxGeometry args={[10, 4, 2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Receiver */}
      <mesh position={[-5, 0, 0]}>
        <boxGeometry args={[8, 4, 2]} />
        <meshStandardMaterial color="#2b2b2b" />
      </mesh>

      {/* Carry handle */}
      <mesh position={[-5, 2.5, 0]}>
        <boxGeometry args={[6, 1, 1]} />
        <meshStandardMaterial color="#1f1f1f" />
      </mesh>

      {/* Pistol grip */}
      <mesh position={[-7.5, -3, 0]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[1.2, 3, 1]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Magazine */}
      <mesh position={[-3, -2.5, 0]} rotation={[Math.PI / 10, 0, 0]}>
        <boxGeometry args={[1.5, 4, 1]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Handguard */}
      <mesh position={[6, 0, 0]}>
        <boxGeometry args={[14, 3.2, 2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Front sight */}
      <mesh position={[14, 2, 0]}>
        <boxGeometry args={[1, 3, 1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Barrel */}
      <mesh position={[25, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 12, 12]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  );
}
