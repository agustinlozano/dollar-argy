import { useRef, useEffect } from "react";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";
import { enviroment } from "@/lib/env-vars";

// Game environment lights
export function PlayerDirectionalLight() {
  const dirLightRef2 = useRef();
  const targetRef = useRef();

  // Usar el hook useHelper de drei
  if (enviroment === "development") {
    useHelper(dirLightRef2, THREE.DirectionalLightHelper, 100, "blue");
  }

  useEffect(() => {
    if (dirLightRef2.current) {
      dirLightRef2.current.target.position.set(0, 1300, 0);
      dirLightRef2.current.target.updateMatrixWorld();
    }
  }, []);

  return (
    <>
      <directionalLight
        position={[-200, -200, 400]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-left={-800}
        shadow-camera-right={800}
        shadow-camera-top={800}
        shadow-camera-bottom={-800}
        shadow-camera-near={50}
        shadow-camera-far={800}
      />

      <directionalLight
        ref={dirLightRef2}
        position={[200, 1000, 400]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-left={-800}
        shadow-camera-right={800}
        shadow-camera-top={800}
        shadow-camera-bottom={-800}
        shadow-camera-near={50}
        shadow-camera-far={800}
      />

      {/* Target object for the light */}
      <object3D ref={targetRef} />
    </>
  );
}
