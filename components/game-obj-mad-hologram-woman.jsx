import { useGLTF } from "@react-three/drei";

export function HologramMadwoman(props) {
  const { nodes, materials } = useGLTF("/characters/hologram-woman/model.glb");

  if (!nodes || !materials) {
    console.error("Model failed to load properly:", { nodes, materials });
    return null;
  }

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.model.geometry}
        material={materials.CustomMaterial}
        castShadow
        scale={[40, 40, 40]} // Fit scale
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]} // Rotate 180 degrees to face forward
      />
    </group>
  );
}

useGLTF.preload("/characters/hologram-woman/model.glb");
