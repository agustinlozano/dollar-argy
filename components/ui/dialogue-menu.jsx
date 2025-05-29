import { CloseButton } from "./close-button";
import { cn } from "@/lib/utils";
import styles from "./metallic-dialogue-menu.module.css";

export function MetallicDialogueMenu({
  dialogueText = '"La gente me rechaza, merezco una oportunidad digna."',
  characterImage = "/characters/hornero-portrait.png",
  characterName = "Hornero Peso Argentino 🇦🇷",
  variant = "purple", // 'purple', 'silver' o 'brown'
  onClose,
  onClick,
}) {
  return (
    <div
      className={cn(
        styles.metallicContainer,
        "",
        variant === "silver"
          ? styles.silver
          : variant === "brown"
          ? styles.brown
          : styles.purple
      )}
    >
      {onClose && (
        <CloseButton onClick={onClose} className="absolute top-0 right-0" />
      )}

      <div className="relative flex h-full w-full z-10">
        {/* Left side - Dialogue */}
        <div
          className={cn(
            "px-8 pt-8 pb-4 border border-primary/20 w-xl flex flex-col justify-between",
            styles.dialogueSection
          )}
        >
          <div className="text-primary/90 font-mono font-light relative z-10 grow w-full text-xl max-h-80 overflow-auto">
            <p>{dialogueText}</p>
          </div>
          <div className="flex justify-end">
            <button
              className="border text-xs px-2 py-1 flex items-center gap-x-2 bg-primary-foreground/75 hover:bg-primary-foreground transition-colors select-none"
              onClick={onClick}
              autoFocus
            >
              continuar ▶
            </button>
          </div>
        </div>

        {/* Right side - Character Image */}
        <div
          className={cn(
            "flex flex-col items-center border border-primary/20 w-44",
            styles.imageSection
          )}
        >
          <div className="p-2 z-10 relative">
            <img
              src={characterImage || "/placeholder.svg"}
              alt={characterName}
              className="w-full border border-primary/20 select-none"
            />
          </div>
          <div className="w-full text-center p-2 z-10 relative">
            <p className="font-cormorant text-xl text-white drop-shadow-md">
              {characterName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
