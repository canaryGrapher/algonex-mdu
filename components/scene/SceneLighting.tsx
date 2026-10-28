"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * Studio reflections built from in-scene light panels, so no HDR file is fetched.
 * Colours follow the poster: ice white, violet and indigo.
 */
export default function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[6, 4, 4]} intensity={40} color="#ff9e8c" />
      <pointLight position={[-6, -3, 3]} intensity={30} color="#c23a2b" />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#0a0304"]} />
        <Lightformer form="rect" intensity={6} color="#ffffff" position={[0, 5, -6]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={5} color="#ff9e8c" position={[-6, 1, 0]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={5} color="#c23a2b" position={[6, -1, 0]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={2} color="#ffe3d8" position={[0, 0, 6]} scale={4} />
        <Lightformer form="circle" intensity={2} color="#ff6f5b" position={[0, -5, 2]} scale={3} />
      </Environment>
    </>
  );
}
