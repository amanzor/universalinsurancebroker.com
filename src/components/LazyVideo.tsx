"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted looping video that downloads nothing until it is about to scroll
 * into view (shows its poster until then), and pauses when off screen.
 */
export default function LazyVideo({
  src,
  poster,
  className,
  label,
}: {
  src: string;
  poster: string;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setLoad(true);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  // Play/pause once the source is attached (with preload="none" the
  // download only starts on play()).
  useEffect(() => {
    const video = ref.current;
    if (!video || !load) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (visible && !reduceMotion) video.play().catch(() => {});
    else video.pause();
  }, [load, visible]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
      className={className}
      src={load ? src : undefined}
    />
  );
}
