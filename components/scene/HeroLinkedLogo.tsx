"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { HERO_MARKS as M, heroProgress } from "@/lib/heroProgress";
import GlassLogo from "./GlassLogo";

type Pose = { pos: [number, number, number]; scale: number };

/**
 * Where the glass "A" sits. At the hand-off it matches the video's final logo
 * (centred, a little above middle, icon sized). Then it grows and glides to its
 * resting place beside the content while the call to action comes in.
 */
const POSES: Record<"desktop" | "mobile", { handoff: Pose; rest: Pose }> = {
  desktop: {
    handoff: { pos: [0, 0.65, 0], scale: 0.42 },
    rest: { pos: [2.6, 0, 0], scale: 1 },
  },
  mobile: {
    handoff: { pos: [0, 0.69, 0], scale: 0.52 },
    rest: { pos: [0, 1.4, -2], scale: 0.7 },
  },
};

const smooth = (a: number, b: number, x: number) => THREE.MathUtils.smoothstep(x, a, b);

export default function HeroLinkedLogo({ lite }: { lite: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { handoff, rest } = POSES[lite ? "mobile" : "desktop"];
  const target = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const p = heroProgress.get();

    // 0 before the CTA starts, 1 once it has fully arrived.
    const glide = smooth(M.handoffEnd, 0.97, p);
    // Pop in from slightly smaller as the video dissolves.
    const appear = smooth(M.handoffStart, M.handoffEnd, p);

    target.current.set(
      THREE.MathUtils.lerp(handoff.pos[0], rest.pos[0], glide),
      THREE.MathUtils.lerp(handoff.pos[1], rest.pos[1], glide),
      THREE.MathUtils.lerp(handoff.pos[2], rest.pos[2], glide),
    );
    const scale = THREE.MathUtils.lerp(handoff.scale * (0.85 + 0.15 * appear), rest.scale, glide);

    const k = 1 - Math.pow(0.001, delta);
    g.position.lerp(target.current, k);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, scale, k));
  });

  return (
    <group ref={group} position={handoff.pos} scale={handoff.scale}>
      <GlassLogo lite={lite} />
    </group>
  );
}
