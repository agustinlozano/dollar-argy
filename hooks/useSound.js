import { useRef, useCallback, useEffect } from "react";

// Global cache para instancias de Audio
const audioCache = new Map();

// Función para obtener o crear una instancia de Audio desde el cache
function getAudioFromCache(soundUrl, volume = 1, preload = true) {
  if (!audioCache.has(soundUrl)) {
    const audio = new Audio(soundUrl);
    audio.volume = volume;
    if (preload) {
      audio.preload = "auto";
    }

    // Agregar event listeners para limpiar el cache si es necesario
    audio.addEventListener("error", () => {
      console.warn(`Failed to load audio: ${soundUrl}`);
      audioCache.delete(soundUrl);
    });

    audioCache.set(soundUrl, audio);
  }

  const audio = audioCache.get(soundUrl);
  // Actualizar volumen si ha cambiado
  audio.volume = volume;

  return audio;
}

export function useSound(soundUrl, options = {}) {
  const timerId = useRef(null);
  const {
    volume = 1,
    preload = true,
    startTime = 0, // time to start the sound (optional)
    endTime = undefined, // time to end the sound (optional)
  } = options;

  // Obtener audio del cache global
  const getAudio = useCallback(() => {
    return getAudioFromCache(soundUrl, volume, preload);
  }, [soundUrl, volume, preload]);

  const play = useCallback(() => {
    const audio = getAudio();

    // Limpiar cualquier temporizador existente
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }

    // Crear una copia del audio para permitir reproducción simultánea
    const audioClone = audio.cloneNode();
    audioClone.volume = volume;
    audioClone.currentTime = startTime;

    // Si hay un tiempo de finalización, configurar un temporizador para detener el audio
    if (endTime !== undefined && endTime > startTime) {
      const duration = (endTime - startTime) * 1000; // Convertir a milisegundos

      // Reproducir el audio
      audioClone.play().catch((e) => {
        console.warn("Audio play failed:", e);
      });

      // Configurar el temporizador para detener el audio en el tiempo especificado
      timerId.current = setTimeout(() => {
        audioClone.pause();
        timerId.current = null;
      }, duration);
    } else {
      // Reproducir normalmente
      return audioClone.play().catch((e) => {
        console.warn("Audio play failed:", e);
      });
    }
  }, [getAudio, volume, startTime, endTime]);

  const stop = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
  }, []);

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
