import { useGLTF } from "@react-three/drei";

export function ElderlyWomanObj(props) {
  const { nodes, materials } = useGLTF("/characters/elderly-woman/model.glb");

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
        scale={[45, 45, 45]} // Fit scale
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]} // Rotate 180 degrees to face forward
      />
    </group>
  );
}

useGLTF.preload("/characters/elderly-woman/model.glb");
