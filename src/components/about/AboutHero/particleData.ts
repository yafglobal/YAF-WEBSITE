export interface ParticleConfig {
  left: number;
  dur: number;
  del: number;
  size: number;
  op: number;
}

export const particles: ParticleConfig[] = [
  { left: 5, dur: 10, del: 0, size: 3, op: 0.3 },
  { left: 15, dur: 8, del: 1.5, size: 2, op: 0.5 },
  { left: 25, dur: 12, del: 3, size: 4, op: 0.25 },
  { left: 40, dur: 9, del: 0.5, size: 2, op: 0.4 },
  { left: 55, dur: 11, del: 2.5, size: 3, op: 0.35 },
  { left: 70, dur: 8, del: 4, size: 2, op: 0.5 },
  { left: 82, dur: 10, del: 1, size: 3, op: 0.3 },
  { left: 93, dur: 7, del: 3.5, size: 2, op: 0.4 },
];
