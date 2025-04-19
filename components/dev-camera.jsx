import { useMemo, useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";

export function DevCamera() {
  const { size, invalidate } = useThree();
  const cameraRef = useRef();

  // Compute camera dimensions using memoization
  const { width, height } = useMemo(() => {
    const baseSize = 300;
    const viewRatio = size.width / size.height;
    return {
      width: Math.max(baseSize, baseSize * viewRatio),
      height: Math.max(baseSize, baseSize / viewRatio),
    };
  }, [size.width, size.height]);

  // Handle window resize
  useEffect(() => {
    if (!cameraRef.current) return;

    // Update camera frustum on resize
    cameraRef.current.left = width / -2;
    cameraRef.current.right = width / 2;
    cameraRef.current.top = height / 2;
    cameraRef.current.bottom = height / -2;
    cameraRef.current.updateProjectionMatrix();

    // Force a re-render of the scene
    invalidate();
  }, [width, height, invalidate]);

  return (
    <>
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        position={[300, -300, 300]}
        left={width / -2}
        right={width / 2}
        top={height / 2}
        bottom={height / -2}
        near={100}
        far={4000}
        up={[0, 0, 1]}
      />
      <OrbitControls
        makeDefault
        enableRotate={true}
        enableZoom={true}
        enablePan={true}
        panSpeed={1}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={0}
        target={[0, 0, 0]}
      />
    </>
  );
}
