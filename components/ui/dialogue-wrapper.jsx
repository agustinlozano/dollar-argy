import { useEffect, useState, useRef } from "react";
import { DialogueMenu } from "./dialogue-menu";
import { GothicBackgroundCard } from "./gothic-background-card";
import { useSound } from "@/hooks/useSound";
import { sleep } from "@/lib/utils";

export function DialogueWrapper({ toOpen }) {
  const [visible, setVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { play } = useSound("/sounds/ui-feedback.wav");
  // const { dialogueText, characterImage, characterName } = useDialogueStore();

  useEffect(() => {
    if (toOpen) {
      setIsAnimating(true);
      setVisible(true);

      sleep(200).then(() => play());
    }
  }, [toOpen]);

  const handleClose = () => {
    setIsAnimating(false);

    sleep(200).then(() => {
      play();
      setTimeout(() => setVisible(false), 500);
    });
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 transition-opacity duration-500"
      style={{ opacity: isAnimating ? 1 : 0 }}
    >
      <GothicBackgroundCard>
        <div
          className={`transform transition-all duration-500 ${
            isAnimating
              ? "scale-100 translate-y-0 opacity-100"
              : "scale-95 translate-y-8 opacity-0"
          }`}
        >
          <DialogueMenu onClose={handleClose} />
        </div>
      </GothicBackgroundCard>
    </div>
  );
}
