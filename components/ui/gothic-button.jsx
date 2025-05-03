import React from "react";
import { cn } from "@/lib/utils";
import s from "./gothic-button.module.css";

export function GothicButton({ onClick, variant = "purple", children }) {
  return (
    <button
      className={cn(s.button, variant === "silver" && s.silver)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
