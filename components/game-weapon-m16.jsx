import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export function M16M1({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  expo = false,
}) {
  const weaponRef = useRef();

  const geometries = useMemo(() => {
    return {
      smallBox: new THREE.BoxGeometry(0.3, 0.3, 0.3),
      trigger: new THREE.BoxGeometry(0.3, 0.8, 0.2),
      cylinderThin: new THREE.CylinderGeometry(0.4, 0.4, 16, 8),
      smallCylinder: new THREE.CylinderGeometry(0.5, 0.5, 7, 8),
    };
  }, []);

  useFrame((state, delta) => {
    if (!expo || !weaponRef.current) return;
    weaponRef.current.rotation.x += delta * 0.5;
    weaponRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group
      ref={weaponRef}
      position={position}
      scale={[1.4, 1.4, 1.4]}
      rotation={rotation}
    >
      {/* Stock Group */}
      <group position={[-14, -0.3, 0]}>
        {/* Main Upper Stock */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[10, 2.5, 1.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Main Lower Stock */}
        <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.PI / 15]}>
          <boxGeometry args={[10, 2, 1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Buttplate */}
        <mesh position={[-5, -0.5, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1, 4, 0.8]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </group>

      {/* Receiver Group */}
      <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
        {/* Upper Receiver */}
        <mesh position={[-5, 0.7, 0]}>
          <boxGeometry args={[8, 1.4, 1.2]} />
          <meshStandardMaterial color="#252525" />
        </mesh>

        {/* Lower Receiver */}
        <group position={[-4.5, -1, 0]}>
          <mesh position={[-4, 0.4, 0]}>
            <boxGeometry args={[1, 1.2, 1.2]} />
            <meshStandardMaterial color="#2b2b2b" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[7, 2, 1.2]} />
            <meshStandardMaterial color="#2b2b2b" />
          </mesh>
        </group>

        {/* Magazine Holder */}
        <mesh position={[-2.6, -2.5, 0]}>
          <boxGeometry args={[2.5, 1, 1.2]} />
          <meshStandardMaterial color="#2b2b2b" />
        </mesh>

        {/* Carry Handle */}
        <group position={[-5, 2.5, 0]}>
          <mesh position={[-3, -0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <boxGeometry args={[0.6, 2, 0.5]} />
            <meshStandardMaterial color="#1f1f1f" />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2.1]}>
            <cylinderGeometry args={[0.3, 0.1, 5.5, 8]} />
            <meshStandardMaterial color="#1f1f1f" />
          </mesh>
          <mesh position={[2.7, -0.7, 0]}>
            <boxGeometry args={[0.3, 1, 0.2]} />
            <meshStandardMaterial color="#1f1f1f" />
          </mesh>
        </group>

        {/* Ejection Port */}
        <mesh position={[-5, 0.7, 0.6]}>
          <boxGeometry args={[4, 0.5, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Forward Assist */}
        <mesh position={[-5, -0, 0.4]} rotation={[0, 0, Math.PI / 2]}>
          <primitive object={geometries.smallCylinder} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Charging Handle */}
        <mesh position={[-8, 0.8, 0.4]}>
          <boxGeometry args={[1, 0.5, 0.5]} />
          <meshStandardMaterial color="#0f0f0f" />
        </mesh>
      </group>

      {/* Controls Group */}
      <group position={[0, 0, 0]}>
        {/* Pistol Grip */}
        <group position={[-7.5, -3, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 4, 1]} />
            <meshStandardMaterial color="#111" />
          </mesh>

          <mesh position={[0, -2, 0]}>
            <boxGeometry args={[1.8, 0.2, 1.2]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        </group>

        {/* Trigger Guard */}
        <mesh position={[-4, -3, 0]}>
          <boxGeometry args={[5.3, 0.1, 0.9]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Trigger */}
        <mesh position={[-5.5, -2.3, 0]}>
          <primitive object={geometries.trigger} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Magazine */}
        <mesh position={[-2.5, -3.5, 0]} rotation={[0, 0, Math.PI / 18]}>
          <boxGeometry args={[1.8, 5, 1]} />
          <meshStandardMaterial color="#333" />
        </mesh>

        {/* Magazine Release */}
        <mesh position={[-4, -1.5, 0.6]}>
          <primitive object={geometries.smallBox} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>

      {/* Handguard Group */}
      <group position={[0, 0, 0]}>
        {/* Main Handguard - Reducido segmentos */}
        <mesh position={[6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry
            args={[1.1, 0.8, 12, 8]} // Reducido segmentos radiales
            rotation={[Math.PI / 2, 0, 0]}
          />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Delta Ring */}
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry
              args={[0.8, 0.8, 2, 8]} // Reducido segmentos radiales
              rotation={[Math.PI / 2, 0, 0]}
            />
            <meshStandardMaterial color="#232323" />
          </mesh>

          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry
              args={[0.4, 1.1, 0.5, 8]} // Reducido segmentos radiales
              rotation={[Math.PI / 2, 0, 0]}
            />
            <meshStandardMaterial color="#232323" />
          </mesh>
        </group>

        {/* Handguard Vents */}
        <mesh position={[6, 0.2, 0]}>
          <boxGeometry args={[12, 1.5, 1.3]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </group>

      {/* Barrel Group */}
      <group position={[3, 0, 0]}>
        {/* Main Barrel */}
        <mesh position={[10, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <primitive
            object={geometries.cylinderThin}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>

        {/* Front Sight Assembly */}
        <group position={[10.2, 1.2, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.3, 1.8, 0.3]} />
            <meshStandardMaterial color="#0a0a0a" />
          </mesh>

          <mesh position={[-0.7, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.2, 1.8, 0.3]} />
            <meshStandardMaterial color="#0a0a0a" />
          </mesh>

          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.3, 1, 0.2]} />
            <meshStandardMaterial color="#0a0a0a" />
          </mesh>

          <mesh position={[-0.7, -0.55, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <boxGeometry args={[0.3, 1.8, 0.3]} />
            <meshStandardMaterial color="#0a0a0a" />
          </mesh>
        </group>

        {/* Flash Hider */}
        <group position={[18, 0, 0]}>
          <mesh position={[-1.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.5, 0.5, 0.3, 8]} />{" "}
            <meshStandardMaterial color="#0f0f0f" />
          </mesh>

          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.5, 0.5, 2, 9]} />
            <meshStandardMaterial color="#0f0f0f" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
