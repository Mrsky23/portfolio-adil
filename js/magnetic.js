// magnetic.js — magnetic char deformation on title elements

(function () {
  'use strict';

  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const RADIUS   = 250;
  const STRENGTH = 35;
  const DAMPING  = 0.08;

  let mx = -9999, my = -9999;
  const allEntries = [];
  let projEntry = null;

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  /* ── Shared RAF loop ──────────────────────────────────────── */
  (function loop() {
    allEntries.forEach(entry => {
      entry.chars.forEach(d => {
        const dx   = d.ox - mx;
        const dy   = d.oy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 0) {
          const force = (1 - dist / RADIUS) * STRENGTH;
          const angle = Math.atan2(dy, dx);
          d.tx = Math.cos(angle) * force;
          d.ty = Math.sin(angle) * force;
          d.tr = (dx / RADIUS) * 12;
        } else {
          d.tx = 0; d.ty = 0; d.tr = 0;
        }
        d.cx += (d.tx - d.cx) * DAMPING;
        d.cy += (d.ty - d.cy) * DAMPING;
        d.cr += (d.tr - d.cr) * DAMPING;
        d.el.style.transform =
          'translate(' + d.cx.toFixed(2) + 'px,' + d.cy.toFixed(2) + 'px)' +
          ' rotate(' + d.cr.toFixed(2) + 'deg)';
      });
    });
    requestAnimationFrame(loop);
  })();

  /* ── Cache natural positions ──────────────────────────────── */
  function cachePositions(entry) {
    entry.chars.forEach(d => {
      d.el.style.transform = '';
      const r = d.el.getBoundingClientRect();
      d.ox = r.left + r.width / 2;
      d.oy = r.top  + r.height / 2;
    });
  }

  /* ── Split: element with child element nodes (hero) ──────── */
  // Préserve les spans colorées (sr__white / sr__red) comme wrappers
  function splitWithChildSpans(el) {
    const charEls  = [];
    const wordSpan = document.createElement('span');
    wordSpan.className = 'proj__word';

    Array.from(el.childNodes).forEach(node => {
      if (node.nodeType === 3) {
        node.textContent.split('').forEach(ch => {
          if (ch === ' ') {
            wordSpan.appendChild(document.createTextNode(' '));
          } else {
            const s = document.createElement('span');
            s.className = 'proj__char';
            s.textContent = ch;
            wordSpan.appendChild(s);
            charEls.push(s);
          }
        });
      } else if (node.nodeName === 'BR') {
        wordSpan.appendChild(document.createElement('br'));
      } else if (node.nodeType === 1) {
        const wrapper = node.cloneNode(false);
        node.textContent.split('').forEach(ch => {
          const s = document.createElement('span');
          s.className = 'proj__char';
          s.textContent = ch;
          wrapper.appendChild(s);
          charEls.push(s);
        });
        wordSpan.appendChild(wrapper);
      }
    });

    el.innerHTML = '';
    el.appendChild(wordSpan);
    return charEls;
  }

  /* ── Split: plain text (about, projects) ─────────────────── */
  function splitPlainText(el) {
    const text = el.textContent.trim();
    el.innerHTML = '';
    const charEls = [];

    text.split(' ').forEach((word, i, arr) => {
      if (!word) return;
      const wordSpan = document.createElement('span');
      wordSpan.className = 'proj__word';
      word.split('').forEach(ch => {
        const s = document.createElement('span');
        s.className = 'proj__char';
        s.textContent = ch;
        wordSpan.appendChild(s);
        charEls.push(s);
      });
      el.appendChild(wordSpan);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
    });

    return charEls;
  }

  function makeEntry(el, charEls) {
    return {
      el,
      chars: charEls.map(cel => ({
        el: cel,
        ox: 0, oy: 0,
        tx: 0, ty: 0, tr: 0,
        cx: 0, cy: 0, cr: 0,
      })),
    };
  }

  /* ── Public: init un titre statique (hero, about) ─────────── */
  function initMagneticTitle(el) {
    if (!el) return;
    const hasChildElems = Array.from(el.childNodes).some(
      n => n.nodeType === 1 && n.nodeName !== 'BR'
    );
    const charEls = hasChildElems ? splitWithChildSpans(el) : splitPlainText(el);
    const entry   = makeEntry(el, charEls);
    allEntries.push(entry);
    requestAnimationFrame(() => requestAnimationFrame(() => cachePositions(entry)));
  }

  window.initMagneticTitle = initMagneticTitle;

  /* ── Public: init le titre dynamique des projets ──────────── */
  window._initProjMagnetic = function (el) {
    if (!el) return;
    const charEls = splitPlainText(el);
    projEntry = makeEntry(el, charEls);
    allEntries.push(projEntry);
    requestAnimationFrame(() => requestAnimationFrame(() => cachePositions(projEntry)));
  };

  /* ── Public: recache un élément déjà enregistré ──────────── */
  window._recacheMagneticEl = function (el) {
    const entry = allEntries.find(e => e.el === el);
    if (entry) requestAnimationFrame(() => requestAnimationFrame(() => cachePositions(entry)));
  };

  /* ── Public: recache après changement de titre projet ─────── */
  // Appelé depuis projects.js après titleEl.textContent = nouveau titre
  // Re-splitte le texte actuel + recache les positions 600 ms plus tard
  // (le délai couvre l'animation d'entrée du titre ~500 ms)
  window._recacheMagnetic = function () {
    if (!projEntry) return;
    const charEls = splitPlainText(projEntry.el);
    projEntry.chars = charEls.map(cel => ({
      el: cel,
      ox: 0, oy: 0,
      tx: 0, ty: 0, tr: 0,
      cx: 0, cy: 0, cr: 0,
    }));
    setTimeout(function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          cachePositions(projEntry);
        });
      });
    }, 600);
  };

})();
