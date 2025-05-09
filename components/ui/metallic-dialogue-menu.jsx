import { CloseButton } from "./close-button";
import styles from "./metallic-dialogue-menu.module.css";
import { cn } from "@/lib/utils";

export function MetallicDialogueMenu({
  dialogueText = '"La gente me rechaza, merezco una oportunidad digna."',
  characterImage = "/characters/hornero-portrait.png",
  characterName = "Hornero Peso Argentino 🇦🇷",
  variant = "purple", // 'purple' o 'silver'
  onClose,
}) {
  return (
    <div
      className={cn(
        styles.metallicContainer,
        "rounded-lg",
        variant === "silver" ? styles.silver : styles.purple
      )}
    >
      {onClose && (
        <CloseButton onClick={onClose} className="!absolute !top-4 !right-4" />
      )}

      <div className="relative flex h-full w-full z-10">
        {/* Left side - Dialogue */}
        <div
          className={cn(
            "p-8 border border-primary/20 grow",
            styles.dialogueSection
          )}
        >
          <p className="text-primary/90 font-mono relative z-10">
            {dialogueText}
          </p>
        </div>

        {/* Right side - Character Image */}
        <div
          className={cn(
            "flex flex-col items-center border border-primary/20 w-52",
            styles.imageSection
          )}
        >
          <div className="p-2 z-10 relative">
            <img
              src={characterImage || "/placeholder.svg"}
              alt={characterName}
              className="w-full border border-primary/20"
            />
          </div>
          <div className="w-full text-center p-2 z-10 relative">
            <p className="font-cormorant text-lg text-white drop-shadow-md">
              {characterName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
