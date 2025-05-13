import { CloseButton } from "./close-button";

export function DialogueMenu({
  dialogueText = '"La gente me rechaza, merezco una oportunidad digna."',
  characterImage = "/characters/hornero-portrait.jpg",
  characterName = "Hornero Peso Argentino 🇦🇷",
  onClose,
}) {
  return (
    <div className="relative h-[460px] w-[818px] border overflow-hidden p-20 z-30">
      {onClose && <CloseButton onClick={onClose} />}
      {/* Left side - Dialogue */}
      <div className="relative flex h-full">
        <div className="p-8 border w-md max-w-md">
          <p className="text-primary/80 font-mono">{dialogueText}</p>
        </div>

        {/* Right side - Character Image */}
        <div className="flex flex-col items-center border bg-primary/10 w-52">
          <div className="p-2 w-full">
            <img
              src={characterImage || "/placeholder.svg"}
              alt={characterName}
              className="w-full h-full border object-cover"
              width={190.7}
              height={190.7}
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
