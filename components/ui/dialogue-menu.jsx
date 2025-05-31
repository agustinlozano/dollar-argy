import { CloseButton } from "./close-button";
import { cn } from "@/lib/utils";
import { useTypewriter } from "@/hooks/useTypewriter";
import styles from "./metallic-dialogue-menu.module.css";

export function MetallicDialogueMenu({
  dialogueText = '"La gente me rechaza, merezco una oportunidad digna."',
  characterImage = "/characters/hornero-portrait.jpg",
  characterName = "Hornero Peso Argentino 🇦🇷",
  variant = "purple", // 'purple', 'silver' o 'brown'
  onClose,
  onClick,
}) {
  const { displayedText, isTyping, skipToEnd } = useTypewriter(dialogueText, {
    speed: 40, // milliseconds between characters
    startDelay: 200,
  });

  const handleTextClick = () => {
    if (isTyping) {
      skipToEnd();
    }
  };

  return (
    <>
      {onClose && (
        <CloseButton onClick={onClose} className="absolute -top-6 right-0" />
      )}
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
        <div className="relative flex h-full w-full z-10">
          {/* Left side - Dialogue */}
          <div
            className={cn(
              "px-4 pt-4 pb-4 border border-primary/20 w-lg flex flex-col justify-between",
              styles.dialogueSection
            )}
          >
            <div
              className="text-primary/90 font-mono font-light relative z-10 grow w-full overflow-auto cursor-pointer"
              onClick={handleTextClick}
              title={isTyping ? "Click para saltar" : ""}
            >
              <p>
                {displayedText}
                {isTyping && (
                  <span className="inline-block animate-pulse ml-1">|</span>
                )}
              </p>
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
              "flex flex-col items-center border w-40 border-primary/20",
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
            <div className="w-full text-center px-2 pb-2 z-10 relative">
              <p className="font-cormorant drop-shadow-md leading-tight">
                {characterName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
