import React from "react";
import { useSound } from "@/hooks/useSound";
import { cn } from "@/lib/utils";
import s from "./gothic-button.module.css";

export function GothicButton({
  onClick,
  variant = "purple",
  children,
  className,
  soundUrl = "/sounds/ui-feedback.wav",
  volume = 0.5,
}) {
  const { play } = useSound(soundUrl, { volume });

  const handleClick = (event) => {
    play();
    onClick?.(event);
  };

  return (
    <button
      className={cn(
        "font-cormorant relative px-4 py-1 border-b bg-purple-200 flex items-center justify-center",
        s.inventoryButton3d,
        variant === "silver" && s.silver,
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
