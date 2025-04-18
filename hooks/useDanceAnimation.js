import { useEffect, useRef } from "react";
import { useGameStore } from "@/stores/useGameState";

const DANCE_SEQUENCE = ["forward", "right", "backward", "left"];
const DANCE_STEP_DURATION = 800; // Increased for smoother animation

export function useDanceAnimation() {
  const danceRef = useRef({
    currentStepIndex: 0,
    intervalId: null,
  });

  const { movePlayer, isMoving, playerPosition, isDancing, setDanceState } =
    useGameStore();

  const startDance = () => {
    if (isDancing || isMoving) return;

    // Store initial position for camera reference
    setDanceState(true, { ...playerPosition });
    danceRef.current.currentStepIndex = 0;

    // Start the dance sequence loop
    danceRef.current.intervalId = setInterval(() => {
      // Check if we're still dancing using the store state
      if (!useGameStore.getState().isDancing) {
        clearInterval(danceRef.current.intervalId);
        return;
      }

      const currentStep = DANCE_SEQUENCE[danceRef.current.currentStepIndex];

      // Execute the movement command
      movePlayer(currentStep);

      // Move to next step
      danceRef.current.currentStepIndex =
        (danceRef.current.currentStepIndex + 1) % DANCE_SEQUENCE.length;
    }, DANCE_STEP_DURATION);
  };

  const stopDance = () => {
    if (!isDancing) return;

    setDanceState(false, null);
    if (danceRef.current.intervalId) {
      clearInterval(danceRef.current.intervalId);
      danceRef.current.intervalId = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (danceRef.current.intervalId) {
        clearInterval(danceRef.current.intervalId);
      }
    };
  }, []);

  return {
    startDance,
    stopDance,
  };
}
