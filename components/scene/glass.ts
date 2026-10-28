/** Shared physical-glass settings: clear, iridescent, like the poster's silk. */
export const glassProps = {
  transmission: 1,
  thickness: 1.2,
  roughness: 0.06,
  ior: 1.45,
  iridescence: 1,
  iridescenceIOR: 1.3,
  iridescenceThicknessRange: [120, 680] as [number, number],
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  envMapIntensity: 2.6,
  color: "#fff0ea",
  attenuationColor: "#ff6f5b",
  attenuationDistance: 2.4,
};

/** Converts brand-kit SVG coordinates (200x200, y down) into scene units. */
export const fromSvg = (x: number, y: number): [number, number, number] => [
  (x - 100) / 50,
  -(y - 100) / 50,
  0,
];
