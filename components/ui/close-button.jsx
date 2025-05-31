import { X } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { cn } from "@/lib/utils";

export function CloseButton({
  onClick,
  className,
  soundUrl = "/sounds/ui-feedback.wav",
  size = 20,
}) {
  const { play } = useSound(soundUrl, { volume: 0.1 });

  const handleClick = (event) => {
    play();
    onClick?.(event);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "absolute top-2 right-2 z-50 p-1 rounded-full border",
        "bg-card/50 hover:bg-primary/20 hover:border-primary/75",
        "transform hover:scale-110 transition-all duration-200",
        className
      )}
    >
      <X size={size} className="opacity-75" />
    </button>
  );
}
