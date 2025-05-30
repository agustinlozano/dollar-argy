import { useAudioStore } from "@/stores/useAudioStore";
import { Badge } from "./badge";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
} from "lucide-react";

export function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    isLoading,
    volume,
    isMuted,
    hasUserInteracted,
    togglePlayback,
    toggleMute,
    playNext,
    playPrevious,
    setVolume,
    getCurrentTrackInfo,
  } = useAudioStore();

  // No mostrar el reproductor si el usuario no ha interactuado aún
  if (!hasUserInteracted || !currentTrack) {
    return null;
  }

  const trackInfo = getCurrentTrackInfo();
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 pointer-events-auto">
      <div className="bg-black/80 backdrop-blur-md border border-amber-500/30 rounded-lg p-3 min-w-[280px]">
        {/* Track Info */}
        <div className="text-amber-100 mb-2">
          <div className="font-semibold text-sm truncate">
            {currentTrack.title}
          </div>
          <div className="text-xs text-amber-200/70 truncate">
            by {currentTrack.artist}
          </div>
        </div>

        {/* Progress Bar */}
        {trackInfo.duration > 0 && (
          <div className="mb-2">
            <div className="flex justify-between text-xs text-amber-200/70 mb-1 select-none">
              <span>{formatTime(trackInfo.currentTime)}</span>
              <span>{formatTime(trackInfo.duration)}</span>
            </div>
            <div className="h-1 bg-amber-900/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${trackInfo.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* <button
              onClick={playPrevious}
              className="p-1 text-amber-200 hover:text-amber-100 transition-colors"
              title="Previous track"
            >
              <SkipBack size={16} />
            </button> */}

            <button
              onClick={togglePlayback}
              disabled={isLoading}
              className="p-2 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 rounded text-amber-100 transition-colors disabled:opacity-50"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause size={16} />
              ) : (
                <Play size={16} />
              )}
            </button>

            {/* <button
              onClick={playNext}
              className="p-1 text-amber-200 hover:text-amber-100 transition-colors"
              title="Next track"
            >
              <SkipForward size={16} />
            </button> */}
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1 text-amber-200 hover:text-amber-100 transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value);
                setVolume(newVolume);
                if (isMuted && newVolume > 0) {
                  toggleMute(); // Unmute if user moves the slider
                }
              }}
              className="w-16 h-1 bg-amber-900/50 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #d97706 0%, #d97706 ${
                  (isMuted ? 0 : volume) * 100
                }%, #451a03 ${(isMuted ? 0 : volume) * 100}%, #451a03 100%)`,
              }}
              title="Volume"
            />
          </div>
        </div>

        {/* Status Badge */}
        {isLoading && (
          <div className="mt-2">
            <Badge
              variant="outline"
              className="text-xs border-amber-500/30 text-amber-200"
            >
              Loading...
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
