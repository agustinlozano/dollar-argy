import { create } from "zustand";
import { dialogues } from "@/lib/dialogues";
import { DialogueActionType } from "@/lib/dialogue.consts";
import { useInventoryStore } from "@/stores/useInventoryState";

export const useDialogueStore = create((set, get) => ({
  // State
  activeDialogue: null,
  currentStep: null,
  isDialogueActive: false,

  // Actions
  triggerDialogue: ({ slug }) => {
    const dialogue = dialogues[slug];
    if (!dialogue) {
      console.error(`Dialogue with ID ${slug} not found`);
      return;
    }

    // Find first step
    const firstStep = dialogue.steps.find((step) => !step.prev);

    set({
      activeDialogue: dialogue,
      currentStep: firstStep || dialogue.steps[0],
      isDialogueActive: true,
    });
  },

  nextStep: () => {
    const { activeDialogue, currentStep } = get();

    if (!activeDialogue || !currentStep) return;

    // If there's a next step, advance to it
    if (currentStep.next) {
      const nextStep = activeDialogue.steps.find(
        (step) => step.id === currentStep.next
      );
      if (nextStep) {
        set({ currentStep: nextStep });
        return;
      }
    }

    // Handle actions if present
    if (currentStep.action) {
      // Handle different action types
      switch (currentStep.action.type) {
        case DialogueActionType.END:
          set({
            activeDialogue: null,
            currentStep: null,
            isDialogueActive: false,
          });
          break;

        case DialogueActionType.GIVE_ITEM:
          const { itemId } = currentStep.action.payload;
          if (itemId) {
            const addToInventory = useInventoryStore.getState().add;
            addToInventory({ slug: itemId });
          }

          // If there's no next step, end the dialogue
          if (!currentStep.next) {
            set({
              activeDialogue: null,
              currentStep: null,
              isDialogueActive: false,
            });
          }
          break;

        case DialogueActionType.SET_FLAG:
          // Flag setting would be handled here
          // For now just continue to next step if any
          if (!currentStep.next) {
            set({
              activeDialogue: null,
              currentStep: null,
              isDialogueActive: false,
            });
          }
          break;

        default:
          // For unhandled action types, just continue or end if no next step
          if (!currentStep.next) {
            set({
              activeDialogue: null,
              currentStep: null,
              isDialogueActive: false,
            });
          }
      }
    }
  },

  endDialogue: () => {
    set({
      activeDialogue: null,
      currentStep: null,
      isDialogueActive: false,
    });
  },
}));
