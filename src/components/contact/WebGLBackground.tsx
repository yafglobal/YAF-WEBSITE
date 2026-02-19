"use client";

import { useRef, useEffect, useCallback } from "react";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Flowing ember cosmos — organic morphing blobs with domain-warped plasma,
// energy ribbons, soft bokeh orbs, bloom glow, and theme-adaptive palette.
const FRAGMENT_SHADER = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_opacity;
  uniform float u_theme; // 0.0 = dark, 1.0 = light

  /* ── Noise primitives ────────────────────────────── */
  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  /* Cheap 2-octave FBM for warping */
  float fbm2(vec2 p) {
    return noise2D(p) * 0.6 + noise2D(p * 2.1 + 3.7) * 0.3 + noise2D(p * 4.3 + 7.1) * 0.1;
  }

  /* ── Smooth min for organic blob merging ─────────── */
  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 st = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
    float t = u_time * 0.25; // slow, hypnotic pace

    /* ── 1. Domain-warped plasma field ────────────────
       Base layer — creates a smooth, flowing gradient
       that covers the entire screen. Double domain-warp
       gives organic, fluid motion. */

    vec2 warpUV = st * 1.8;
    float w1 = fbm2(warpUV + vec2(t * 0.3, -t * 0.2));
    float w2 = fbm2(warpUV + vec2(w1 * 1.5 - t * 0.1, w1 * 0.8 + t * 0.15));
    float plasma = fbm2(warpUV + vec2(w2 * 1.2, -w2 + t * 0.2));

    // Plasma interference — overlapping sine waves for structure
    float interference = 0.0;
    interference += sin(st.x * 5.0 + t * 0.8 + plasma * 3.0) * 0.5 + 0.5;
    interference += sin(st.y * 4.0 - t * 0.6 + w1 * 4.0) * 0.5 + 0.5;
    interference += sin((st.x + st.y) * 3.5 + t * 0.5) * 0.5 + 0.5;
    interference /= 3.0;

    float baseField = mix(plasma, interference, 0.35);

    /* ── 2. Morphing metaballs ───────────────────────
       7 organic blobs on slow orbital paths. SDF smooth
       union makes them merge and separate fluidly.
       Noise-distorted edges for organic feel. */

    // Each blob: position via Lissajous, pulsing radius
    vec2 bp[7];
    float br[7];
    bp[0] = vec2(sin(t * 0.83)       * 0.40, cos(t * 0.59)       * 0.35);
    bp[1] = vec2(cos(t * 0.71 + 1.0) * 0.50, sin(t * 0.47 + 2.0) * 0.30);
    bp[2] = vec2(sin(t * 0.53 + 3.0) * 0.35, cos(t * 0.79 + 1.5) * 0.45);
    bp[3] = vec2(cos(t * 0.91 + 0.5) * 0.45, sin(t * 0.37 + 4.0) * 0.38);
    bp[4] = vec2(sin(t * 0.43 + 2.5) * 0.38, cos(t * 0.67 + 3.0) * 0.32);
    bp[5] = vec2(cos(t * 0.37 + 5.0) * 0.30, sin(t * 0.89 + 1.0) * 0.48);
    bp[6] = vec2(sin(t * 0.67 + 4.0) * 0.52, cos(t * 0.41 + 5.0) * 0.42);

    br[0] = 0.14 + 0.03 * sin(t * 1.3);
    br[1] = 0.17 + 0.04 * sin(t * 1.0 + 1.0);
    br[2] = 0.11 + 0.02 * sin(t * 1.6 + 2.0);
    br[3] = 0.15 + 0.03 * sin(t * 1.2 + 3.0);
    br[4] = 0.13 + 0.03 * sin(t * 0.9 + 4.0);
    br[5] = 0.19 + 0.04 * sin(t * 1.4 + 5.0);
    br[6] = 0.12 + 0.02 * sin(t * 1.1 + 6.0);

    float field = 1e5;
    for (int i = 0; i < 7; i++) {
      // Distort the distance with noise for organic edges
      vec2 diff = st - bp[i];
      float nDist = noise2D(diff * 8.0 + t * 0.5) * 0.06;
      float d = length(diff) - br[i] + nDist;
      field = smin(field, d, 0.22);
    }

    // Convert SDF to smooth density
    float blobDensity = 1.0 - smoothstep(-0.08, 0.25, field);

    /* ── 3. Energy ribbons ──────────────────────────
       5 flowing parametric curves with glow trails
       that wind across the entire viewport. */

    float ribbons = 0.0;
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      float phase = fi * 1.2566; // ~2PI/5
      float speed = 0.3 + fi * 0.06;
      float amp = 0.12 + fi * 0.04;
      float freq = 2.5 + fi * 0.4;

      // Compound curve for more interesting shapes
      float curveY = sin(st.x * freq + t * speed + phase) * amp
                   + cos(st.x * freq * 0.6 + t * speed * 1.4 + phase * 1.7) * amp * 0.4
                   + noise2D(vec2(st.x * 2.0 + t * 0.15, fi * 7.0)) * 0.06;

      float d = abs(st.y - curveY);
      // Sharp core + wide glow
      float core = 0.002 / (d * d + 0.0008);
      float glow = 0.006 / (d * d + 0.004);
      ribbons += (core * 0.6 + glow * 0.4) * 0.012;
    }

    /* ── 4. Bokeh particles ─────────────────────────
       8 large, soft, diffuse circles that drift slowly
       for a sense of depth. */

    float bokeh = 0.0;
    for (int i = 0; i < 8; i++) {
      float fi = float(i);
      float speed = 0.06 + fract(fi * 0.27) * 0.04;
      float xP = sin(t * speed * 3.0 + fi * 2.4) * aspect * 0.5;
      float yP = cos(t * speed * 2.0 + fi * 1.8) * 0.45;
      float size = 0.08 + fract(fi * 0.41) * 0.12;

      float d = length(st - vec2(xP, yP));
      float b = smoothstep(size, size * 0.2, d);
      float pulse = 0.5 + 0.5 * sin(t * 0.8 + fi * 3.5);
      bokeh += b * pulse * 0.12;
    }

    /* ── 5. Combine all layers ──────────────────────── */
    float combined = baseField * 0.45 + blobDensity * 0.55 + ribbons + bokeh;
    combined = clamp(combined, 0.0, 1.0);

    /* ── 6. Color palette — theme adaptive ──────────── */
    float temp = combined;

    // Dark mode: charcoal → deep red → fire orange → gold → white-hot
    vec3 dark0 = vec3(0.06, 0.01, 0.0);
    vec3 dark1 = vec3(0.35, 0.04, 0.0);
    vec3 dark2 = vec3(1.0, 0.30, 0.0);   // #FF4D00
    vec3 dark3 = vec3(1.0, 0.60, 0.05);
    vec3 dark4 = vec3(1.0, 0.84, 0.0);   // #FFD700
    vec3 dark5 = vec3(1.0, 0.95, 0.75);  // white-hot

    vec3 darkCol = mix(dark0, dark1, smoothstep(0.0, 0.15, temp));
    darkCol = mix(darkCol, dark2, smoothstep(0.15, 0.35, temp));
    darkCol = mix(darkCol, dark3, smoothstep(0.35, 0.55, temp));
    darkCol = mix(darkCol, dark4, smoothstep(0.55, 0.78, temp));
    darkCol = mix(darkCol, dark5, smoothstep(0.78, 1.0, temp));

    // Light mode: warm ivory → soft peach → amber → golden → bright gold
    vec3 lit0 = vec3(0.96, 0.93, 0.88);
    vec3 lit1 = vec3(0.95, 0.72, 0.45);
    vec3 lit2 = vec3(0.98, 0.50, 0.12);
    vec3 lit3 = vec3(1.0, 0.68, 0.15);
    vec3 lit4 = vec3(1.0, 0.82, 0.25);
    vec3 lit5 = vec3(1.0, 0.92, 0.55);

    vec3 litCol = mix(lit0, lit1, smoothstep(0.0, 0.15, temp));
    litCol = mix(litCol, lit2, smoothstep(0.15, 0.35, temp));
    litCol = mix(litCol, lit3, smoothstep(0.35, 0.55, temp));
    litCol = mix(litCol, lit4, smoothstep(0.55, 0.78, temp));
    litCol = mix(litCol, lit5, smoothstep(0.78, 1.0, temp));

    vec3 col = mix(darkCol, litCol, u_theme);

    /* ── 7. Bloom glow ─────────────────────────────── */
    float bloom = smoothstep(0.45, 1.0, combined);
    vec3 bloomTint = mix(vec3(1.0, 0.35, 0.0), vec3(1.0, 0.75, 0.3), u_theme);
    col += bloomTint * bloom * 0.2;

    /* ── 8. Breathing pulse ────────────────────────── */
    col *= 0.93 + 0.07 * sin(u_time * 0.35);

    /* ── 9. Final output ───────────────────────────── */
    float alpha = combined * u_opacity;
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(col, alpha);
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

  const getThemeValues = useCallback(() => {
    const isLight = document.documentElement.classList.contains("light");
    return { opacity: isLight ? 0.5 : 0.8, theme: isLight ? 1.0 : 0.0 };
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
    const themeLoc = gl.getUniformLocation(program, "u_theme");

    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let { opacity, theme } = getThemeValues();

    // Resize — cap DPR for performance with complex shader
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

    // Theme observer — updates both opacity and color palette
    const mo = new MutationObserver(() => {
      const vals = getThemeValues();
      opacity = vals.opacity;
      theme = vals.theme;
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const startTime = performance.now();
    const render = () => {
      const t = (performance.now() - startTime) / 1000;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, t);
      gl.uniform1f(opacityLoc, opacity);
      gl.uniform1f(themeLoc, theme);

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
  }, [getThemeValues]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
