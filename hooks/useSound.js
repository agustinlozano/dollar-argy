import { useRef, useCallback } from "react";

export function useSound(soundUrl, options = {}) {
  const audioRef = useRef(null);
  const { volume = 1, preload = true } = options;

  // Lazy initialize audio element
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundUrl);
      audioRef.current.volume = volume;
      if (preload) {
        audioRef.current.preload = "auto";
      }
    }
    return audioRef.current;
  }, [soundUrl, volume, preload]);

  const play = useCallback(() => {
    const audio = getAudio();

    if (audio.paused || audio.currentTime === audio.duration) {
      audio.currentTime = 0;
      return audio.play().catch((e) => {
        console.warn("Audio play failed:", e);
      });
    } else {
      // Si el sonido ya está reproduciéndose, reiniciamos
      audio.currentTime = 0;
    }
  }, [getAudio]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
}
