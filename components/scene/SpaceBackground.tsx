"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SpaceScene = dynamic(() => import("./SpaceScene"), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Fixed layer behind the page. A CSS gradient shows while WebGL loads or if it is unavailable. */
export default function SpaceBackground() {
  const [webgl, setWebgl] = useState(false);

  useEffect(() => setWebgl(supportsWebGL()), []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse at 70% 40%, rgb(194 58 43 / .22), transparent 55%), radial-gradient(ellipse at 15% 85%, rgb(255 111 91 / .16), transparent 50%), #0a0304",
      }}
    >
      {webgl && <SpaceScene />}
    </div>
  );
}
