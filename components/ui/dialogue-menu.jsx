import { X } from "lucide-react";

export function DialogueMenu({
  dialogueText = '"La gente me rechaza, merezco una oportunidad digna."',
  characterImage = "/characters/hornero-portrait.png",
  characterName = "Hornero Peso Argentino 🇦🇷",
  onClose,
}) {
  return (
    <div className="relative h-[460px] w-[818px] border overflow-hidden p-20 z-30">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-50 p-1 rounded-full border bg-card/50 hover:bg-primary/20 hover:border-primary/75 transform hover:scale-110 transition-all duration-200"
        >
          <X size={20} className="opacity-75" />
        </button>
      )}
      {/* Left side - Dialogue */}
      <div className="relative flex h-full">
        <div className="p-8 border w-md max-w-md">
          <p className="text-primary/80 font-mono">{dialogueText}</p>
        </div>

        {/* Right side - Character Image */}
        <div className="flex flex-col items-center border bg-primary/10 w-52">
          <div className="p-2">
            <img
              src={characterImage || "/placeholder.svg"}
              alt={characterName}
              className="w-full border"
            />
          </div>
          <div className="w-full text-center p-2 font">
            <p className="font-cormorant text-lg">{characterName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
