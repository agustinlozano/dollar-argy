export function DialogueMenu({
  dialogueText = '"La gente me rechaza, merezco una oportunidad digna."',
  characterImage = "/characters/hornero-portrait.png",
  characterName = "Hornero Peso Argentino",
}) {
  return (
    <div className="h-[460px] w-[818px] border overflow-hidden p-20 z-30">
      <div
        role="presentation"
        className="pointer-events-none absolute inset-0 bg-[url('/textures/stiff-paint-opt.jpg')] bg-cover opacity-100 -z-20"
      ></div>
      {/* Left side - Dialogue */}
      <div className="flex h-full">
        <div className="p-8 border w-md max-w-md">
          <p className="text-primary/80 font-mono">{dialogueText}</p>
        </div>

        {/* Right side - Character Image */}
        <div className="flex flex-col items-center border bg-primary/10 w-52">
          <div className="p-2">
            <img
              src={characterImage || "/placeholder.svg"}
              alt={characterName}
              className="w-full"
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
