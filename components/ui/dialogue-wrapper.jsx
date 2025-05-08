import { useEffect, useState } from "react";
import { DialogueMenu } from "./dialogue-menu";
import { GothicBackgroundCard } from "./gothic-background-card";

export function DialogueWrapper({ toOpen }) {
  const [visible, setVisible] = useState(false);
  // const { dialogueText, characterImage, characterName } = useDialogueStore();

  useEffect(() => {
    if (toOpen) {
      setVisible(true);
    }
  }, [toOpen]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center">
      <GothicBackgroundCard>
        <DialogueMenu
          onClose={() => {
            console.log("closing");
            setVisible(false);
          }}
        />
      </GothicBackgroundCard>
    </div>
  );
}
