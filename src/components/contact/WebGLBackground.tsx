"use client";

import { useRef, useEffect, useCallback } from "react";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Volumetric fire with domain-warped FBM, ridge tendrils,
// curl-noise swirling, bloom glow, and drifting ember particles.
const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_opacity;

  // ── 3D Hash noise (fast, no textures) ─────────────────
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f); // smoothstep

    return mix(
      mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
  }

  // ── Rotation matrix for octave variation ──────────────
  // Rotating between FBM octaves prevents axis-aligned artifacts
  // and creates more organic, swirling patterns
  mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
  }

  // ── FBM with rotated octaves ──────────────────────────
  float fbm(vec3 p) {
    float val = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 6; i++) {
      val += amp * noise3D(p * freq);
      // Rotate XZ between octaves for organic flow
      p.xz = rot(0.75) * p.xz;
      p.yz = rot(0.5) * p.yz;
      freq *= 2.02;
      amp *= 0.49;
    }
    return val;
  }

  // ── Ridge noise — creates bright fire tendrils ────────
  float ridgeNoise(vec3 p) {
    return 1.0 - abs(noise3D(p) * 2.0 - 1.0);
  }

  float ridgeFBM(vec3 p) {
    float val = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 5; i++) {
      float r = ridgeNoise(p * freq);
      r = r * r; // sharpen the ridges
      val += amp * r;
      p.xz = rot(0.6) * p.xz;
      freq *= 2.1;
      amp *= 0.45;
    }
    return val;
  }

  // ── Domain warping — noise feeds into noise ───────────
  // This is what creates the organic, fluid, smoke-like movement
  float warpedFire(vec2 uv, float t) {
    vec3 p = vec3(uv * 3.0, t * 0.4);

    // First warp layer
    float warp1 = fbm(p + vec3(0.0, -t * 0.6, t * 0.2));
    // Second warp layer (feeds first result back in)
    float warp2 = fbm(p + vec3(warp1 * 1.8, -t * 0.8, warp1));
    // Final fire shape — double-warped
    float fire = fbm(p + vec3(warp2 * 1.5, -t * 1.0 + warp1 * 0.5, warp2 * 0.8));

    return fire;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 st = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
    float t = u_time * 0.5;

    // ── 1. Main fire volume (domain-warped FBM) ─────────
    float fireBase = warpedFire(st, t);

    // Height-based falloff — fire rises from the bottom
    float heightMask = smoothstep(0.6, -0.5, st.y);
    // Side falloff for a natural fire shape
    float sideFade = 1.0 - smoothstep(0.3, 0.8, abs(st.x));
    fireBase *= heightMask * sideFade;

    // ── 2. Ridge tendrils — bright fire wisps ───────────
    vec3 tendrilCoord = vec3(st * 4.0, t * 0.6);
    tendrilCoord.y -= t * 1.2; // tendrils rise fast
    // Curl the tendrils with a swirl
    float swirl = sin(st.y * 4.0 + t) * 0.3;
    tendrilCoord.x += swirl;
    float tendrils = ridgeFBM(tendrilCoord);
    tendrils *= heightMask * 0.7;

    // ── 3. Combine fire layers ──────────────────────────
    float fireFinal = fireBase * 0.7 + tendrils * 0.4;

    // Boost intensity in the core center
    float coreFocus = 1.0 - smoothstep(0.0, 0.5, length(st * vec2(1.2, 0.8)));
    fireFinal *= 0.6 + coreFocus * 0.6;

    // ── 4. Fire color palette ───────────────────────────
    // Temperature mapping: dark embers → deep red → fire orange → gold → white-hot
    vec3 col;
    float temp = clamp(fireFinal, 0.0, 1.0);

    vec3 c0 = vec3(0.12, 0.02, 0.0);    // near-black ember
    vec3 c1 = vec3(0.5, 0.05, 0.0);     // deep red
    vec3 c2 = vec3(1.0, 0.3, 0.0);      // fire orange (#FF4D00)
    vec3 c3 = vec3(1.0, 0.65, 0.0);     // orange-gold
    vec3 c4 = vec3(1.0, 0.84, 0.0);     // gold (#FFD700)
    vec3 c5 = vec3(1.0, 0.95, 0.7);     // white-hot

    // Multi-stop gradient
    col = mix(c0, c1, smoothstep(0.0, 0.15, temp));
    col = mix(col, c2, smoothstep(0.15, 0.35, temp));
    col = mix(col, c3, smoothstep(0.35, 0.55, temp));
    col = mix(col, c4, smoothstep(0.55, 0.75, temp));
    col = mix(col, c5, smoothstep(0.75, 1.0, temp));

    // ── 5. Bloom / glow simulation ──────────────────────
    // Soft glow around bright areas
    float bloom = smoothstep(0.4, 0.9, fireFinal);
    col += vec3(1.0, 0.4, 0.05) * bloom * 0.25;

    // ── 6. Ember particles ──────────────────────────────
    // 20 glowing particles that drift upward with sway and trails
    float embers = 0.0;
    for (int i = 0; i < 20; i++) {
      float fi = float(i);
      // Varied speeds and offsets
      float speed = 0.08 + fract(fi * 0.317) * 0.15;
      float phase = fract(fi * 0.7618);
      // Spawn position — clustered toward center-bottom
      float xSpawn = (fract(fi * 0.1537 + 0.2) - 0.5) * aspect * 0.8;
      // Continuous loop via fract
      float life = fract(u_time * speed + phase);
      float yPos = mix(-0.5, 0.6, life);
      // Organic horizontal sway
      float sway = sin(u_time * 0.7 + fi * 2.7) * 0.08
                 + sin(u_time * 1.3 + fi * 4.1) * 0.03;
      vec2 ePos = vec2(xSpawn + sway, yPos);

      float d = length(st - ePos);
      // Soft glow falloff
      float glow = 0.0015 / (d * d + 0.0003);

      // Brightness: fade in, stay, fade out
      float fadeIn = smoothstep(0.0, 0.1, life);
      float fadeOut = 1.0 - smoothstep(0.7, 1.0, life);
      float pulse = 0.6 + 0.4 * sin(u_time * 2.5 + fi * 5.0);

      embers += glow * fadeIn * fadeOut * pulse * 0.12;
    }

    // Warm ember color
    col += vec3(1.0, 0.6, 0.15) * embers;

    // ── 7. Subtle pulsing (breathing) ───────────────────
    float breath = 0.92 + 0.08 * sin(u_time * 0.4);
    col *= breath;

    // ── 8. Vignette ─────────────────────────────────────
    float vig = 1.0 - smoothstep(0.4, 1.1, length(uv - 0.5) * 1.3);
    col *= vig;

    // ── 9. Final alpha — based on fire intensity ────────
    float alpha = fireFinal + embers * 0.5;
    alpha = clamp(alpha, 0.0, 1.0);
    alpha *= u_opacity;

    gl_FragColor = vec4(col * alpha, alpha);
  }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("WebGL shader error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vs: WebGLShader,
  fs: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("WebGL program error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const getOpacity = useCallback(() => {
    return document.documentElement.classList.contains("light") ? 0.55 : 0.85;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;

    // Full-screen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const opacityLoc = gl.getUniformLocation(program, "u_opacity");

    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let opacity = getOpacity();

    // Resize — render at slightly lower DPR for performance
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Theme observer
    const mo = new MutationObserver(() => {
      opacity = getOpacity();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Render loop
    const startTime = performance.now();
    const render = () => {
      const t = (performance.now() - startTime) / 1000;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, t);
      gl.uniform1f(opacityLoc, opacity);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      mo.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, [getOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
