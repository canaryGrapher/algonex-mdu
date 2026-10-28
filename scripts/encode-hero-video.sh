#!/usr/bin/env bash
# Encodes a hero clip for scroll scrubbing: H.264, no audio, short keyframe interval
# so seeking is instant, faststart so the browser can read it while it downloads.
#
# Usage:
#   scripts/encode-hero-video.sh <input.mp4 | "frames/frame_%04d.jpg"> <output.mp4> <width:height> [fps]
# Examples:
#   scripts/encode-hero-video.sh veo-16x9.mp4 public/video/hero-desktop.mp4 1920:1080
#   scripts/encode-hero-video.sh veo-9x16.mp4 public/video/hero-mobile.mp4 1080:1920
# Tune size with CRF (higher is smaller) and GOP (frames between keyframes) env vars.
set -euo pipefail

input="$1"; output="$2"; size="$3"; fps="${4:-}"
crf="${CRF:-24}"; gop="${GOP:-6}"

in_args=()
[[ -n "$fps" ]] && in_args+=(-framerate "$fps")

mkdir -p "$(dirname "$output")"
ffmpeg -y -hide_banner -loglevel error "${in_args[@]}" -i "$input" \
  -an -vf "scale=${size}:force_original_aspect_ratio=increase,crop=${size},format=yuv420p" \
  -c:v libx264 -preset veryfast -crf "$crf" -g "$gop" -keyint_min "$gop" -sc_threshold 0 \
  -movflags +faststart "$output"

echo "$output $(du -h "$output" | cut -f1)"
