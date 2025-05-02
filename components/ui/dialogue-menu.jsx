export function DialogueMenu({
  dialogueText = "You can raise just about anything in one of those... But some of the fancier fish are real fussy!",
  characterImage = "/placeholder.svg?height=100&width=100",
  characterName = "Character Name",
}) {
  return (
    <div className="h-[460px] w-[818px] border overflow-hidden py-20 z-30">
      <div
        role="presentation"
        className="pointer-events-none absolute inset-0 bg-[url('/textures/stiff-paint-opt.jpg')] bg-cover opacity-100 -z-20"
      ></div>
      {/* Left side - Dialogue */}
      <div className="flex h-full border px-8">
        <div className="flex-1 p-4 border">
          <p>{dialogueText}</p>
        </div>

        {/* Right side - Character Image */}
        <div className="w-1/3 flex flex-col items-center border">
          <div className="p-2">
            <img
              src={characterImage || "/placeholder.svg"}
              alt={characterName}
              className="w-full"
            />
          </div>
          <div className="w-full text-center p-2">
            <p>{characterName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
