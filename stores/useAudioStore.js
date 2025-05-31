import { create } from "zustand";

// Lista de canciones disponibles
const SOUNDTRACK_LIST = [
  {
    id: "recant-thine-tales",
    title: "Recant Thine Tales",
    artist: "DST Technician",
    file: "/soundtracks/recant-thine-tales-by-dstechnician.mp3",
    duration: null, // Se calculará cuando se cargue
  },
  // Aquí se pueden agregar más canciones en el futuro
];

export const useAudioStore = create((set, get) => ({
  // Estado del reproductor
  isInitialized: false,
  isPlaying: false,
  currentTrack: null,
  currentTime: 0,
  volume: 0.05,
  isMuted: false,

  // Cola de reproducción
  playlist: [...SOUNDTRACK_LIST],
  queue: [],
  currentIndex: 0,

  // Referencias de audio
  audioRef: null,

  // Estado de carga
  isLoading: false,
  hasUserInteracted: false,

  // Inicializar el sistema de audio
  initialize: () => {
    const audio = new Audio();
    audio.volume = get().volume;
    audio.preload = "metadata";

    // Event listeners
    audio.addEventListener("loadstart", () => {
      set({ isLoading: true });
    });

    audio.addEventListener("loadedmetadata", () => {
      const { currentTrack } = get();
      if (currentTrack) {
        // Actualizar duración de la canción actual
        const updatedPlaylist = get().playlist.map((track) =>
          track.id === currentTrack.id
            ? { ...track, duration: audio.duration }
            : track
        );
        set({ playlist: updatedPlaylist });
      }
      set({ isLoading: false });
    });

    audio.addEventListener("canplaythrough", () => {
      set({ isLoading: false });
    });

    audio.addEventListener("play", () => {
      set({ isPlaying: true });
    });

    audio.addEventListener("pause", () => {
      set({ isPlaying: false });
    });

    audio.addEventListener("timeupdate", () => {
      set({ currentTime: audio.currentTime });
    });

    audio.addEventListener("ended", () => {
      get().playNext();
    });

    audio.addEventListener("error", (e) => {
      console.error("Error loading audio:", e);
      set({ isLoading: false, isPlaying: false });
    });

    set({
      audioRef: audio,
      isInitialized: true,
      currentTrack: SOUNDTRACK_LIST[0],
      queue: [...SOUNDTRACK_LIST],
    });
  },

  // Comenzar la música tras la primera interacción del usuario
  startMusic: async () => {
    const { audioRef, currentTrack, hasUserInteracted, isInitialized, volume } =
      get();

    if (!hasUserInteracted) {
      set({ hasUserInteracted: true });
    }

    if (!isInitialized) {
      get().initialize();
    }

    if (audioRef && currentTrack) {
      try {
        // Guardar el volumen original
        const originalVolume = volume;

        // Comenzar con volumen 0 para el fade-in
        audioRef.volume = 0;
        audioRef.src = currentTrack.file;
        await audioRef.play();

        // Aplicar fade-in de 1.5 segundos
        get().fadeVolume(originalVolume, 1500);
      } catch (error) {
        console.error("Error starting music:", error);
      }
    }
  },

  // Reproducir/pausar música
  togglePlayback: async () => {
    const { audioRef, isPlaying } = get();

    if (!audioRef) return;

    try {
      if (isPlaying) {
        audioRef.pause();
      } else {
        await audioRef.play();
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  },

  // Reproducir canción específica
  playTrack: async (trackId) => {
    const { audioRef, playlist, volume } = get();
    const track = playlist.find((t) => t.id === trackId);

    if (!track || !audioRef) return;

    const newIndex = playlist.findIndex((t) => t.id === trackId);

    set({
      currentTrack: track,
      currentIndex: newIndex,
      isLoading: true,
    });

    try {
      // Guardar el volumen original
      const originalVolume = volume;

      // Comenzar con volumen 0 para el fade-in
      audioRef.volume = 0;
      audioRef.src = track.file;
      await audioRef.play();

      // Aplicar fade-in de 1.5 segundos
      get().fadeVolume(originalVolume, 1500);
    } catch (error) {
      console.error("Error playing track:", error);
      set({ isLoading: false });
    }
  },

  // Siguiente canción
  playNext: () => {
    const { currentIndex, playlist } = get();
    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextTrack = playlist[nextIndex];

    if (nextTrack) {
      get().playTrack(nextTrack.id);
    }
  },

  // Canción anterior
  playPrevious: () => {
    const { currentIndex, playlist } = get();
    const prevIndex =
      currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    const prevTrack = playlist[prevIndex];

    if (prevTrack) {
      get().playTrack(prevTrack.id);
    }
  },

  // Cambiar volumen
  setVolume: (newVolume) => {
    const { audioRef } = get();
    const volume = Math.max(0, Math.min(1, newVolume));

    set({ volume });

    if (audioRef) {
      audioRef.volume = volume;
    }
  },

  // Silenciar/desilenciar
  toggleMute: () => {
    const { audioRef, isMuted, volume } = get();

    if (!audioRef) return;

    if (isMuted) {
      audioRef.volume = volume;
      set({ isMuted: false });
    } else {
      audioRef.volume = 0;
      set({ isMuted: true });
    }
  },

  // Agregar canción a la cola (para futuras interacciones con NPCs/objetos)
  queueTrack: (trackId) => {
    const { queue, playlist } = get();
    const track = playlist.find((t) => t.id === trackId);

    if (track && !queue.find((q) => q.id === trackId)) {
      set({ queue: [...queue, track] });
    }
  },

  // Limpiar cola
  clearQueue: () => {
    set({ queue: [...get().playlist] });
  },

  // Buscar posición específica en la canción
  seekTo: (time) => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.currentTime = time;
      set({ currentTime: time });
    }
  },

  // Obtener información de la canción actual
  getCurrentTrackInfo: () => {
    const { currentTrack, currentTime, audioRef } = get();
    return {
      track: currentTrack,
      currentTime,
      duration: audioRef?.duration || 0,
      progress: audioRef?.duration
        ? (currentTime / audioRef.duration) * 100
        : 0,
    };
  },

  // Funciones utilitarias para NPCs y objetos del juego

  // Reproducir una canción inmediatamente (para eventos especiales)
  playTrackImmediately: async (trackId) => {
    const { playTrack } = get();
    await playTrack(trackId);
  },

  // Agregar canción al final de la cola actual
  addToQueue: (trackId) => {
    const { queueTrack } = get();
    queueTrack(trackId);
  },

  // Cambiar el volumen gradualmente (para transiciones suaves)
  fadeVolume: (targetVolume, duration = 2000) => {
    const { audioRef, volume: currentVolume } = get();
    if (!audioRef) return;

    const startVolume = currentVolume;
    const startTime = Date.now();

    const fade = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const newVolume = startVolume + (targetVolume - startVolume) * progress;
      get().setVolume(newVolume);

      if (progress < 1) {
        requestAnimationFrame(fade);
      }
    };

    fade();
  },

  // Pausar música gradualmente (para diálogos importantes)
  fadeOutAndPause: (duration = 1000) => {
    const { volume, fadeVolume, togglePlayback, setVolume } = get();
    const originalVolume = volume;

    fadeVolume(0, duration);

    setTimeout(() => {
      togglePlayback(); // Pause
      setVolume(originalVolume); // Restore volume for when it resumes
    }, duration);
  },

  // Reanudar música gradualmente
  resumeAndFadeIn: async (duration = 1000) => {
    const { isPlaying, togglePlayback, fadeVolume, volume } = get();

    if (!isPlaying) {
      get().setVolume(0); // Start from silence
      await togglePlayback(); // Resume
      fadeVolume(volume, duration); // Fade back to original volume
    }
  },

  // Verificar si hay música reproduciéndose (útil para condiciones en el juego)
  isMusicPlaying: () => {
    const { isPlaying, hasUserInteracted } = get();
    return hasUserInteracted && isPlaying;
  },
}));
