import { cn } from "@/lib/utils";

export const BgGradient = ({ className }) => (
  <div
    className={cn(
      "absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#2c1810_100%)]",
      className
    )}
  ></div>
);
