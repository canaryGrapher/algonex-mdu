#!/usr/bin/env python3
"""
Unpacks a frame-by-frame Lottie export (one embedded image per layer) into a numbered
JPEG sequence at the Lottie's frame rate, so it can be encoded as a normal video.

Usage: python3 scripts/lottie-to-frames.py <lottie.json> <out_dir>
Prints the frame rate, which encode-hero-video.sh needs for image sequences.
"""
import base64
import json
import os
import sys


def main(src: str, out_dir: str) -> None:
    data = json.load(open(src))
    images = {a["id"]: a["p"] for a in data["assets"] if "p" in a}
    os.makedirs(out_dir, exist_ok=True)

    frame = 0
    for layer in sorted(data["layers"], key=lambda l: l["ip"]):
        raw = base64.b64decode(images[layer["refId"]].split(",", 1)[1])
        for _ in range(int(layer["op"]) - int(layer["ip"])):
            with open(os.path.join(out_dir, f"frame_{frame:04d}.jpg"), "wb") as fh:
                fh.write(raw)
            frame += 1

    print(data["fr"])


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
