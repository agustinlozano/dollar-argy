import * as THREE from "three";
import { useMemo } from "react";

// Create a texture loader and cache for reuse
const textureLoader = new THREE.TextureLoader();
const textureCache = {};

// Function to load texture once and reuse
const loadTexture = (path) => {
  if (!textureCache[path]) {
    textureCache[path] = textureLoader.load(path);
    // Apply optimizations to the texture
    textureCache[path].wrapS = textureCache[path].wrapT = THREE.RepeatWrapping;
    textureCache[path].anisotropy = 4; // Improve texture quality at angles
  }
  return textureCache[path];
};

// Creamos una base única con forma irregular
export const HexagonalRockyZone = ({
  position = [0, 0, 5],
  gridSize = [3, 3],
}) => {
  // Creamos una forma compuesta con bordes irregulares
  const baseShape = useMemo(() => {
    const shape = new THREE.Shape();

    // Tamaño base de la plataforma
    const [width, height] = gridSize;
    const hexSize = 20;
    const totalWidth = width * hexSize * 2.1;
    const totalHeight = height * hexSize * 1.82;

    // Punto central
    const centerX = totalWidth / 2;
    const centerY = totalHeight / 2;

    // Radio base (aproximadamente la mitad del ancho total)
    const baseRadius = Math.min(totalWidth, totalHeight) / 2;

    // Número de puntos para el contorno irregular
    const points = 12;

    // Generar forma irregular con variaciones aleatorias pero consistentes
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      // Variamos el radio para crear irregularidad
      const radiusVariation = 0.8 + Math.sin(i * 5) * 0.2;
      const radius = baseRadius * radiusVariation;

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }

    shape.closePath();
    return shape;
  }, [gridSize]);

  // Creamos geometría extruida con bisel para dar efecto de piedra tallada
  const geometry = useMemo(() => {
    const extrudeSettings = {
      steps: 2,
      depth: 8,
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: 2,
      bevelOffset: 0,
      bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(baseShape, extrudeSettings);
  }, [baseShape]);

  // Material con textura de piedra y propiedades para destacar
  const rockMaterial = useMemo(() => {
    const texture = loadTexture("/textures/stone-floor.jpg");
    texture.repeat.set(0.1, 0.1);

    return new THREE.MeshStandardMaterial({
      color: "#757575",
      roughness: 0.8,
      metalness: 0.1,
      map: texture,
      flatShading: true,
      emissive: "#404040",
      emissiveIntensity: 0.2,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      depthWrite: true,
      depthTest: true,
    });
  }, []);

  // Retornamos una única malla con la geometría combinada
  return (
    <group position={position}>
      <mesh
        rotation={[0, 0, 0]}
        geometry={geometry}
        material={rockMaterial}
        castShadow
        receiveShadow
      />
    </group>
  );
};
