// components/DancingIndicator.jsx
import React from "react";
import { Html } from "@react-three/drei";

export function DancingIndicator({ position }) {
  return (
    <Html
      position={[position.x, position.y, 90]} // Ajusta la altura según sea necesario
      center
      style={{
        background: "rgba(0, 0, 0, 0.8)",
        padding: "6px 12px",
        borderRadius: "4px",
        color: "white",
        fontSize: "14px",
        fontFamily: "Arial",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
    >
      Dancing 🪩💃🏻
    </Html>
  );
}
