type Listener = (progress: number) => void;

let progress = 0;
const listeners = new Set<Listener>();

/**
 * Scroll progress of the pinned hero (0 to 1), shared between the GSAP timeline
 * and the WebGL scene so the glass logo can pick up where the video ends.
 */
export const heroProgress = {
  get: () => progress,
  set(next: number) {
    if (next === progress) return;
    progress = next;
    listeners.forEach((l) => l(next));
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

/** Timeline marks (fractions of the hero scroll) used by both the DOM and the scene. */
export const HERO_MARKS = {
  /** How long the hero stays pinned, in viewport heights of scrolling. */
  pinLengthVh: 5,
  /** The "presents" card dissolves into the video over this first stretch of scroll. */
  presentsEnd: 0.1,
  videoEnd: 0.7,
  handoffStart: 0.68,
  handoffEnd: 0.8,
  ctaStart: 0.82,
  /** The scene starts rendering a little before it becomes visible, so shaders are warm. */
  sceneWake: 0.55,
} as const;
