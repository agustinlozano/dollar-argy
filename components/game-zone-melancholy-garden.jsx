import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { FoundationsTeardropZone } from "./game-zone-terrain-teardrop-foundations";
import { TorchLight } from "./game-light-torch";
import { DialogueTrigger } from "./dialogue-trigger";
import { dialogues } from "@/lib/dialogues";
import { ElderlyWomanObj } from "./game-obj-elderly-woman";
import { ObjFallback } from "./game-obj-fallback";
import { ScreenWithDialogue } from "./screen-with-dialogue";

// Gentle Rain Particles Component
// const RainParticles = () => {
//   const particlesRef = useRef();
//   const particleCount = 200;

//   const particles = useMemo(() => {
//     const positions = new Float32Array(particleCount * 3);
//     const velocities = new Float32Array(particleCount * 3);

//     for (let i = 0; i < particleCount; i++) {
//       // Random positions across the zone
//       positions[i * 3] = (Math.random() - 0.5) * 200; // X
//       positions[i * 3 + 1] = Math.random() * 200 + 50; // Y (above ground)
//       positions[i * 3 + 2] = (Math.random() - 0.5) * 200; // Z

//       // Gentle downward velocities
//       velocities[i * 3] = (Math.random() - 0.5) * 0.5; // X drift
//       velocities[i * 3 + 1] = -Math.random() * 2 - 1; // Y (downward)
//       velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5; // Z drift
//     }

//     return { positions, velocities };
//   }, []);

//   useFrame((state, delta) => {
//     if (particlesRef.current) {
//       const positions = particlesRef.current.geometry.attributes.position.array;

//       for (let i = 0; i < particleCount; i++) {
//         // Update positions based on velocities
//         positions[i * 3] += particles.velocities[i * 3] * delta * 20;
//         positions[i * 3 + 1] += particles.velocities[i * 3 + 1] * delta * 20;
//         positions[i * 3 + 2] += particles.velocities[i * 3 + 2] * delta * 20;

//         // Reset particles that fall too low
//         if (positions[i * 3 + 1] < -10) {
//           positions[i * 3] = (Math.random() - 0.5) * 200;
//           positions[i * 3 + 1] = Math.random() * 50 + 50;
//           positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
//         }
//       }

//       particlesRef.current.geometry.attributes.position.needsUpdate = true;
//     }
//   });

//   const rainMaterial = useMemo(
//     () =>
//       new THREE.PointsMaterial({
//         color: "#A0AEC0",
//         size: 1,
//         transparent: true,
//         opacity: 0.6,
//       }),
//     []
//   );

//   return (
//     <points ref={particlesRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={particleCount}
//           array={particles.positions}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <primitive object={rainMaterial} />
//     </points>
//   );
// };

export const MelancholyGarden = ({ position }) => {
  // Animation logic for the melancholy garden
  useFrame(() => {
    // Gentle ambient effects could be added here
  });

  return (
    <group position={position}>
      {/* Gentle rain particles across the zone */}
      {/* <RainParticles /> */}

      <ScreenWithDialogue
        position={[-150, 0, 80]}
        rotation={[Math.PI / 2, 0, 0]}
        dialogueId="greet-agustin"
      />

      {/* Use the new teardrop foundations */}
      <FoundationsTeardropZone position={[0, -150, -5]} gridSize={[3, 3]} />

      <group position={[0, -40, 0]}>
        <TorchLight position={[85, 0, 20]} rotation={[Math.PI / 2, 0, 0]} />
        <TorchLight position={[230, 0, 20]} rotation={[Math.PI / 2, 0, 0]} />
      </group>

      {/* The melancholic woman in the center */}
      <DialogueTrigger
        dialogueId={dialogues["greet-melancholic-woman"].id}
        position={[157.5, 0, 0]}
        interactionDistance={120}
      >
        <Suspense
          fallback={
            <ObjFallback position={[0, -40, 8]} rotation={[0, 0, Math.PI]} />
          }
        >
          <ElderlyWomanObj position={[0, -40, 8]} rotation={[0, 0, Math.PI]} />
        </Suspense>
      </DialogueTrigger>

      {/* Ambient lighting for melancholic atmosphere */}
      <ambientLight intensity={0.1} color="#4A5568" />

      {/* Soft directional light for mood */}
      <directionalLight
        intensity={0.3}
        position={[100, 200, 100]}
        color="#CBD5E0"
        castShadow={false}
      />
    </group>
  );
};
