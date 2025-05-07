import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GAME_CONSTANTS } from "@/lib/consts";

/**
 * SpellEffect Component
 *
 * This component represents a spell effect in the game, which consists of an explosion and a projectile.
 *
 * Key Features:
 * - The spell is triggered by the player and moves forward in the Y direction.
 * - The explosion consists of two layers: an outer explosion and an inner core, each with different colors and opacities.
 * - The explosion effect fades out quickly, with a smooth scaling animation to enhance the visual appeal.
 * - The projectile is a simple box geometry that travels forward until it reaches a specified maximum distance.
 *
 * Performance Optimizations:
 * - Materials are created using `useMemo` to ensure they are reused across multiple instances of the spell, reducing memory usage and improving performance.
 * - Geometries are stored in `useRef` to avoid creating new geometries on each spell cast, further optimizing performance.
 *
 * Props:
 * - `position`: The initial position of the spell effect in the 3D space.
 * - `onComplete`: A callback function that is called when the spell has traveled its maximum distance.
 *
 * Usage:
 * - This component should be rendered in the game scene whenever a spell is cast, and it will handle its own animation and lifecycle.
 */

export function SpellEffect({ position, onComplete }) {
  const groupRef = useRef();
  const projectileRef = useRef();
  const timeRef = useRef(0);
  const speed = 300;
  const maxDistance = GAME_CONSTANTS.tileSize * GAME_CONSTANTS.initialRows;
  const startPosition = new THREE.Vector3(...position);

  // Re-use materials memoized
  const explosionMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#FFA500",
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  const innerExplosionMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#FF4500",
        transparent: true,
        opacity: 1,
      }),
    []
  );

  const projectileMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#FFD700",
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  // Re-use geometries
  const explosionGeometry = useRef(new THREE.BoxGeometry(2, 2, 2));
  const innerExplosionGeometry = useRef(new THREE.BoxGeometry(4, 4, 4));
  const projectileGeometry = useRef(new THREE.BoxGeometry(2, 2, 2));

  useFrame((state, delta) => {
    timeRef.current += delta;

    if (projectileRef.current) {
      // Always move forward (Y positive)
      const direction = new THREE.Vector3(0, 1, 0);
      projectileRef.current.position.add(
        direction.multiplyScalar(speed * delta)
      );

      // Check distance traveled
      const distance = projectileRef.current.position.distanceTo(startPosition);
      if (distance > maxDistance) {
        onComplete();
      }
    }

    // Fade out explosion effect - faster and better animation
    if (groupRef.current && timeRef.current < 0.15) {
      // Reduced from 0.3 to 0.15 seconds
      // Non-linear scale for better effect
      const progress = timeRef.current / 0.15;
      const scale = 1 + Math.sin(progress * Math.PI) * 0.5; // Efecto de pulso suave
      groupRef.current.scale.setScalar(scale);

      // Opacity with exponential fade
      explosionMaterial.opacity = 0.9 * Math.pow(1 - progress, 2);
      innerExplosionMaterial.opacity = Math.pow(1 - progress, 1.5);
    } else if (groupRef.current) {
      // Hide completely after
      groupRef.current.scale.setScalar(0);
    }
  });

  return (
    <group position={position}>
      {/* Explosion effect */}
      <group ref={groupRef}>
        <mesh
          material={explosionMaterial}
          geometry={explosionGeometry.current}
        />
        <mesh
          material={innerExplosionMaterial}
          geometry={innerExplosionGeometry.current}
        />
      </group>

      {/* Projectile */}
      <mesh
        ref={projectileRef}
        material={projectileMaterial}
        geometry={projectileGeometry.current}
      />
    </group>
  );
}
