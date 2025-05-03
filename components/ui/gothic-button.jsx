import React from "react";
import "./gothic-button.css";

export function GothicButton({ onClick, isActive, children }) {
  return (
    <button
      className={`gothic-button-3d ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
