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

// Creamos una base única con forma gótica
export const FoundationsRockyZone = ({
  position = [0, 0, 5],
  gridSize = [3, 3],
}) => {
  // Creamos una forma gótica simétrica
  const baseShape = useMemo(() => {
    const shape = new THREE.Shape();

    // Tamaño base de la plataforma
    const [width, height] = gridSize;
    const hexSize = 50;
    const totalWidth = width * hexSize * 2.1;
    const totalHeight = height * hexSize * 1.82;

    // Punto central
    const centerX = totalWidth / 2;
    const centerY = totalHeight / 2;

    // Radio base (aproximadamente la mitad del ancho total)
    const baseRadius = Math.min(totalWidth, totalHeight) / 2;

    // Crear forma gótica con puntas y arcos
    const points = 8; // Número de puntas (par para simetría)
    const innerRadius = baseRadius * 0.85; // Radio interior para los arcos

    // Primera punta
    let startX = centerX + baseRadius * Math.cos(0);
    let startY = centerY + baseRadius * Math.sin(0);
    shape.moveTo(startX, startY);

    // Crear las puntas y arcos góticos
    for (let i = 0; i < points; i++) {
      // Ángulo actual y siguiente
      const angle = (i / points) * Math.PI * 2;
      const nextAngle = ((i + 1) / points) * Math.PI * 2;

      // Puntos de la punta actual y siguiente
      const x1 = centerX + baseRadius * Math.cos(angle);
      const y1 = centerY + baseRadius * Math.sin(angle);
      const x2 = centerX + baseRadius * Math.cos(nextAngle);
      const y2 = centerY + baseRadius * Math.sin(nextAngle);

      // Punto medio para el arco gótico
      const midAngle = (angle + nextAngle) / 2;
      const archDepth = 0.3; // Profundidad del arco gótico

      // Punto interior del arco
      const archX = centerX + innerRadius * Math.cos(midAngle);
      const archY = centerY + innerRadius * Math.sin(midAngle);

      // Añadir curva de control para el arco gótico
      // Primero dibujamos desde el punto actual al punto interior del arco
      shape.lineTo(archX, archY);
      // Luego desde el punto interior del arco hasta el siguiente punto exterior
      shape.lineTo(x2, y2);
    }

    shape.closePath();
    return shape;
  }, [gridSize]);

  // Creamos geometría extruida con bisel pronunciado para acentuar el estilo gótico
  const geometry = useMemo(() => {
    const extrudeSettings = {
      steps: 2,
      depth: 10, // Un poco más profundo para más presencia
      bevelEnabled: true,
      bevelThickness: 2.5,
      bevelSize: 2.5,
      bevelOffset: 0.5, // Offset para crear sensación de piedra tallada
      bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(baseShape, extrudeSettings);
  }, [baseShape]);

  // Material con textura de piedra con aspecto más oscuro y antiguo
  const rockMaterial = useMemo(() => {
    const texture = loadTexture("/textures/stone-floor.jpg");
    texture.repeat.set(0.01, 0.01);

    return new THREE.MeshStandardMaterial({
      color: "#575757", // Más oscuro para apariencia gótica
      roughness: 0.9, // Más rugoso para simular piedra antigua
      metalness: 0.15,
      map: texture,
      flatShading: true,
      emissive: "#303030", // Emisivo más sutil y oscuro
      emissiveIntensity: 0.35,
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
