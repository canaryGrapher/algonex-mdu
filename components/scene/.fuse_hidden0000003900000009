"use client";

import { useEffect, useState } from "react";
import { HERO_MARKS, heroProgress } from "@/lib/heroProgress";

/** False while the hero Lottie fully covers the screen, so WebGL can sleep. */
export function useSceneActive(): boolean {
  const [active, setActive] = useState(() => heroProgress.get() >= HERO_MARKS.sceneWake);

  useEffect(() => {
    const check = (p: number) => setActive(p >= HERO_MARKS.sceneWake);
    check(heroProgress.get());
    return heroProgress.subscribe(check);
  }, []);

  return active;
}
