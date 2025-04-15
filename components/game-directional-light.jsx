import { useRef, useEffect } from "react";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";

// Game environment lights
export function PlayerDirectionalLight({ playerPosition }) {
  const dirLightRef = useRef();
  const targetRef = useRef();

  // Usar el hook useHelper de drei
  useHelper(dirLightRef, THREE.DirectionalLightHelper, 100, "red");

  useEffect(() => {
    if (dirLightRef.current && playerPosition && targetRef.current) {
      // Posicionamos la luz en relación con el jugador
      dirLightRef.current.position.set(
        playerPosition.x - 200,
        playerPosition.y - 200,
        400
      );
      dirLightRef.current.up.set(0, 0, 1);

      // Actualizamos el target para que apunte hacia el jugador
      targetRef.current.position.set(playerPosition.x, playerPosition.y, 0);

      // Aseguramos que la luz apunta al target
      dirLightRef.current.target = targetRef.current;
      dirLightRef.current.target.updateMatrixWorld();
    }
  }, [playerPosition]);

  return (
    <>
      <directionalLight
        ref={dirLightRef}
        intensity={1}
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
