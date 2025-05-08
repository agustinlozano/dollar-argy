import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import s from "./gothic-button.module.css";

export function GothicButton({
  onClick,
  variant = "purple",
  children,
  className,
}) {
  const audioRef = useRef(null);

  const handleClick = (event) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.log("Audio play failed:", e));
    }
    onClick?.(event);
  };

  return (
    <>
      <audio ref={audioRef} src="/sounds/ui-feedback.wav" preload="auto" />
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
    </>
  );
}
