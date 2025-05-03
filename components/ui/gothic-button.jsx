import React from "react";
import { cn } from "@/lib/utils";
import s from "./gothic-button.module.css";

export function GothicButton({ onClick, isActive, children }) {
  return (
    <button className={cn(s.button)} onClick={onClick}>
      {children}
    </button>
  );
}
