/**
 * Downloads a video fully into memory and returns a blob URL for it. Scroll scrubbing
 * jumps around the clip, so having every frame local avoids stalls mid-seek. Each path is
 * downloaded once; switching back to an orientation already shown reuses the blob.
 */
const cache = new Map<string, string>();

export async function loadVideoSource(path: string, signal: AbortSignal): Promise<string | null> {
  const cached = cache.get(path);
  if (cached) return cached;

  try {
    const res = await fetch(path, { signal });
    if (!res.ok) return null;
    const url = URL.createObjectURL(await res.blob());
    cache.set(path, url);
    return url;
  } catch {
    // Aborted or offline: the caller falls back to the poster intro.
    return null;
  }
}
