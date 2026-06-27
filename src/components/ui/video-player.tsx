"use client";

import { useRef, useState, useEffect, useCallback, type FC } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export const VideoPlayer: FC<VideoPlayerProps> = ({
  src,
  poster,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showSpeed, setShowSpeed] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [started, setStarted] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [skipFeedback, setSkipFeedback] = useState<"back" | "forward" | null>(
    null,
  );

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const scheduleHide = useCallback(() => {
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 2500);
  }, [playing]);

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    scheduleHide();
  }, [scheduleHide]);

  useEffect(() => {
    return () => {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    };
  }, []);

  useEffect(() => {
    if (playing) scheduleHide();
    else {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
      setShowControls(true);
    }
  }, [playing, scheduleHide]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!started) setStarted(true);
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, [started]);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const val = parseFloat(e.target.value);
    v.volume = val;
    setVolume(val);
    setMuted(val === 0);
    v.muted = val === 0;
  };

  const skip = (sec: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + sec));
    setSkipFeedback(sec < 0 ? "back" : "forward");
    setTimeout(() => setSkipFeedback(null), 600);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || seeking) return;
    setCurrentTime(v.currentTime);
    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    if (v.buffered.length > 0) {
      setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    setSeeking(true);
    handleProgressClick(e);
  };

  const setPlaybackSpeed = (s: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = s;
    setSpeed(s);
    setShowSpeed(false);
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!started) return;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
      if (e.code === "ArrowLeft") skip(-10);
      if (e.code === "ArrowRight") skip(10);
      if (e.code === "KeyM") toggleMute();
      if (e.code === "KeyF") toggleFullscreen();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [started, togglePlay]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative group/video overflow-hidden border border-white/8 bg-black select-none",
        className,
      )}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => playing && setShowControls(false)}
      onTouchStart={showControlsTemporarily}>
      {/* Video */}
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setPlaying(false)}
          onMouseUp={() => setSeeking(false)}
          playsInline
          preload="metadata"
        />

        {/* Centre click overlay */}
        <div
          className="absolute inset-0 cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={togglePlay}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              togglePlay();
            }
          }}
          aria-label={playing ? "Pause" : "Play"}
        />

        {/* Big play button (before start) */}
        {!started && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
            onClick={togglePlay}>
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center rounded-full justify-center bg-primary text-white shadow-[0_0_40px_rgba(255,107,44,0.5)] transition-all duration-300 hover:scale-110 active:scale-95">
              <Play className="h-6 w-6 sm:h-8 sm:w-8 fill-white ml-1" />
            </div>
          </div>
        )}

        {/* Skip feedback */}
        {skipFeedback && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
            <div
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 bg-black/70 backdrop-blur text-white text-xs font-bold rounded",
                skipFeedback === "back" ? "flex-row-reverse" : "",
              )}>
              {skipFeedback === "back" ? (
                <>
                  <RotateCcw className="h-4 w-4" /> 10s
                </>
              ) : (
                <>
                  <RotateCw className="h-4 w-4" /> 10s
                </>
              )}
            </div>
          </div>
        )}

        {/* Controls bar */}
        {started && (
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 z-10 transition-all duration-300",
              showControls
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none",
            )}>
            {/* Gradient */}
            <div className="h-20 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />

            <div className="bg-black/60 backdrop-blur-sm px-3 pb-3 pt-1 space-y-2">
              {/* Progress bar */}
              <div
                ref={progressRef}
                className="relative h-1 sm:h-1.5 bg-white/20 cursor-pointer group/bar rounded-full"
                onClick={handleProgressClick}
                onMouseMove={handleProgressDrag}
                onMouseUp={() => setSeeking(false)}>
                {/* Buffered */}
                <div
                  className="absolute inset-y-0 left-0 bg-white/25 rounded-full"
                  style={{ width: `${buffered}%` }}
                />
                {/* Progress */}
                <div
                  className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
                {/* Thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary opacity-0 group-hover/bar:opacity-100 transition-opacity shadow-md"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>

              {/* Buttons row */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="p-1.5 text-white hover:text-primary transition-colors"
                  aria-label={playing ? "Pause" : "Play"}>
                  {playing ? (
                    <Pause className="h-4 w-4 fill-current" />
                  ) : (
                    <Play className="h-4 w-4 fill-current" />
                  )}
                </button>

                {/* 10s back */}
                <button
                  onClick={() => skip(-10)}
                  className="p-1.5 text-white/70 hover:text-white transition-colors"
                  aria-label="Rewind 10 seconds">
                  <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>

                {/* 10s forward */}
                <button
                  onClick={() => skip(10)}
                  className="p-1.5 text-white/70 hover:text-white transition-colors"
                  aria-label="Forward 10 seconds">
                  <RotateCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>

                {/* Volume */}
                <button
                  onClick={toggleMute}
                  className="p-1.5 text-white/70 hover:text-white transition-colors"
                  aria-label={muted ? "Unmute" : "Mute"}>
                  {muted || volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>

                {/* Volume slider — hidden on very small screens */}
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="hidden sm:block w-16 md:w-20 h-1 accent-primary cursor-pointer"
                  aria-label="Volume"
                />

                {/* Time */}
                <span className="text-[10px] sm:text-xs text-white/60 font-mono ml-1">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Speed */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeed((p) => !p)}
                    className="flex items-center gap-1 p-1.5 text-white/70 hover:text-white transition-colors text-[10px] sm:text-xs font-bold"
                    aria-label="Playback speed">
                    <Gauge className="h-3.5 w-3.5 shrink-0" />
                    <span className="hidden sm:inline">{speed}x</span>
                  </button>
                  {showSpeed && (
                    <div className="absolute bottom-8 right-0 bg-[#1a1a1a] border border-white/10 rounded shadow-xl z-20 py-1 min-w-[64px]">
                      {SPEEDS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setPlaybackSpeed(s)}
                          className={cn(
                            "w-full px-3 py-1.5 text-xs text-left hover:bg-white/10 transition-colors",
                            s === speed
                              ? "text-primary font-bold"
                              : "text-white/70",
                          )}>
                          {s}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 text-white/70 hover:text-white transition-colors"
                  aria-label={
                    fullscreen ? "Exit fullscreen" : "Enter fullscreen"
                  }>
                  {fullscreen ? (
                    <Minimize className="h-4 w-4" />
                  ) : (
                    <Maximize className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
