import * as THREE from "three";

export const RockyMaterial = new THREE.MeshStandardMaterial({
  color: "#575757",
  roughness: 0.9, // more rough to simulate old stone
  metalness: 0.1,
  flatShading: true,
  // Add slight emissive for selected state
  emissive: "#363636",
  emissiveIntensity: 0.2,
});

export const RockyBrighterMaterial = new THREE.MeshStandardMaterial({
  color: "#6B7280", // Elegant gray tone
  roughness: 0.7, // Smoother than rocky terrain
  metalness: 0.2,
  flatShading: false, // Smooth shading for elegant appearance
  emissive: "#404040",
  emissiveIntensity: 0.25,
  polygonOffset: true,
  polygonOffsetFactor: 1,
  polygonOffsetUnits: 1,
  depthWrite: true,
  depthTest: true,
});
