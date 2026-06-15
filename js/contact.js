// contact.js — overlay fixe #contact (defer : s'exécute après main.js)
(function () {
  var section = document.querySelector('#contact');
  if (!section) return;
  var card = section.querySelector('.ct__card');
  if (!card) return;

  // Card invisible par défaut — animée à l'ouverture
  card.style.opacity = '0';

  /* ── Holo canvas ─────────────────────────────────────── */
  var hcvs = document.createElement('canvas');
  hcvs.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;' +
    'pointer-events:none;z-index:3;mix-blend-mode:screen;' +
    'opacity:0;transition:opacity 0.35s;';
  card.appendChild(hcvs);
  var hctx = hcvs.getContext('2d');
  var hKey = '';

  function resizeHolo() {
    hcvs.width  = card.offsetWidth;
    hcvs.height = card.offsetHeight;
    hKey = '';
  }
  resizeHolo();
  window.addEventListener('resize', resizeHolo);

  function drawHolo(rx, ry) {
    var key = rx.toFixed(1) + '|' + ry.toFixed(1);
    if (key === hKey) return;
    hKey = key;
    var W = hcvs.width, H = hcvs.height;
    hctx.clearRect(0, 0, W, H);
    var angle = Math.atan2(ry / 8, rx / 6);
    var cx = W / 2, cy = H / 2, diag = Math.hypot(W, H) / 2;
    var cs = Math.cos(angle), sn = Math.sin(angle);
    var g = hctx.createLinearGradient(
      cx - cs * diag, cy - sn * diag,
      cx + cs * diag, cy + sn * diag
    );
    var hBase = ((ry / 8) * 180 + (rx / 6) * 90 + 360) % 360;
    for (var i = 0; i <= 12; i++)
      g.addColorStop(i / 12,
        'hsla(' + ((hBase + i * 30) % 360) + ',100%,65%,0.026)');
    hctx.fillStyle = g;
    hctx.fillRect(0, 0, W, H);
    var sx = (ry / 8 * 0.5 + 0.5) * W;
    var sy = (-rx / 6 * 0.5 + 0.5) * H;
    var sg = hctx.createRadialGradient(sx, sy, 0, sx, sy, W * 0.55);
    sg.addColorStop(0, 'rgba(255,255,255,0.027)');
    sg.addColorStop(0.4, 'rgba(255,255,255,0.006)');
    sg.addColorStop(1, 'rgba(255,255,255,0)');
    hctx.fillStyle = sg;
    hctx.fillRect(0, 0, W, H);
  }

  /* ── Idle float + tilt ───────────────────────────────── */
  var rx = 0, ry = 0, trx = 0, try_ = 0;
  var isHov = false, tiltReady = false;
  var floatStart = performance.now();

  function tiltLoop() {
    var t = (performance.now() - floatStart) * 0.001;
    if (!isHov) {
      try_ = Math.sin(t * 0.7) * 3 + Math.sin(t * 1.3) * 1.5;
      trx  = Math.cos(t * 0.5) * 2 + Math.cos(t * 1.1) * 1;
    }
    rx  += (trx  - rx)  * 0.04;
    ry  += (try_ - ry)  * 0.04;
    if (tiltReady) {
      var floatY = Math.sin(t * 0.7) * 8;
      card.style.transform =
        'perspective(1200px)' +
        ' rotateX(' + rx.toFixed(3) + 'deg)' +
        ' rotateY(' + ry.toFixed(3) + 'deg)' +
        ' translateY(' + floatY.toFixed(2) + 'px)';
    }
    if (isHov || Math.abs(rx) > 0.05 || Math.abs(ry) > 0.05)
      drawHolo(rx, ry);
    requestAnimationFrame(tiltLoop);
  }

  card.addEventListener('mouseenter', function () {
    isHov = true;
    hcvs.style.opacity = '1';
  });
  card.addEventListener('mouseleave', function () {
    isHov = false;
    trx = 0; try_ = 0;
    hcvs.style.opacity = '0';
    hKey = '';
  });
  window.addEventListener('mousemove', function (e) {
    if (!isHov) return;
    var r = card.getBoundingClientRect();
    var nx = (e.clientX - r.left) / r.width  - 0.5;
    var ny = (e.clientY - r.top)  / r.height - 0.5;
    trx  = -ny * 8;
    try_ =  nx * 10;
  }, { passive: true });

  tiltLoop();

  /* ── Magnetic titre ──────────────────────────────────── */
  var titleEl = section.querySelector('.ct__title');
  var magneticInited = false;

  function initOrRecacheMagnetic() {
    if (!titleEl) return;
    if (!magneticInited) {
      magneticInited = true;
      if (window.initMagneticTitle) window.initMagneticTitle(titleEl);
    } else {
      if (window._recacheMagneticEl) window._recacheMagneticEl(titleEl);
    }
  }

  /* ── Ouverture (event contact:open) ──────────────────── */
  window.addEventListener('contact:open', function () {
    tiltReady = false;
    if (window.gsap) {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          clearProps: 'all',
          onComplete: function () { tiltReady = true; }
        }
      );
      var innerEls = Array.from(section.querySelectorAll(
        '.ct__title,.ct__subtitle,.ct__sep,.ct__email,.ct__links,.ct__avail,.ct__field,.ct__btn'
      ));
      gsap.fromTo(innerEls,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08, delay: 0.2, clearProps: 'all' }
      );
    } else {
      card.style.opacity = '1';
      tiltReady = true;
    }
    // Magnetic : init à la première ouverture, recache ensuite
    // 800 ms = temps que le titre soit visible et positionné
    setTimeout(initOrRecacheMagnetic, 800);
  });

  /* ── Bouton retour ───────────────────────────────────── */
  var backBtn = section.querySelector('.ct__back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', function () {
      tiltReady = false;
      if (window.__closeContact) window.__closeContact();
    });
  }

  /* ── Formulaire → Formspree ──────────────────────────── */
  var form = section.querySelector('.ct__form');
  var btn  = form.querySelector('.ct__btn');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    btn.textContent = 'ENVOI…';
    btn.disabled = true;

    fetch('https://formspree.io/f/mkoayypv', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
      .then(function (r) {
        if (r.ok) {
          btn.textContent = 'MESSAGE ENVOYÉ ✓';
          form.reset();
        } else {
          btn.textContent = 'ERREUR — RÉESSAYEZ';
          btn.disabled = false;
        }
      })
      .catch(function () {
        btn.textContent = 'ERREUR — RÉESSAYEZ';
        btn.disabled = false;
      });
  });
})();
