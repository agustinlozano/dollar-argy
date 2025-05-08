import { useEffect, useState, useRef } from "react";
import { DialogueMenu } from "./dialogue-menu";
import { GothicBackgroundCard } from "./gothic-background-card";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function DialogueWrapper({ toOpen }) {
  const [visible, setVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const openSoundRef = useRef(null);
  const closeSoundRef = useRef(null);
  // const { dialogueText, characterImage, characterName } = useDialogueStore();

  useEffect(() => {
    if (toOpen) {
      setIsAnimating(true);
      setVisible(true);

      sleep(200).then(() => {
        // Play open sound
        console.log("Playing open sound...", openSoundRef.current);
        if (openSoundRef.current) {
          openSoundRef.current.currentTime = 0;
          openSoundRef.current
            .play()
            .catch((e) => console.log("Audio play failed:", e));
        }
      });
    }
  }, [toOpen]);

  const handleClose = () => {
    setIsAnimating(false);

    sleep(200).then(() => {
      // Play close sound
      if (closeSoundRef.current) {
        closeSoundRef.current.currentTime = 0;
        closeSoundRef.current
          .play()
          .catch((e) => console.log("Audio play failed:", e));
      }
      // Delay hiding the component until animation completes
      setTimeout(() => {
        setVisible(false);
      }, 500); // Animation duration
    });
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 transition-opacity duration-500"
      style={{ opacity: isAnimating ? 1 : 0 }}
    >
      <audio ref={openSoundRef} src="/sounds/ui-feedback.wav" preload="auto" />
      <audio ref={closeSoundRef} src="/sounds/ui-feedback.wav" preload="auto" />
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
