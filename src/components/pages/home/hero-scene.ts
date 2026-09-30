import {
  CanvasTexture,
  Color,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  Texture,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";

import { DIVE, RISEN, SLOTS, fallAt, panAt, riseAt } from "./hero-story";

type RGB = [number, number, number];

export type HeroPalette = { ink: RGB; onInk: RGB; onPaper: RGB; paper: RGB; accent: RGB };
export type HeroStat = { value: string; label: string };
export type HeroSceneOptions = {
  images: string[];
  story: string[];
  stats: HeroStat[];
  palette: HeroPalette;
  fonts: { heading: string; mono: string };
};

export type HeroScene = {
  state: { intro: number; story: number };
  start: () => void;
  stop: () => void;
  resize: (axis?: number) => void;
  pointer: (x: number, y: number) => void;
  kick: (velocity: number) => void;
  renderOnce: () => void;
  dispose: () => void;
};

const PATH = {
  perspective: 30,
  cardW: 18,
  cardH: 25,
  corner: 0.7,
  birthH: 2.6,
  exitH: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
};
const CARDS = 9;
const SPEED = 18;
const RUSH = 14;
const PHOTO_ASPECT = 0.8;
const STAT_W = 576;
const STAT_H = 800;
const LEAD_OVERSCAN = 1.08;
const LEAD_ZOOM = 1.16;
const LEAD_PUSH = 0.34;
const PANEL_HOLD = 0.82;
const PANEL_BREATH = 0.07;
const RISE_PUSH = 0.2;
const DIM = 0.9;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const wrap = (v: number) => ((v % 1) + 1) % 1;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (p: number, a: number, b: number) => {
  const c = clamp((p - a) / (b - a), 0, 1);
  return c * c * (3 - 2 * c);
};
const glide = (p: number, a: number, b: number) => {
  const c = clamp((p - a) / (b - a), 0, 1);
  return lerp(c, c * c * (3 - 2 * c), 0.6);
};

function parseColor(value: string, fallback: RGB): RGB {
  const hex = value.trim().replace("#", "");
  if (/^[0-9a-f]{6}$/i.test(hex)) {
    return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
  }
  return fallback;
}

export function readHeroPalette(root: CSSStyleDeclaration): HeroPalette {
  return {
    ink: parseColor(root.getPropertyValue("--cs-ink"), [18, 16, 13]),
    onInk: parseColor(root.getPropertyValue("--cs-on-ink"), [239, 233, 224]),
    onPaper: parseColor(root.getPropertyValue("--cs-on-paper"), [28, 25, 21]),
    paper: parseColor(root.getPropertyValue("--cs-paper"), [247, 242, 234]),
    accent: parseColor(root.getPropertyValue("--brand-color"), [210, 69, 9]),
  };
}

const toColor = (c: RGB) => new Color().setRGB(c[0] / 255, c[1] / 255, c[2] / 255, SRGBColorSpace);
const css = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

const VERTEX = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT = `
uniform sampler2D uMap;
uniform float uDir;
uniform float uCrop;
uniform float uShift;
uniform float uIntro;
uniform vec3 uLine;
uniform vec2 uSize;
uniform float uCorner;
varying vec2 vUv;
void main() {
  vec2 p = (vUv - 0.5) * uSize;
  vec2 q = abs(p) - (uSize * 0.5 - uCorner);
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uCorner;
  float aa = fwidth(d);
  float shape = 1.0 - smoothstep(-aa, aa, d);
  vec2 uv = vec2((vUv.x - 0.5) * uCrop + 0.5, vUv.y);
  vec3 col = vec3(
    texture2D(uMap, uv + vec2(uShift, 0.0)).r,
    texture2D(uMap, uv).g,
    texture2D(uMap, uv - vec2(uShift, 0.0)).b
  );
  float side = uDir > 0.0 ? vUv.x : 1.0 - vUv.x;
  col *= mix(0.93, 1.0, side);
  float rim = smoothstep(-0.18, 0.0, d);
  col = mix(col, uLine, rim * 0.12);
  gl_FragColor = vec4(col, shape * uIntro);
  #include <colorspace_fragment>
}
`;

const LEAD_FRAGMENT = `
uniform sampler2D uMap;
uniform float uAspect;
uniform float uAlpha;
uniform float uDim;
uniform float uSpot;
uniform float uZoom;
uniform float uReveal;
uniform float uRise;
uniform float uCover;
uniform float uTime;
uniform vec2 uSize;
uniform vec2 uMouse;
uniform vec2 uDrift;
uniform vec2 uOrigin;
uniform vec2 uFlow;
uniform vec3 uInk;
uniform vec3 uPaper;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  float box = uSize.x / uSize.y;
  vec2 fit = box > uAspect ? vec2(1.0, uAspect / box) : vec2(box / uAspect, 1.0);
  vec3 col = texture2D(uMap, (vUv - 0.5) * fit / uZoom + 0.5 + uDrift).rgb;

  float reach = distance(vUv * vec2(box, 1.0), uMouse * vec2(box, 1.0));
  float spot = (1.0 - smoothstep(0.0, 0.5, reach)) * uSpot;
  float centre = 1.0 - smoothstep(0.0, 0.62, length((vUv - 0.5) * vec2(1.0, 1.15)));
  col = mix(col, uInk, uDim * mix(0.84, 1.0, centre) * (1.0 - spot * 0.4));

  float alpha = uAlpha;
  if (uReveal < 1.0 || uCover > 0.0) {
    vec2 c = (vUv - uOrigin) * vec2(box, 1.0);
    vec2 flow = uFlow * uTime;
    float warp = fbm(c * 1.5 - flow);
    float n = fbm(c * 2.3 + flow + warp * 1.4);
    vec3 cloud = uPaper * (0.84 + 0.16 * smoothstep(0.25, 0.75, warp));
    if (uReveal < 1.0) {
      float radial = length(c) / length(vec2(box, 1.0) * 0.5) - n * 0.9;
      float field = uRise > 0.5 ? vUv.y - n * 0.7 : radial;
      float front = mix(-0.85, 1.85, uReveal);
      float body = 1.0 - smoothstep(front - 0.16, front + 0.16, field);
      float clear = 1.0 - smoothstep(front - 0.85, front - 0.25, field);
      col = mix(cloud, col, clear);
      alpha *= body;
    }
    if (uCover > 0.0) {
      float field = (1.0 - vUv.y) - n * 0.7;
      float front = mix(-0.8, 1.9, uCover);
      float veil = 1.0 - smoothstep(front - 0.05, front + 0.3, field);
      float gone = 1.0 - smoothstep(front - 0.8, front - 0.22, field);
      col = mix(col, cloud, veil);
      alpha *= 1.0 - gone;
    }
  }
  gl_FragColor = vec4(col, alpha);
  #include <colorspace_fragment>
}
`;

function statTexture(
  stat: HeroStat,
  variant: number,
  align: "left" | "right",
  palette: HeroPalette,
  fonts: HeroSceneOptions["fonts"],
) {
  const canvas = document.createElement("canvas");
  canvas.width = STAT_W;
  canvas.height = STAT_H;
  const g = canvas.getContext("2d");
  if (g) {
    const schemes = [
      { bg: palette.accent, fg: palette.onInk, dim: 0.78 },
      { bg: palette.ink, fg: palette.onInk, dim: 0.6 },
      { bg: palette.onPaper, fg: palette.onInk, dim: 0.6 },
    ];
    const scheme = schemes[variant % schemes.length];
    const pad = 48;
    const x = align === "left" ? pad : STAT_W - pad;
    const fit = STAT_W * 0.46 - pad;
    g.textAlign = align;
    g.fillStyle = css(scheme.bg);
    g.fillRect(0, 0, STAT_W, STAT_H);
    g.textBaseline = "alphabetic";
    g.fillStyle = css(scheme.fg, scheme.dim);
    g.font = `500 22px ${fonts.mono}`;
    g.fillText("CODING SHARKS", x, pad + 22);
    g.fillStyle = css(variant % schemes.length === 0 ? scheme.fg : palette.accent);
    g.fillRect(align === "left" ? pad : STAT_W - pad - 56, pad + 48, 56, 4);

    let size = 168;
    g.font = `500 ${size}px ${fonts.heading}`;
    const width = g.measureText(stat.value).width;
    if (width > fit) size = Math.floor((size * fit) / width);
    g.font = `500 ${size}px ${fonts.heading}`;
    g.fillStyle = css(variant % schemes.length === 2 ? palette.accent : scheme.fg);
    const lines = stat.label.toUpperCase().split(" ");
    g.fillText(stat.value, x, STAT_H - pad - 24 - lines.length * 34);
    g.fillStyle = css(scheme.fg, scheme.dim);
    g.font = `500 26px ${fonts.mono}`;
    lines.forEach((line, i) => g.fillText(line, x, STAT_H - pad - (lines.length - 1 - i) * 34));
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function pathAt(u: number) {
  const scale = (PATH.birthH / PATH.cardH) * Math.pow(PATH.exitH / PATH.birthH, u);
  return {
    z: PATH.perspective * (1 - 1 / scale),
    rail: PATH.railExit - (PATH.railExit - PATH.railBirth) * Math.pow(1 - u, PATH.fan),
    turn: ((PATH.turnBirth + (PATH.turnExit - PATH.turnBirth) * u) * Math.PI) / 180,
  };
}

export async function createHeroScene(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  options: HeroSceneOptions,
): Promise<HeroScene> {
  const { images, story, stats, palette, fonts } = options;
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);

  const loader = new TextureLoader();
  let photos: Texture[];
  try {
    [photos] = await Promise.all([Promise.all(images.map((src) => loader.loadAsync(src))), document.fonts.ready]);
  } catch (error) {
    renderer.dispose();
    throw error;
  }
  const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  for (const t of photos) {
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = anisotropy;
  }
  const statCards = (["left", "right"] as const).map((align) =>
    stats.map((stat, i) => {
      const t = statTexture(stat, i, align, palette, fonts);
      t.anisotropy = anisotropy;
      return t;
    }),
  );

  const scene = new Scene();
  const camera = new PerspectiveCamera(60, 1, 0.5, 400);

  const shared = {
    uShift: { value: 0 },
    uIntro: { value: 0 },
    uLine: { value: toColor(palette.onPaper) },
    uSize: { value: new Vector2(PATH.cardW, PATH.cardH) },
    uCorner: { value: PATH.corner },
  };

  const geometry = new PlaneGeometry(PATH.cardW, PATH.cardH);
  const cards: { mesh: Mesh; material: ShaderMaterial; dir: 1 | -1; slot: number }[] = [];
  ([1, -1] as const).forEach((dir, rail) => {
    let photo = rail * 7;
    for (let i = 0; i < CARDS; i++) {
      const isStat = stats.length > 0 && i % 4 === 3;
      const map = isStat
        ? statCards[rail][(Math.floor(i / 4) + rail * 2) % stats.length]
        : photos[photo++ % photos.length];
      const material = new ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms: {
          ...shared,
          uMap: { value: map },
          uDir: { value: dir },
          uCrop: { value: isStat ? 1 : PATH.cardW / PATH.cardH / PHOTO_ASPECT },
        },
        transparent: true,
        depthWrite: false,
      });
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
      cards.push({ mesh, material, dir, slot: i / CARDS });
    }
  });

  const backdrops: (Texture | null)[] = story.map(() => null);
  let disposed = false;
  story.forEach((src, i) => {
    loader.load(src, (t) => {
      if (disposed) {
        t.dispose();
        return;
      }
      t.colorSpace = SRGBColorSpace;
      t.anisotropy = anisotropy;
      backdrops[i] = t;
    });
  });

  const leadShared = {
    uAlpha: { value: 0 },
    uDim: { value: 0 },
    uSpot: { value: 0 },
    uTime: { value: 0 },
    uSize: { value: new Vector2(PATH.cardH, PATH.cardH) },
    uInk: { value: toColor(palette.ink) },
    uPaper: { value: toColor(palette.paper) },
  };
  const leadGeometry = new PlaneGeometry(1, 1);
  const panels = story.map((_, i) => {
    const uniforms = {
      ...leadShared,
      uMap: { value: null as Texture | null },
      uAspect: { value: 1 },
      uZoom: { value: LEAD_ZOOM },
      uReveal: { value: i === 0 || i === RISEN ? 0 : 1 },
      uRise: { value: i === RISEN ? 1 : 0 },
      uCover: { value: 0 },
      uFlow: { value: new Vector2(0.04, -0.025) },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uDrift: { value: new Vector2(0, 0) },
      uOrigin: { value: new Vector2(0.5, 0.5) },
    };
    const material = new ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: LEAD_FRAGMENT,
      uniforms,
      transparent: true,
      depthWrite: false,
    });
    const mesh = new Mesh(leadGeometry, material);
    mesh.visible = false;
    mesh.renderOrder = 10 + i;
    scene.add(mesh);
    return { mesh, material, uniforms };
  });

  const aspectOf = (t: Texture) => {
    const image = t.image as { width?: number; height?: number } | undefined;
    return image?.width && image.height ? image.width / image.height : 1;
  };

  const state = { intro: 0, story: 0 };
  const pointerTarget = { x: 0, y: 0 };
  const pointerNow = { x: 0, y: 0 };
  let phase = 0;
  let clock = 0;
  let boost = 0;
  let boostTarget = 0;
  let spot = 0;
  let spotTarget = 0;
  let lastTime = 0;
  let frame = 0;
  let running = false;
  let axis = 0.52;
  let width = 1;
  let height = 1;
  let tanHalf = 1;

  const resize = (nextAxis?: number) => {
    if (nextAxis !== undefined) axis = clamp(nextAxis, 0.3, 0.8);
    width = host.clientWidth || 1;
    height = host.clientHeight || 1;
    const aspect = width / height;
    const zoom = aspect < 0.8 ? 4 : aspect < 1.25 ? 1.8 : 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 2));
    renderer.setSize(width, height, false);
    tanHalf = 100 / zoom / aspect / 2 / PATH.perspective;
    camera.aspect = aspect;
    camera.fov = (2 * Math.atan(tanHalf) * 180) / Math.PI;
    const panelWidth = (PATH.cardH * aspect) / LEAD_OVERSCAN;
    leadShared.uSize.value.set(panelWidth, PATH.cardH);
    for (const panel of panels) panel.mesh.scale.set(panelWidth, PATH.cardH, 1);
  };

  const draw = (dt: number) => {
    const k = dt > 0 ? 1 - Math.exp(-dt * 5) : 1;
    const rush = (1 - state.intro) * RUSH;
    boost += (boostTarget - boost) * k;
    boostTarget *= Math.exp(-dt * 4);
    phase += (dt / SPEED) * (1 + rush + boost);
    clock += dt * (1 + Math.abs(boost) * 0.35);
    pointerNow.x += (pointerTarget.x - pointerNow.x) * k;
    pointerNow.y += (pointerTarget.y - pointerNow.y) * k;
    spot += (spotTarget - spot) * k;

    const dive = glide(state.story, DIVE[0], DIVE[1]);
    const arrived = seg(dive, 0.86, 1);
    const cardsOut = seg(dive, 0.45, 0.9);

    shared.uIntro.value = clamp(state.intro * 1.6, 0, 1) * (1 - cardsOut);
    shared.uShift.value = clamp(boost * 0.0016 + rush * 0.0006, -0.014, 0.014);

    for (const card of cards) {
      const u = wrap(card.slot + phase);
      const at = pathAt(u);
      card.mesh.position.set(card.dir * at.rail * (1 + dive * 0.5), 0, at.z);
      card.mesh.rotation.y = -card.dir * at.turn;
    }

    const free = 1 - arrived;
    const pan = panAt(state.story);
    const rise = riseAt(state.story);
    const fall = fallAt(state.story);
    const camZ = PATH.perspective - dive * 8;
    const fillDistance = PATH.cardH / (2 * tanHalf) / LEAD_OVERSCAN;
    const spacing = (PATH.cardH * (width / height)) / LEAD_OVERSCAN;
    const offset = lerp(axis, 0.5, seg(dive, 0.15, 0.9)) - 0.5;
    const lift = (offset * PATH.cardH) / LEAD_OVERSCAN;
    camera.position.set(pointerNow.x * 1.6 * free + pan * spacing, -pointerNow.y * 1.1 * free, camZ);
    camera.setViewOffset(width, height, 0, -offset * height, width, height);
    camera.updateProjectionMatrix();

    const started = state.story > DIVE[0] * 0.5;
    leadShared.uAlpha.value = clamp(state.intro * 1.6, 0, 1);
    leadShared.uDim.value = seg(dive, 0.6, 1) * DIM;
    leadShared.uSpot.value = spot * arrived;
    leadShared.uTime.value = clock;
    panels.forEach((panel, i) => {
      const texture = backdrops[i];
      const stacked = i === RISEN;
      const slot = SLOTS[i] ?? i;
      const away = pan - slot;
      const near = Math.abs(away) < 1.05;
      const buried = i === RISEN - 1 && rise >= 1 && Boolean(backdrops[RISEN]);
      const shown = stacked ? rise > 0 && near : !buried && (i === 0 ? near : arrived > 0.999 && near);
      panel.mesh.visible = Boolean(texture) && started && shown;
      if (!panel.mesh.visible || !texture) return;
      const aspect = aspectOf(texture);
      const box = width / height / LEAD_OVERSCAN;
      const push = i === 0 ? (1 - dive) * (1 - dive) * LEAD_PUSH : stacked ? (1 - rise) * (1 - rise) * RISE_PUSH : 0;
      const zoom = LEAD_ZOOM + push + Math.abs(away) * PANEL_BREATH;
      const span = (box > aspect ? 1 : box / aspect) / zoom;
      panel.uniforms.uMap.value = texture;
      panel.uniforms.uAspect.value = aspect;
      panel.uniforms.uZoom.value = zoom;
      panel.uniforms.uDrift.value.set(-away * PANEL_HOLD * span - pointerNow.x * 0.012 * arrived, pointerNow.y * 0.01 * arrived);
      panel.uniforms.uMouse.value.set(pointerNow.x * 0.5 + 0.5 + away, 0.5 - pointerNow.y * 0.5);
      panel.mesh.position.set(slot * spacing, i === 0 ? lift : 0, camZ - fillDistance);
      if (stacked) {
        panel.uniforms.uReveal.value = rise;
        panel.uniforms.uFlow.value.set(0.012, -0.05);
      }
      if (i === panels.length - 1) {
        panel.uniforms.uCover.value = fall;
        panel.uniforms.uFlow.value.set(0.012, 0.05);
      }
      if (i === 0) {
        panel.uniforms.uReveal.value = dive;
        panel.uniforms.uOrigin.value.set(0.5, 0.5 - offset / LEAD_OVERSCAN);
      }
    });

    renderer.render(scene, camera);
  };

  const tick = (time: number) => {
    if (!running) return;
    const dt = lastTime ? Math.min(0.05, (time - lastTime) / 1000) : 0;
    lastTime = time;
    draw(dt);
    frame = requestAnimationFrame(tick);
  };

  resize();

  return {
    state,
    resize,
    start: () => {
      if (running) return;
      running = true;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    },
    stop: () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    },
    pointer: (x, y) => {
      pointerTarget.x = clamp(x, -1, 1);
      pointerTarget.y = clamp(y, -1, 1);
      spotTarget = 1;
    },
    kick: (velocity) => {
      boostTarget = clamp(velocity / 220, -9, 9);
    },
    renderOnce: () => draw(0),
    dispose: () => {
      disposed = true;
      running = false;
      if (frame) cancelAnimationFrame(frame);
      geometry.dispose();
      leadGeometry.dispose();
      for (const panel of panels) panel.material.dispose();
      for (const card of cards) card.material.dispose();
      for (const t of photos) t.dispose();
      for (const t of statCards.flat()) t.dispose();
      for (const t of backdrops) t?.dispose();
      renderer.dispose();
    },
  };
}
