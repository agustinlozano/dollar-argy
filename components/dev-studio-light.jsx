import React, { useRef } from "react";
import { DirectionalLightHelper } from "three";
import { useHelper } from "@react-three/drei";
import { GAME_CONSTANTS } from "@/lib/consts";

export function DevStudioLight({
  position = [0, 0, 0],
  intensity = 1,
  showHelper = true,
}) {
  const mainLightRef = useRef();
  const areaSize = GAME_CONSTANTS.tileSize * 2;

  // Activamos el helper si showHelper es true
  if (showHelper) {
    useHelper(mainLightRef, DirectionalLightHelper, 2, "yellow");
  }

  return (
    <group position={position}>
      {/* Luz principal desde arriba */}
      <directionalLight
        ref={mainLightRef}
        intensity={intensity * 1.5}
        position={[0, 0, areaSize]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-areaSize}
        shadow-camera-right={areaSize}
        shadow-camera-top={areaSize}
        shadow-camera-bottom={-areaSize}
        shadow-camera-near={1}
        shadow-camera-far={areaSize * 2}
      />

      {/* Luz de relleno frontal */}
      <directionalLight
        intensity={intensity * 0.4}
        position={[areaSize, areaSize, areaSize / 2]}
        castShadow={false}
      />

      {/* Luz de contorno */}
      <directionalLight
        intensity={intensity * 0.3}
        position={[-areaSize, -areaSize, areaSize / 2]}
        castShadow={false}
      />

      {/* Caja que muestra el área de iluminación */}
      {showHelper && (
        <mesh position={[0, 0, areaSize / 2]} wireframe>
          <boxGeometry args={[areaSize, areaSize, areaSize]} />
          <meshBasicMaterial color="yellow" opacity={0.1} transparent />
        </mesh>
      )}
    </group>
  );
}
