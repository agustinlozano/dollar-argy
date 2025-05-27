import { useGLTF } from "@react-three/drei";

export function GrumpyManObj(props) {
  const { nodes, materials } = useGLTF("/characters/grumpy-man/model.glb");

  if (!nodes || !materials) {
    console.error("Model failed to load properly:", { nodes, materials });
    return null;
  }

  materials.CustomMaterial.emissiveIntensity = 2;

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

// Precarga el modelo para evitar delays
useGLTF.preload("/characters/grumpy-man/model.glb");
