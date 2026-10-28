"use client";

import { Sparkles, Stars } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { usePortrait } from "@/lib/hooks";
import CameraRig from "./CameraRig";
import FloatingGlass from "./FloatingGlass";
import HeroLinkedLogo from "./HeroLinkedLogo";
import SceneLighting from "./SceneLighting";
import { useSceneActive } from "./useSceneActive";

/** Renders one frame on mount so shaders compile before the hand-off needs them. */
function WarmUp() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  }, [invalidate]);
  return null;
}

/** Full-screen black space with glass forms. Sits behind all page content. */
export default function SpaceScene() {
  const lite = usePortrait();
  const active = useSceneActive();

  return (
    <Canvas
      frameloop={active ? "always" : "demand"}
      dpr={[1, lite ? 1.25 : 1.6]}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
    >
      <color attach="background" args={["#0a0304"]} />
      <fog attach="fog" args={["#0a0304", 10, 26]} />
      <Suspense fallback={null}>
        <SceneLighting />
        <HeroLinkedLogo lite={lite} />
        <FloatingGlass count={lite ? 5 : 8} />
        <Stars radius={60} depth={40} count={lite ? 1500 : 3500} factor={3} saturation={0} fade speed={0.6} />
        <Sparkles count={lite ? 40 : 90} scale={[18, 10, 8]} size={2} speed={0.3} color="#ff9e8c" opacity={0.6} />
        <WarmUp />
      </Suspense>
      <CameraRig />
    </Canvas>
  );
}
