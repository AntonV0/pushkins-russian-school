"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

type VideoPosterPlayerProps = {
  src: string;
  poster: string;
  ariaLabel: string;
  overlayTitle: string;
  overlayDescription: string;
  className?: string;
};

type PlaybackState = "idle" | "revealing" | "playing";

export function VideoPosterPlayer({
  src,
  poster,
  ariaLabel,
  overlayTitle,
  overlayDescription,
  className = "",
}: VideoPosterPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startTimeoutRef = useRef<number | null>(null);
  const controlsTimeoutRef = useRef<number | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>("idle");
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    return () => {
      if (startTimeoutRef.current) {
        window.clearTimeout(startTimeoutRef.current);
      }
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  async function playVideo() {
    const video = videoRef.current;
    if (!video || playbackState !== "idle") {
      return;
    }

    setPlaybackState("revealing");
    video.load();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const startDelay = prefersReducedMotion ? 0 : 320;
    const controlsDelay = prefersReducedMotion ? 0 : 560;

    startTimeoutRef.current = window.setTimeout(async () => {
      startTimeoutRef.current = null;
      setPlaybackState("playing");

      try {
        await video.play();
        controlsTimeoutRef.current = window.setTimeout(() => {
          controlsTimeoutRef.current = null;
          setShowControls(true);
        }, controlsDelay);
      } catch {
        setShowControls(true);
      }
    }, startDelay);
  }

  function resetPreview() {
    const video = videoRef.current;

    if (startTimeoutRef.current) {
      window.clearTimeout(startTimeoutRef.current);
      startTimeoutRef.current = null;
    }
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.load();
    }
    setShowControls(false);
    setPlaybackState("idle");
  }

  return (
    <div className="bg-brand-blue-strong">
    <div className="relative">
      <video
        ref={videoRef}
        className={className}
        controls={showControls}
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={ariaLabel}
        onPlay={() => setPlaybackState("playing")}
        onPause={() => {
          if (!videoRef.current?.ended && playbackState === "playing") {
            setShowControls(true);
          }
        }}
        onEnded={resetPreview}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support embedded video.
      </video>

      {playbackState !== "playing" ? (
        <button
          type="button"
          className={`video-preview-overlay group absolute inset-0 z-10 flex items-center justify-center overflow-hidden px-5 text-white transition-opacity duration-180 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-white/75 ${
            playbackState === "revealing"
              ? "pointer-events-none opacity-0"
              : "cursor-pointer opacity-100"
          }`}
          aria-label={`${overlayTitle}. ${overlayDescription}`}
          aria-disabled={playbackState === "revealing"}
          onClick={playVideo}
        >
          <span
            className={`relative z-10 block size-full text-center transition-opacity duration-180 ease-out ${
              playbackState === "revealing"
                ? "opacity-0"
                : "opacity-100"
            }`}
          >
            <span className="absolute left-1/2 top-1/2 flex size-[4.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-brand-blue-strong/88 text-white shadow-[var(--elevation-media-control)] backdrop-blur transition duration-300 group-hover:scale-105 group-hover:border-white sm:size-20">
              <span
                aria-hidden="true"
                className="video-play-ring absolute inset-0 rounded-full border border-white/55"
              />
              <span
                aria-hidden="true"
                className="video-play-ring video-play-ring-delay absolute inset-0 rounded-full border border-white/45"
              />
              <Play
                aria-hidden="true"
                strokeWidth={0}
                className="relative ml-1 size-7 fill-current drop-shadow-sm sm:size-8"
              />
            </span>
            <span className="hidden sm:block absolute left-1/2 top-[calc(50%+3.25rem)] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-lg border border-white/24 bg-brand-blue-strong/76 px-5 py-3 shadow-[var(--elevation-media-control)] backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ease-out group-hover:border-white/75 group-hover:bg-brand-blue-strong/84">
              <span className="mx-auto mb-2 block h-px w-12 bg-white/80" />
              <span className="block text-base font-semibold sm:text-lg">
                {overlayTitle}
              </span>
              <span className="mt-1 hidden text-sm leading-6 text-white/82 sm:block">
                {overlayDescription}
              </span>
            </span>
          </span>
        </button>
      ) : null}
    </div>
    <div className="@container border-t border-white/15 px-5 text-center text-white sm:hidden">
      <div className="py-3 @min-[285px]:py-4">
      <p className="text-base font-semibold leading-6">{overlayTitle}</p>
      <p className="mt-1 hidden text-sm leading-6 text-white/80 @min-[285px]:block">{overlayDescription}</p>
      </div>
    </div>
    </div>
  );
}
