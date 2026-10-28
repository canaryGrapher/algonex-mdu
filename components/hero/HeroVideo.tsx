"use client";

import { useEffect, useImperativeHandle, useRef } from "react";
import { site } from "@/lib/data";
import { shouldSkipHeavyMedia } from "@/lib/heavyMedia";
import { usePortraitState } from "@/lib/hooks";
import { useNearViewport } from "@/lib/useNearViewport";
import { createVideoScrubber } from "@/lib/videoScrubber";
import { loadVideoSource } from "@/lib/videoSource";
import type { HeroMediaStatus, ProgressHandle } from "./types";

type Props = {
  ref: React.Ref<ProgressHandle>;
  onStatus: (status: HeroMediaStatus) => void;
};

/**
 * Scroll-scrubbed hero clip: 16:9 on landscape screens, 9:16 on portrait screens.
 * Only one file is ever requested: nothing downloads until the orientation is known,
 * the hero is near the viewport, and the visitor has not asked to save data or motion.
 */
export default function HeroVideo({ ref, onStatus }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const scrubber = useRef<ReturnType<typeof createVideoScrubber> | null>(null);
  const progress = useRef(0);
  const portrait = usePortraitState();
  const near = useNearViewport(video);

  useImperativeHandle(ref, () => ({
    setProgress(p: number) {
      progress.current = p;
      scrubber.current?.setProgress(p);
    },
  }));

  useEffect(() => {
    if (shouldSkipHeavyMedia()) onStatus("skipped");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el || portrait === null || !near || shouldSkipHeavyMedia()) return;

    let cancelled = false;
    const abort = new AbortController();
    const path = portrait ? site.heroVideo.mobile : site.heroVideo.desktop;
    onStatus("loading");

    const onReady = () => {
      if (cancelled) return;
      scrubber.current?.destroy();
      scrubber.current = createVideoScrubber(el);
      scrubber.current.setProgress(progress.current);
      onStatus("ready");
    };
    const onError = () => !cancelled && onStatus("missing");

    (async () => {
      const src = await loadVideoSource(path, abort.signal);
      if (cancelled) return;
      if (!src) return onStatus("missing");

      el.addEventListener("loadeddata", onReady, { once: true });
      el.addEventListener("error", onError, { once: true });
      el.src = src;
      el.load();
    })();

    return () => {
      cancelled = true;
      // Stops a half-finished download if the orientation flips or the hero unmounts.
      abort.abort();
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("error", onError);
      scrubber.current?.destroy();
      scrubber.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portrait, near]);

  return (
    <video
      ref={video}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden
      tabIndex={-1}
      // Phones are taller than 9:16, so show the whole frame there and let the edges fade out.
      className="absolute inset-0 h-full w-full object-cover [@media(max-aspect-ratio:1/1)]:object-contain [@media(max-aspect-ratio:1/1)]:[mask-image:linear-gradient(to_bottom,transparent_6%,black_16%,black_84%,transparent_94%)]"
    />
  );
}
