"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SpinningBox from "./3d-spining-box";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [3, 3, 3], fov: 50 }}
      className="w-full h-full bg-background"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <SpinningBox position={[0, 0, 0]} />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}
