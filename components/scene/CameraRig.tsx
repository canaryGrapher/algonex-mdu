"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { HERO_MARKS } from "@/lib/heroProgress";

/** Scroll progress through the content below the hero (0 at the Register Now screen). */
function contentScroll(): number {
  const heroEnd = window.innerHeight * HERO_MARKS.pinLengthVh;
  const max = document.documentElement.scrollHeight - window.innerHeight - heroEnd;
  return max > 0 ? THREE.MathUtils.clamp((window.scrollY - heroEnd) / max, 0, 1) : 0;
}

/**
 * Eases the camera toward the pointer and dollies it as the visitor scrolls the
 * content. It stays put during the hero so the glass logo hand-off lines up.
 */
export default function CameraRig() {
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, pointer }, delta) => {
    const scroll = contentScroll();

    target.set(pointer.x * 0.8, pointer.y * 0.5 - scroll * 2, 9 - scroll * 3);
    camera.position.lerp(target, 1 - Math.pow(0.02, delta));
    camera.lookAt(0, -scroll * 2, 0);
    camera.rotateZ(scroll * 0.35);
  });

  return null;
}
