import React from "react";
import { cn } from "@/lib/utils";
import s from "./gothic-button.module.css";

export function GothicButton({
  onClick,
  variant = "purple",
  children,
  className,
}) {
  return (
    <button
      className={cn(
        "font-cormorant relative px-4 py-2 border-b bg-purple-200 flex items-center justify-center",
        s.inventoryButton3d,
        variant === "silver" && s.silver,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
