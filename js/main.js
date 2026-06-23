// main.js — init Lenis + connexion GSAP ScrollTrigger

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ── Détection mobile — désactive les animations coûteuses ────
const isMobile = window.innerWidth <= 1024;
if (isMobile) {
  document.body.classList.add('is-mobile');
  window.__magneticDisabled  = true;
  window.__particlesDisabled = true;
  window.__holoDisabled      = true;
}

// ── Lenis ────────────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
});
window.__lenis = lenis;

// Bloque Lenis pendant le loader, le reprend à loader:done
if (document.getElementById('loader')) {
  lenis.stop();
  document.addEventListener('loader:done', function () {
    lenis.start();
    lenis.scrollTo(0, { immediate: true });
  }, { once: true });
}

// RAF via GSAP ticker (synchronise Lenis et ScrollTrigger sur la même frame)
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Notifie ScrollTrigger à chaque scroll Lenis
lenis.on('scroll', ScrollTrigger.update);

// ── Magnetic char effect — hero + about ──────────────────────
if (window.initMagneticTitle) {
  initMagneticTitle(document.querySelector('.hero__showreel'));
  initMagneticTitle(document.querySelector('.about__name'));
}

// Re-cache about__name à chaque fois qu'il entre dans le viewport
// (getBoundingClientRect est viewport-relatif → invalide si caché au load)
(function () {
  const nameEl = document.querySelector('.about__name');
  if (!nameEl || !window._recacheMagneticEl) return;
  new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) window._recacheMagneticEl(nameEl);
    });
  }, { threshold: 0.1 }).observe(nameEl);
})();
if (window._initProjMagnetic) {
  _initProjMagnetic(document.querySelector('.proj__title'));
}

// ── Cycle de fonts automatique sur "folio" ────────────────────
(function () {
  const folioEl = document.querySelector('.hero__showreel .sr__red');
  if (!folioEl || !window.gsap) return;

  const states = [
    { font: "'Monigue', sans-serif",      color: '#ffffff' },
    { font: "'network', sans-serif",       color: '#E8453C' },
    { font: "'eco', sans-serif",           color: '#E8453C' },
    { font: "'eckmannpsych-small', serif", color: '#E8453C' },
    { font: "'Forte', cursive",            color: '#E8453C' },
  ];

  let idx = 0;

  setInterval(() => {
    idx = (idx + 1) % states.length;
    const s = states[idx];
    gsap.to(folioEl, {
      opacity: 0,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        folioEl.style.fontFamily = s.font;
        folioEl.style.color      = s.color;
        gsap.to(folioEl, { opacity: 1, duration: 0.15, ease: 'power2.out' });
      },
    });
  }, 1200);
})();

// ── Grain — réduit quand une vidéo joue ──────────────────────
(function () {
  var playing = 0;
  function check() { document.body.classList.toggle('has-video', playing > 0); }
  document.addEventListener('play',  function (e) { if (e.target.tagName === 'VIDEO') { playing++; check(); } }, true);
  document.addEventListener('pause', function (e) { if (e.target.tagName === 'VIDEO') { playing = Math.max(0, playing - 1); check(); } }, true);
  document.addEventListener('ended', function (e) { if (e.target.tagName === 'VIDEO') { playing = Math.max(0, playing - 1); check(); } }, true);
})();


// ── Favicon — cercle noir, A blanc, S rouge (Monigue) ────────
(function () {
  document.fonts.ready.then(function () {
    var cvs = document.createElement('canvas');
    cvs.width = 64; cvs.height = 64;
    var ctx = cvs.getContext('2d');

    ctx.fillStyle = '#0D0D0D';
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 36px Monigue, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';

    ctx.fillStyle = '#F5F3EE';
    ctx.fillText('A', 5, 34);

    ctx.fillStyle = '#E8453C';
    ctx.fillText('S', 33, 34);

    var link = document.getElementById('favicon') || document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = cvs.toDataURL('image/png');
    if (!link.parentNode) document.head.appendChild(link);
  });
})();

// ── Menu mobile (burger) ──────────────────────────────────────
(function () {
  const burger = document.querySelector('.nav__burger');
  const links  = document.querySelector('.nav__links');
  if (!burger || !links) return;

  function closeMenu() {
    burger.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    links.classList.remove('is-open');
  }

  burger.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    burger.classList.toggle('is-active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', closeMenu);
  });
})();

// ── Navigation douce (ancres internes) ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    const target = href === '#hero' ? document.body : document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(href === '#hero' ? 0 : target, { offset: 0, duration: 1.4 });
  });
});
