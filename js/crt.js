// crt.js — désactivé
(function initCRT() {

  const canvas = document.getElementById('crt-global');
  if (!canvas) return; // canvas supprimé du HTML → sortie immédiate
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // ── Positionnement fixe ───────────────────────────────────
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;' +
    'pointer-events:none;z-index:60;' +
    'opacity:1;transition:opacity 0.5s ease;';

  // ── Buffer grain (256×256) ────────────────────────────────
  const NS = 256;
  const nc = document.createElement('canvas');
  nc.width = nc.height = NS;
  const nx = nc.getContext('2d');

  function genNoise() {
    const d = nx.createImageData(NS, NS);
    for (let i = 0; i < d.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
      d.data[i + 3] = 255;
    }
    nx.putImageData(d, 0, 0);
  }

  // ── Resize ────────────────────────────────────────────────
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let scan = 0;

  // ── Boucle de rendu ───────────────────────────────────────
  function frame() {
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    scan = (scan + 0.3) % 3;
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    for (let y = scan | 0; y < H; y += 3) {
      ctx.fillRect(0, y, W, 1);
    }

    genNoise();
    const pat = ctx.createPattern(nc, 'repeat');
    if (pat) {
      ctx.save();
      ctx.globalAlpha = 0.03;
      ctx.fillStyle   = pat;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // ── Gestion opacité dynamique ─────────────────────────────
  let sectionOp   = '1';
  let detailOpen  = false;
  let contactOpen = false;

  function applyOpacity() {
    if (detailOpen)  { canvas.style.opacity = '0';      return; }
    if (contactOpen) { canvas.style.opacity = '1';      return; }
    canvas.style.opacity = sectionOp;
  }

  // IntersectionObserver — sections scroll
  const opacityMap = { hero: '1', about: '1', projects: '0.3' };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      sectionOp = opacityMap[e.target.id] || '1';
      applyOpacity();
    });
  }, { threshold: 0.5 });

  ['hero', 'about', 'projects'].forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });

  // Contact overlay — events custom
  window.addEventListener('contact:open',  () => { contactOpen = true;  applyOpacity(); });
  window.addEventListener('contact:close', () => { contactOpen = false; applyOpacity(); });

  // Project detail — MutationObserver sur la classe is-open
  const detail = document.getElementById('project-detail');
  if (detail) {
    new MutationObserver(() => {
      detailOpen = detail.classList.contains('is-open');
      applyOpacity();
    }).observe(detail, { attributes: true, attributeFilter: ['class'] });
  }

})();
