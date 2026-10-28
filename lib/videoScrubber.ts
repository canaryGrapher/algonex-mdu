/**
 * Seeks a paused video to a 0 to 1 progress value. Browsers handle one seek at a time,
 * so while a seek is running only the latest requested position is kept and applied next.
 */
export function createVideoScrubber(video: HTMLVideoElement) {
  let pending: number | null = null;
  // Skip seeks smaller than about half a frame (clips are 15 to 30 fps).
  const minStep = 1 / 60;

  const seek = (time: number) => {
    if (Math.abs(video.currentTime - time) < minStep) return;
    video.currentTime = time;
  };

  const onSeeked = () => {
    if (pending === null) return;
    const next = pending;
    pending = null;
    seek(next);
  };
  video.addEventListener("seeked", onSeeked);

  return {
    setProgress(progress: number) {
      if (!Number.isFinite(video.duration)) return;
      const time = Math.min(Math.max(progress, 0), 1) * Math.max(video.duration - 0.05, 0);
      if (video.seeking) pending = time;
      else seek(time);
    },
    destroy() {
      video.removeEventListener("seeked", onSeeked);
    },
  };
}
