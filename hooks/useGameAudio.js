import { useEffect, useCallback } from "react";
import { useAudioStore } from "@/stores/useAudioStore";

export const useGameAudio = () => {
  const {
    startMusic,
    hasUserInteracted,
    isInitialized,
    initialize,
    isPlaying,
    currentTrack,
    togglePlayback,
    setVolume,
    toggleMute,
    playNext,
    playPrevious,
    getCurrentTrackInfo,
  } = useAudioStore();

  // Inicializar el sistema de audio cuando el componente se monta
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // Handler para la primera interacción del usuario
  const handleFirstInteraction = useCallback(async () => {
    if (!hasUserInteracted) {
      try {
        await startMusic();
      } catch (error) {
        console.error("Error al iniciar la música:", error);
      }
    }
  }, [hasUserInteracted, startMusic]);

  // Agregar listeners para detectar la primera interacción
  useEffect(() => {
    if (hasUserInteracted) return;

    const events = ["keydown", "click", "touchstart"];

    const handleInteraction = () => {
      handleFirstInteraction();
      // Remover listeners después de la primera interacción
      events.forEach((event) => {
        document.removeEventListener(event, handleInteraction);
      });
    };

    events.forEach((event) => {
      document.addEventListener(event, handleInteraction, { once: true });
    });

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [hasUserInteracted, handleFirstInteraction]);

  // Controles de audio que pueden ser utilizados desde el juego
  const audioControls = {
    play: startMusic,
    pause: () => togglePlayback(),
    toggle: togglePlayback,
    next: playNext,
    previous: playPrevious,
    setVolume,
    mute: toggleMute,
    getInfo: getCurrentTrackInfo,
  };

  // Estado del audio que puede ser consultado desde el juego
  const audioState = {
    isPlaying,
    hasStarted: hasUserInteracted,
    currentTrack,
    isInitialized,
  };

  return {
    audioControls,
    audioState,
    handleFirstInteraction,
  };
};
