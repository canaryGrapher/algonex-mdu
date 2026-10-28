"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";
import { glassProps } from "./glass";

type Shape = {
  kind: "torus" | "knot" | "ico" | "octa" | "capsule" | "ring";
  position: [number, number, number];
  scale: number;
  speed: number;
};

const SHAPES: Shape[] = [
  { kind: "torus", position: [-5.2, 2.4, -3], scale: 1.1, speed: 0.6 },
  { kind: "knot", position: [5.6, -1.8, -4], scale: 0.9, speed: 0.4 },
  { kind: "ico", position: [-4.4, -2.8, -1.5], scale: 0.8, speed: 0.8 },
  { kind: "octa", position: [4.2, 2.9, -2], scale: 0.7, speed: 0.7 },
  { kind: "capsule", position: [-1.8, 3.8, -6], scale: 0.7, speed: 0.5 },
  { kind: "ring", position: [2.2, -4, -5], scale: 1.4, speed: 0.45 },
  { kind: "ico", position: [7.5, 1.2, -8], scale: 1.2, speed: 0.3 },
  { kind: "torus", position: [-8, -0.5, -9], scale: 1.6, speed: 0.25 },
];

function Geometry({ kind }: { kind: Shape["kind"] }) {
  switch (kind) {
    case "torus":
      return <torusGeometry args={[0.8, 0.28, 48, 96]} />;
    case "knot":
      return <torusKnotGeometry args={[0.7, 0.22, 160, 32]} />;
    case "ico":
      return <icosahedronGeometry args={[0.9, 0]} />;
    case "octa":
      return <octahedronGeometry args={[0.9, 0]} />;
    case "capsule":
      return <capsuleGeometry args={[0.35, 1, 16, 32]} />;
    case "ring":
      return <torusGeometry args={[1, 0.06, 24, 128]} />;
  }
}

function Piece({ shape }: { shape: Shape }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.2 * shape.speed;
    ref.current.rotation.y += delta * 0.3 * shape.speed;
  });

  return (
    <Float speed={shape.speed * 2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={shape.position} scale={shape.scale}>
        <Geometry kind={shape.kind} />
        <meshPhysicalMaterial {...glassProps} />
      </mesh>
    </Float>
  );
}

/** Glass objects drifting and rotating around the central mark. */
export default function FloatingGlass({ count }: { count: number }) {
  return (
    <group>
      {SHAPES.slice(0, count).map((s, i) => (
        <Piece key={i} shape={s} />
      ))}
    </group>
  );
}
