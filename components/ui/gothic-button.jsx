import React from "react";
import { useSound } from "@/hooks/useSound";
import { cn } from "@/lib/utils";
import s from "./gothic-button.module.css";

export function GothicButton({
  onClick,
  variant = "purple",
  children,
  className,
  soundUrl = "/sounds/ui-hovers.wav",
  volume = 1,
  useFragment = true, // use a fragment of the sound
  startTime = 1.8,
  endTime = 2.4,
}) {
  // if useFragment is true, use the specific fragment
  const { play } = useSound(soundUrl, {
    volume,
    ...(useFragment ? { startTime, endTime } : {}),
  });

  const handleClick = (event) => {
    play();
    onClick?.(event);
  };

  return (
    <button
      className={cn(
        "font-cormorant relative px-4 py-1 border-b bg-purple-200 flex items-center justify-center select-none",
        s.inventoryButton3d,
        variant === "silver" && s.silver,
        variant === "amber" && s.amber,
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
