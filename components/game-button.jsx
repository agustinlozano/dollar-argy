"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GameButton({ className, children, ...props }) {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-full h-10 border border-border shadow-[3px_5px_0px_0px_rgba(0,0,0,0.75)]",
        "bg-card text-foreground font-bold",
        "active:translate-y-[1px] active:shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
