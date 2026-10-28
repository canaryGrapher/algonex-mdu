"use client";

import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { fromSvg } from "./glass";

const v = (x: number, y: number) => new THREE.Vector3(...fromSvg(x, y));

/** Builds the "A" mark (two legs, the silk curve and three nodes) as one merged geometry. */
function buildLogoGeometry(lite: boolean): THREE.BufferGeometry {
  const segs = lite ? 48 : 96;
  const parts: THREE.BufferGeometry[] = [
    new THREE.TubeGeometry(new THREE.LineCurve3(v(38, 168), v(100, 34)), segs, 0.26, 32),
    new THREE.TubeGeometry(new THREE.LineCurve3(v(100, 34), v(162, 168)), segs, 0.26, 32),
    new THREE.TubeGeometry(
      new THREE.CubicBezierCurve3(v(50, 134), v(78, 104), v(122, 162), v(150, 134)),
      segs,
      0.16,
      24,
    ),
  ];
  const nodes: [number, number, number][] = [
    [100, 34, 0.3],
    [38, 168, 0.27],
    [162, 168, 0.27],
  ];
  for (const [x, y, r] of nodes) {
    const s = new THREE.SphereGeometry(r, 32, 32);
    s.translate(...fromSvg(x, y));
    parts.push(s);
  }
  return mergeGeometries(parts) ?? parts[0];
}

/** The ALGONEX "A" mark rebuilt in glass, slowly turning in space. */
export default function GlassLogo({ lite = false }: { lite?: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => buildLogoGeometry(lite), [lite]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y += delta * 0.25;
    mesh.current.rotation.x = Math.sin(t * 0.35) * 0.18;
    mesh.current.position.y = Math.sin(t * 0.6) * 0.12;
  });

  return (
    <mesh ref={mesh} geometry={geometry} scale={1.25}>
      <MeshTransmissionMaterial
        samples={lite ? 4 : 8}
        resolution={lite ? 256 : 512}
        thickness={0.6}
        roughness={0.04}
        chromaticAberration={0.35}
        anisotropicBlur={0.2}
        distortion={0.25}
        distortionScale={0.4}
        temporalDistortion={0.08}
        iridescence={1}
        iridescenceIOR={1.3}
        iridescenceThicknessRange={[100, 700]}
        color="#fff3ee"
        backside
        backsideThickness={0.4}
      />
    </mesh>
  );
}
