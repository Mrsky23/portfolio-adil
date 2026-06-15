// about.js — animations section #about

(function initAbout() {
  'use strict';

  /* ══════════════════════════════════════════════════════════
     0. GSAP — entrée au scroll
     ══════════════════════════════════════════════════════════ */
  let tiltReady = false;

  if (window.gsap) {
    gsap.from('.about__card', {
      y: 60, opacity: 0, duration: 0.8, ease: 'power3.out',
      clearProps: 'all',
      scrollTrigger: { trigger: '#about', start: 'top 75%' },
      onComplete: () => { tiltReady = true; },
    });
    gsap.from('.about__side-label', {
      opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.3,
      clearProps: 'opacity',
      scrollTrigger: { trigger: '#about', start: 'top 75%' },
    });
  } else {
    tiltReady = true;
  }

  /* ══════════════════════════════════════════════════════════
     1. Tilt 3D + 2. Holographique (toute la card)
        + 4. Drag spring avec throw & spin
     ══════════════════════════════════════════════════════════ */
  const card = document.querySelector('.about__card');
  if (!card) return;

  if (window.__holoDisabled) { tiltReady = true; tiltLoop(); return; }

  // La card doit être positionnée pour le canvas absolu
  card.style.position = 'relative';

  /* ── Canvas holographique sur toute la card ─────────────── */
  const hcvs = document.createElement('canvas');
  hcvs.style.cssText = [
    'position:absolute', 'inset:0', 'width:100%', 'height:100%',
    'pointer-events:none', 'z-index:2', 'mix-blend-mode:screen',
    'opacity:0', 'transition:opacity 0.35s',
  ].join(';');
  card.appendChild(hcvs);
  const hctx = hcvs.getContext('2d');
  let hKey = '';

  function resizeHolo() {
    hcvs.width  = card.offsetWidth;
    hcvs.height = card.offsetHeight;
    hKey = '';
  }
  resizeHolo();
  window.addEventListener('resize', resizeHolo);

  function drawHolo(rx, ry) {
    const key = rx.toFixed(1) + '|' + ry.toFixed(1);
    if (key === hKey) return;
    hKey = key;

    const W = hcvs.width, H = hcvs.height;
    hctx.clearRect(0, 0, W, H);

    // Bandes iridescentes — intensité × 0.5
    const angle = Math.atan2(ry / 8, rx / 6);
    const cx = W / 2, cy = H / 2, diag = Math.hypot(W, H) / 2;
    const cs = Math.cos(angle), sn = Math.sin(angle);
    const g = hctx.createLinearGradient(
      cx - cs * diag, cy - sn * diag,
      cx + cs * diag, cy + sn * diag
    );
    const hBase = ((ry / 8) * 180 + (rx / 6) * 90 + 360) % 360;
    for (let i = 0; i <= 12; i++)
      g.addColorStop(i / 12, `hsla(${(hBase + i * 30) % 360},100%,65%,0.026)`);
    hctx.fillStyle = g;
    hctx.fillRect(0, 0, W, H);

    // Specular — intensité × 0.15
    const sx = ( ry / 8 * 0.5 + 0.5) * W;
    const sy = (-rx / 6 * 0.5 + 0.5) * H;
    const sg = hctx.createRadialGradient(sx, sy, 0, sx, sy, W * 0.55);
    sg.addColorStop(0,   'rgba(255,255,255,0.027)');
    sg.addColorStop(0.4, 'rgba(255,255,255,0.006)');
    sg.addColorStop(1,   'rgba(255,255,255,0)');
    hctx.fillStyle = sg;
    hctx.fillRect(0, 0, W, H);
  }

  /* ── Tilt state ─────────────────────────────────────────── */
  let rx = 0, ry = 0, trx = 0, try_ = 0, isHov = false;

  /* ── Drag + throw + spin state ──────────────────────────── */
  let isDrag  = false, grabX = 0, grabY = 0;
  let ddx = 0, ddy = 0, dvx = 0, dvy = 0;      // déplacement card + vélocité
  let mvx = 0, mvy = 0, lastMX = 0, lastMY = 0; // vélocité souris
  let spinAngle = 0, spinV = 0;                  // rotation Z

  /* ── Idle float ─────────────────────────────────────────── */
  const floatStart = performance.now();

  /* ── RAF loop ───────────────────────────────────────────── */
  function tiltLoop() {
    const t = (performance.now() - floatStart) * 0.001;

    // Tilt cible : drag → vélocité · hover → souris · idle → lévitation
    if (isDrag) {
      try_ = Math.max(-30, Math.min(30, mvx * 2));
      trx  = Math.max(-20, Math.min(20, -mvy * 1.5));
    } else if (!isHov) {
      try_ = Math.sin(t * 0.7) * 3 + Math.sin(t * 1.3) * 1.5;
      trx  = Math.cos(t * 0.5) * 2 + Math.cos(t * 1.1) * 1;
    }

    // Lerp tilt — 0.04 (plus lent que before)
    rx  += (trx  - rx)  * 0.04;
    ry  += (try_ - ry)  * 0.04;

    // Spring déplacement (après throw, retour élastique vers 0)
    if (!isDrag) {
      dvx += (0 - ddx) * 0.04; dvx *= 0.88; ddx += dvx;
      dvy += (0 - ddy) * 0.04; dvy *= 0.88; ddy += dvy;
    }

    // Spin spring (rotateZ — oscillation et retour vers 0)
    spinV += (0 - spinAngle) * 0.04;
    spinV *= 0.94;
    spinAngle += spinV;

    if (tiltReady) {
      card.style.transform =
        `perspective(900px)` +
        ` rotateX(${rx.toFixed(3)}deg)` +
        ` rotateY(${ry.toFixed(3)}deg)` +
        ` rotateZ(${spinAngle.toFixed(3)}deg)` +
        ` scale(${isDrag ? 1.03 : 1})` +
        ` translate(${(ddx * 0.35).toFixed(2)}px,${(ddy * 0.35).toFixed(2)}px)`;
    }

    if (isHov || Math.abs(rx) > 0.05 || Math.abs(ry) > 0.05) drawHolo(rx, ry);

    requestAnimationFrame(tiltLoop);
  }

  /* ── Événements hover card ──────────────────────────────── */
  card.addEventListener('mouseenter', () => {
    isHov = true;
    hcvs.style.opacity = '1';
  });

  card.addEventListener('mouseleave', () => {
    if (!isDrag) {
      isHov = false;
      trx = 0; try_ = 0;
      hcvs.style.opacity = '0';
      hKey = '';
    }
  });

  /* ── Suivi souris global ────────────────────────────────── */
  window.addEventListener('mousemove', e => {
    // Vélocité souris — utilisée pour le tilt pendant le drag
    mvx = e.clientX - lastMX;
    mvy = e.clientY - lastMY;
    lastMX = e.clientX;
    lastMY = e.clientY;

    if (isDrag) {
      // Déplacement direct pendant le drag
      ddx = e.clientX - grabX;
      ddy = e.clientY - grabY;
    } else if (isHov) {
      // Tilt depuis position souris dans la card (±6deg X, ±8deg Y)
      const r  = card.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width  - 0.5;
      const ny = (e.clientY - r.top)  / r.height - 0.5;
      trx  = -ny * 12;
      try_ =  nx * 16;
    }
  }, { passive: true });

  /* ── Grab ───────────────────────────────────────────────── */
  card.addEventListener('mousedown', e => {
    e.preventDefault();
    isDrag = true;
    grabX  = e.clientX - ddx;
    grabY  = e.clientY - ddy;
    dvx = 0; dvy = 0;
    mvx = 0; mvy = 0;
    lastMX = e.clientX;
    lastMY = e.clientY;
    spinV = 0;
  });

  /* ── Release — throw avec vélocité ─────────────────────── */
  window.addEventListener('mouseup', () => {
    if (!isDrag) return;
    isDrag = false;
    // Applique la vélocité souris au moment du lâcher
    dvx = mvx * 1.2;
    dvy = mvy * 1.2;
    // SpinV basé sur la vélocité horizontale
    spinV = mvx * 0.12;
    // Retour tilt cible vers 0
    trx = 0; try_ = 0;
  });

  /* ══════════════════════════════════════════════════════════
     Drag hint — disparaît au premier mousedown
     ══════════════════════════════════════════════════════════ */
  (function () {
    const s = document.createElement('style');
    s.textContent =
      '@keyframes aboutDragFloat{' +
      '0%,100%{transform:translateX(-50%) translateY(-3px)}' +
      '50%{transform:translateX(-50%) translateY(3px)}' +
      '}';
    document.head.appendChild(s);

    const hint = document.createElement('span');
    hint.setAttribute('aria-hidden', 'true');
    hint.style.cssText =
      'position:absolute;bottom:16px;left:50%;' +
      'font-family:\'Unbounded\',sans-serif;font-size:10px;' +
      'color:rgba(255,255,255,0.3);letter-spacing:0.15em;' +
      'white-space:nowrap;pointer-events:none;z-index:3;' +
      'transition:opacity 0.6s ease;' +
      'animation:aboutDragFloat 1.8s ease-in-out infinite;';
    hint.textContent = '↕  DRAG';
    card.appendChild(hint);

    card.addEventListener('mousedown', function () {
      hint.style.opacity = '0';
    }, { once: true });
  })();

  tiltLoop();

  /* ══════════════════════════════════════════════════════════
     5. Bio — word reveal 3D au scroll
     ══════════════════════════════════════════════════════════ */
  const bioEl = document.querySelector('.about__bio');
  if (bioEl) {
    bioEl.innerHTML = bioEl.textContent.trim().split(/\s+/).map(w =>
      `<span style="display:inline-block;">${w}</span>`
    ).join(' ');

    const words = Array.from(bioEl.querySelectorAll('span'));
    bioEl.style.cssText += ';perspective:500px;perspective-origin:center 30%;overflow:visible;';

    function revealWords() {
      const vh = window.innerHeight;
      words.forEach(s => {
        const r = s.getBoundingClientRect();
        const t = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.45)));
        const e = 1 - Math.pow(1 - t, 3);
        s.style.transform = `translateZ(${(-80 + 80 * e).toFixed(2)}px) rotateX(${(25 - 25 * e).toFixed(2)}deg)`;
        s.style.opacity   = (0.08 + 0.92 * e).toFixed(3);
      });
    }

    window.addEventListener('scroll', revealWords, { passive: true });
    revealWords();
  }

  /* ══════════════════════════════════════════════════════════
     6. Particules curseur — canvas fixe grille 35px
     ══════════════════════════════════════════════════════════ */
  (function () {
    if (window.__particlesDisabled) return;
    const cvs = document.createElement('canvas');
    cvs.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9998;';
    document.body.appendChild(cvs);
    const ctx = cvs.getContext('2d');

    const GRID  = 35;
    const H_SPR = 0.004;
    const FRIC  = 0.88;
    const REPEL = 160;
    const LIGHT = 200;
    const LINE  = 55;
    const DOT   = 1.1;

    let W = 0, H = 0, pts = [], pmx = -9999, pmy = -9999;

    function buildGrid() {
      W = cvs.width  = window.innerWidth;
      H = cvs.height = window.innerHeight;
      pts = [];
      for (let bx = GRID / 2; bx < W; bx += GRID)
        for (let by = GRID / 2; by < H; by += GRID)
          pts.push({ bx, by, x: bx, y: by, vx: 0, vy: 0, a: 0 });
    }

    buildGrid();
    window.addEventListener('resize', buildGrid);
    window.addEventListener('mousemove', e => { pmx = e.clientX; pmy = e.clientY; }, { passive: true });

    function pFrame() {
      ctx.clearRect(0, 0, W, H);
      const active = [];

      pts.forEach(p => {
        const ex = pmx - p.x, ey = pmy - p.y;
        const d  = Math.hypot(ex, ey);
        p.a += ((d < LIGHT ? (1 - d / LIGHT) * 0.55 : 0) - p.a) * 0.12;
        if (d < REPEL && d > 0) { const f = (1 - d / REPEL) * 4; p.vx -= ex / d * f; p.vy -= ey / d * f; }
        p.vx += (p.bx - p.x) * H_SPR; p.vx *= FRIC; p.x += p.vx;
        p.vy += (p.by - p.y) * H_SPR; p.vy *= FRIC; p.y += p.vy;
        if (p.a > 0.01) active.push(p);
      });

      ctx.lineWidth = 0.5;
      for (let i = 0; i < active.length; i++) {
        const a = active[i];
        for (let j = i + 1; j < active.length; j++) {
          const b = active[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINE) {
            ctx.strokeStyle = `rgba(232,228,222,${(Math.min(a.a, b.a) * (1 - d / LINE) * 0.4).toFixed(3)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      pts.forEach(p => {
        if (p.a < 0.005) return;
        ctx.fillStyle = `rgba(232,228,222,${p.a.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, DOT, 0, Math.PI * 2); ctx.fill();
      });

      requestAnimationFrame(pFrame);
    }

    pFrame();
  })();

})();
