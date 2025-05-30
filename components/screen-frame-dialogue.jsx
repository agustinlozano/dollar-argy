import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";

export function ScreenFrameDialogue({
  dialogue,
  position = [90, 40, 0],
  speaker = "",
  onDialogueEnd,
}) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isDialogueActive, setIsDialogueActive] = useState(true);
  const [fadeClass, setFadeClass] = useState("opacity-100");

  const currentStep = dialogue.steps[currentMessageIndex];
  const isLastMessage = currentMessageIndex >= dialogue.steps.length - 1;

  useEffect(() => {
    if (!isDialogueActive) return;
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "e") {
        handleNextMessage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDialogueActive, currentMessageIndex]);

  const handleNextMessage = () => {
    if (isLastMessage) {
      setFadeClass("opacity-0");
      setTimeout(() => {
        setIsDialogueActive(false);
        if (onDialogueEnd) onDialogueEnd();
      }, 300);
    } else {
      setFadeClass("opacity-0");
      setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
        setFadeClass("opacity-100");
      }, 300);
    }
  };

  if (!isDialogueActive || !currentStep) return null;

  return (
    <Html
      position={position}
      center
      style={{
        background: "rgba(0, 0, 0, 0.85)",
        padding: "12px",
        borderRadius: "8px",
        color: "white",
        fontSize: "16px",
        fontFamily: "Arial, sans-serif",
        userSelect: "none",
        whiteSpace: "nowrap",
        maxWidth: "280px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        border: "2px solid rgba(255, 255, 255, 0.1)",
        transition: "opacity 0.3s ease-in-out",
      }}
      className={fadeClass}
    >
      <div
        style={{
          fontWeight: "bold",
          color: "rgb(180, 83, 9)",
        }}
      >
        {speaker}
      </div>
      <div>
        {Array.isArray(currentStep.text)
          ? currentStep.text.join(" ")
          : currentStep.text}
      </div>
    </Html>
  );
}
