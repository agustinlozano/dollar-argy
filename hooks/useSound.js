import { useRef, useCallback, useEffect } from "react";

export function useSound(soundUrl, options = {}) {
  const audioRef = useRef(null);
  const timerId = useRef(null);
  const {
    volume = 1,
    preload = true,
    startTime = 0, // time to start the sound (optional)
    endTime = undefined, // time to end the sound (optional)
  } = options;

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

    // Limpiar cualquier temporizador existente
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }

    // Configurar el tiempo de inicio
    audio.currentTime = startTime;

    // Si hay un tiempo de finalización, configurar un temporizador para detener el audio
    if (endTime !== undefined && endTime > startTime) {
      const duration = (endTime - startTime) * 1000; // Convertir a milisegundos

      // Reproducir el audio
      audio.play().catch((e) => {
        console.warn("Audio play failed:", e);
      });

      // Configurar el temporizador para detener el audio en el tiempo especificado
      timerId.current = setTimeout(() => {
        audio.pause();
        timerId.current = null;
      }, duration);
    } else {
      // Reproducir normalmente
      return audio.play().catch((e) => {
        console.warn("Audio play failed:", e);
      });
    }
  }, [getAudio, startTime, endTime]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = startTime;
    }

    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
  }, [startTime]);

  // Limpiar temporizadores al desmontar el componente
  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, []);

  return { play, stop };
}
