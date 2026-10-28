/** Anything the hero timeline can scrub: the Lottie player or the fallback intro. */
export type ProgressHandle = {
  setProgress: (progress: number) => void;
};

export type LottieStatus = "loading" | "ready" | "missing";
