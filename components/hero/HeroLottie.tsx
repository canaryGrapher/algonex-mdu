"use client";

import { useEffect, useImperativeHandle, useRef } from "react";
import type { AnimationItem } from "lottie-web";
import { site } from "@/lib/data";
import { usePortrait } from "@/lib/hooks";
import type { LottieStatus, ProgressHandle } from "./types";

type Props = {
  ref: React.Ref<ProgressHandle>;
  onStatus: (status: LottieStatus) => void;
};

async function fetchAnimation(path: string): Promise<unknown | null> {
  try {
    const res = await fetch(path);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Loads the 16:9 Lottie on landscape screens and the 9:16 one on portrait screens.
 * The files are video exports (one image per frame), so the canvas renderer is used:
 * it draws a single bitmap per frame instead of keeping 240 SVG images in the DOM.
 */
export default function HeroLottie({ ref, onStatus }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const anim = useRef<AnimationItem | null>(null);
  const progress = useRef(0);
  const portrait = usePortrait();

  const render = () => {
    const a = anim.current;
    if (!a) return;
    const frame = Math.round(progress.current * Math.max(a.totalFrames - 1, 0));
    if (frame !== Math.round(a.currentFrame)) a.goToAndStop(frame, true);
  };

  useImperativeHandle(ref, () => ({
    setProgress(p: number) {
      progress.current = p;
      render();
    },
  }));

  useEffect(() => {
    let cancelled = false;
    const path = portrait ? site.lottie.mobile : site.lottie.desktop;
    onStatus("loading");

    (async () => {
      const [data, lottie] = await Promise.all([
        fetchAnimation(path),
        import("lottie-web/build/player/lottie_light_canvas").then((m) => m.default),
      ]);
      if (cancelled || !container.current) return;
      if (!data) return onStatus("missing");

      const a = lottie.loadAnimation({
        container: container.current,
        renderer: "canvas",
        loop: false,
        autoplay: false,
        animationData: data,
        // Phones are taller than 9:16, so show the whole frame there and let the edges fade out.
        rendererSettings: { preserveAspectRatio: portrait ? "xMidYMid meet" : "xMidYMid slice", clearCanvas: true },
      });
      anim.current = a;

      let done = false;
      const ready = () => {
        if (cancelled || done) return;
        done = true;
        a.goToAndStop(0, true);
        render();
        onStatus("ready");
      };
      a.addEventListener("loaded_images", ready);
      // Safety net in case the image-loaded event never fires on a slow device.
      setTimeout(ready, 8000);
    })();

    const onResize = () => anim.current?.resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      anim.current?.destroy();
      anim.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portrait]);

  return (
    <div
      ref={container}
      className="absolute inset-0 [&>canvas]:!h-full [&>canvas]:!w-full [@media(max-aspect-ratio:1/1)]:[mask-image:linear-gradient(to_bottom,transparent_6%,black_16%,black_84%,transparent_94%)]"
    />
  );
}
