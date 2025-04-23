import React from "react";
import * as THREE from "three";

export const AxisHelper2D = ({
  lengthX = 20,
  lengthY = 20,
  thickness = 0.5,
  colorX = "white",
  colorY = "white",
  ...props
}) => {
  const materials = React.useMemo(() => {
    return {
      x: new THREE.MeshStandardMaterial({ color: colorX }),
      y: new THREE.MeshStandardMaterial({ color: colorY }),
    };
  }, [colorX, colorY]);

  const geometries = React.useMemo(() => {
    return {
      x: new THREE.BoxGeometry(lengthX, thickness, thickness),
      y: new THREE.BoxGeometry(lengthY, thickness, thickness),
    };
  }, [lengthX, lengthY, thickness]);

  const cleanup = React.useCallback(() => {
    geometries.x.dispose();
    geometries.y.dispose();
    materials.x.dispose();
    materials.y.dispose();
  }, [geometries, materials]);

  React.useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return (
    <group {...props}>
      {/* Eje X */}
      <mesh
        position={[lengthX / 2, 0, thickness / 2]}
        rotation={[0, 0, 0]}
        material={materials.x}
        geometry={geometries.x}
      />
      {/* Eje Y */}
      <mesh
        position={[0, lengthY / 2, thickness / 2]}
        rotation={[0, 0, Math.PI / 2]}
        material={materials.y}
        geometry={geometries.y}
      />
    </group>
  );
};
