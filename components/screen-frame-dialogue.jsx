import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { cn } from "@/lib/utils";

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
        maxWidth: "280px",
        transition: "opacity 0.3s ease-in-out",
      }}
      className={cn(
        fadeClass,
        "font-cormorant bg-background border-2 p-3 rounded-md text-nowrap select-none"
      )}
    >
      <strong className="text-xs uppercase text-amber-700 font-bold">
        {speaker}
      </strong>
      <p className="text-sm italic">
        {Array.isArray(currentStep.text)
          ? `"${currentStep.text.join(" ")}"`
          : `"${currentStep.text}"`}
      </p>
    </Html>
  );
}
