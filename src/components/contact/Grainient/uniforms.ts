const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

export interface UniformParams {
  timeSpeed: number;
  colorBalance: number;
  warpStrength: number;
  warpFrequency: number;
  warpSpeed: number;
  warpAmplitude: number;
  blendAngle: number;
  blendSoftness: number;
  rotationAmount: number;
  noiseScale: number;
  grainAmount: number;
  grainScale: number;
  grainAnimated: boolean;
  contrast: number;
  gamma: number;
  saturation: number;
  centerX: number;
  centerY: number;
  zoom: number;
  color1: string;
  color2: string;
  color3: string;
}

export function createUniforms(p: UniformParams) {
  return {
    iTime: { value: 0 },
    iResolution: { value: new Float32Array([1, 1]) },
    uTimeSpeed: { value: p.timeSpeed },
    uColorBalance: { value: p.colorBalance },
    uWarpStrength: { value: p.warpStrength },
    uWarpFrequency: { value: p.warpFrequency },
    uWarpSpeed: { value: p.warpSpeed },
    uWarpAmplitude: { value: p.warpAmplitude },
    uBlendAngle: { value: p.blendAngle },
    uBlendSoftness: { value: p.blendSoftness },
    uRotationAmount: { value: p.rotationAmount },
    uNoiseScale: { value: p.noiseScale },
    uGrainAmount: { value: p.grainAmount },
    uGrainScale: { value: p.grainScale },
    uGrainAnimated: { value: p.grainAnimated ? 1.0 : 0.0 },
    uContrast: { value: p.contrast },
    uGamma: { value: p.gamma },
    uSaturation: { value: p.saturation },
    uCenterOffset: { value: new Float32Array([p.centerX, p.centerY]) },
    uZoom: { value: p.zoom },
    uColor1: { value: new Float32Array(hexToRgb(p.color1)) },
    uColor2: { value: new Float32Array(hexToRgb(p.color2)) },
    uColor3: { value: new Float32Array(hexToRgb(p.color3)) },
  };
}
