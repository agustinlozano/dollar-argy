import { cn } from "@/lib/utils";

export const BgGradient = ({ className }) => (
  <div
    role="presentation"
    className={cn(
      "pointer-events-none absolute inset-0 z-10 h-full texture-fade w-full items-center opacity-95 [background:radial-gradient(125%_125%_at_50%_10%,#000_30%,#2c1810_100%)] rounded",
      className
    )}
  ></div>
);
