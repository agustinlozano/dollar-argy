import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function ObjFallback({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const meshRef = useRef();

  useFrame(() => {
    // make the box rotate
    meshRef.current.rotation.x += 0.1;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[5, 5, 5]} />
      <meshBasicMaterial color="#0a0a0a" />
    </mesh>
  );
}
