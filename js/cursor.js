// cursor.js — curseur unique avec texte dynamique

(function initCursor() {

  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  const dot  = cursor.querySelector('.cursor__dot');
  const text = cursor.querySelector('.cursor__text');

  let mx = window.innerWidth  / 2;
  let my = window.innerHeight / 2;
  let cx = mx, cy = my;

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  // Mouvement avec lag
  (function tick() {
    cx += (mx - cx) * 0.35;
    cy += (my - cy) * 0.35;
    if (Math.abs(mx - cx) < 2) cx = mx;
    if (Math.abs(my - cy) < 2) cy = my;
    cursor.style.transform = 'translate(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px)';
    requestAnimationFrame(tick);
  })();

  // ── État du texte ─────────────────────────────────────────
  let currentLabel = null;

  function setState(label, size) {
    if (label === currentLabel) return;
    currentLabel = label;

    if (label) {
      text.textContent  = label;
      text.style.fontSize = (size || 10) + 'px';
      text.style.opacity  = '1';
      dot.style.opacity   = '0';
    } else {
      text.style.opacity = '0';
      dot.style.opacity  = '1';
    }
  }

  // ── Détection via delegation ──────────────────────────────
  document.addEventListener('mouseover', function (e) {
    const t = e.target;

    if (t.closest('.hero__card-wrap--3')) {
      setState('PLAY');
    } else if (t.closest('.proj__img-wrap') || t.closest('.proj__list-item')) {
      setState('VOIR');
    } else if (t.closest('.about__card')) {
      setState('DRAG');
    } else if (t.closest('a') || t.closest('button')) {
      setState('→', 14);
    } else {
      setState(null);
    }
  });

  // Masque hors fenêtre
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });

})();
