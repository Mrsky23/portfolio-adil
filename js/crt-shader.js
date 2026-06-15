// crt-shader.js — overlay WebGL CRT via Three.js
// Effets : pincushion 0.08 · scanlines 0.15 · vignette · bruit RGB bords

(function initCRTShader() {

  if (typeof THREE === 'undefined') return;

  const hero = document.getElementById('hero');
  if (!hero) return;

  // ── Renderer sur canvas dédié ──────────────────────────────
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
  renderer.setPixelRatio(1);

  const canvas = renderer.domElement;
  canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:10;';
  hero.appendChild(canvas);

  // ── Scène orthographique plein écran ──────────────────────
  const scene  = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // ── Uniforms ──────────────────────────────────────────────
  const uniforms = {
    iTime:       { value: 0 },
    iResolution: { value: new THREE.Vector2() },
  };

  // ── Vertex shader — passthrough ───────────────────────────
  const vertexShader = /* glsl */`
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

  // ── Fragment shader CRT ───────────────────────────────────
  const fragmentShader = /* glsl */`
uniform vec2  iResolution;
uniform float iTime;

/* Bruit pseudo-aléatoire */
float rand(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

/* Pincushion — bords courbent vers l'intérieur */
vec2 pincushion(vec2 uv, float k) {
  uv = uv * 2.0 - 1.0;
  uv *= 1.0 + k * dot(uv, uv);
  return uv * 0.5 + 0.5;
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution;
  uv.y    = 1.0 - uv.y;

  vec2 puv = pincushion(uv, 0.08);

  /* Zone hors de l'écran courbé — masque noir opaque */
  if (puv.x < 0.0 || puv.x > 1.0 || puv.y < 0.0 || puv.y > 1.0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  /* Scanlines horizontales fines */
  float line    = mod(floor(puv.y * iResolution.y), 2.0);
  float slAlpha = line * 0.15;

  /* Vignette noire sur les 4 bords */
  vec2  v        = puv * (1.0 - puv);
  float vign     = 1.0 - clamp(pow(v.x * v.y * 14.0, 0.38), 0.0, 1.0);
  float vigAlpha = vign * 0.72;

  /* Bruit RGB sur les bords */
  float edge = min(min(puv.x, 1.0 - puv.x), min(puv.y, 1.0 - puv.y));
  float mask = 1.0 - smoothstep(0.0, 0.18, edge);
  float nr   = rand(puv + vec2(iTime * 0.11, 0.30)) * mask * 0.07;
  float ng   = rand(puv + vec2(0.50, iTime * 0.13)) * mask * 0.07;
  float nb   = rand(puv + vec2(iTime * 0.09, 0.70)) * mask * 0.07;

  float alpha = clamp(max(slAlpha, vigAlpha) + (nr + ng + nb) / 3.0, 0.0, 1.0);

  gl_FragColor = vec4(vec3(nr, ng, nb), alpha);
}
`;

  // ── Quad plein écran ──────────────────────────────────────
  const geo = new THREE.PlaneGeometry(2, 2);
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthTest:   false,
    depthWrite:  false,
  });
  scene.add(new THREE.Mesh(geo, mat));

  // ── Resize ────────────────────────────────────────────────
  function resize() {
    const w = hero.offsetWidth  || window.innerWidth;
    const h = hero.offsetHeight || window.innerHeight;
    renderer.setSize(w, h);
    uniforms.iResolution.value.set(w, h);
  }

  resize();
  window.addEventListener('resize', resize);

  // ── Boucle de rendu ───────────────────────────────────────
  function frame(t) {
    uniforms.iTime.value = t * 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);

})();
