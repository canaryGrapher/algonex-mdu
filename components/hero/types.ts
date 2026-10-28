/** Anything the hero timeline can scrub: the hero video or the fallback intro. */
export type ProgressHandle = {
  setProgress: (progress: number) => void;
};

/** "skipped" means the download was intentionally avoided (data saver, reduced motion, slow network). */
export type HeroMediaStatus = "loading" | "ready" | "missing" | "skipped";
