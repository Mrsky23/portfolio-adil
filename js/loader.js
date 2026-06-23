(function () {
  var loader  = document.getElementById('loader');
  var card    = document.getElementById('loader-card');
  var holoEl  = card.querySelector('.loader-card__holo');
  var photoEl = card.querySelector('.loader-card__photo');
  var isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  document.body.style.overflow = 'hidden';
  document.body.classList.add('is-loading');

  /* ── Holo canvas ─────────────────────────────────────────── */
  var hCanvas = document.createElement('canvas');
  hCanvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;' +
    'border-radius:20px;pointer-events:none;opacity:0;' +
    'transition:opacity 0.3s ease;mix-blend-mode:screen;';
  holoEl.appendChild(hCanvas);
  var hCtx = hCanvas.getContext('2d');

  function resizeHolo() {
    hCanvas.width  = card.offsetWidth  || 380;
    hCanvas.height = card.offsetHeight || 520;
  }

  /* ── State ───────────────────────────────────────────────── */
  var rafId      = null;
  var exiting    = false;
  var hovering   = false;
  var enterDone  = false;
  var enterStart = null;
  var floatT     = 0;
  var lastNow    = null;

  var tRX = 0, tRY = 0;
  var cRX = 0, cRY = 0;

  /* ── Drag + throw + spin ─────────────────────────────────── */
  var isDrag      = false;
  var wasDragging = false;
  var grabX = 0, grabY = 0;
  var ddx = 0, ddy = 0, dvx = 0, dvy = 0;
  var mvx = 0, mvy = 0, lastMX = 0, lastMY = 0;
  var spinAngle = 0, spinV = 0;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  /* ── Hover ───────────────────────────────────────────────── */
  card.addEventListener('mouseenter', function () {
    hovering = true;
    resizeHolo();
    hCanvas.style.opacity = '1';
  });

  card.addEventListener('mouseleave', function () {
    if (!isDrag) {
      hovering = false;
      hCanvas.style.opacity = '0';
      tRX = 0; tRY = 0;
    }
  });

  /* ── Mousemove global (tilt hover + drag) ────────────────── */
  window.addEventListener('mousemove', function (e) {
    mvx    = e.clientX - lastMX;
    mvy    = e.clientY - lastMY;
    lastMX = e.clientX;
    lastMY = e.clientY;

    if (isDrag) {
      ddx = e.clientX - grabX;
      ddy = e.clientY - grabY;
      tRY = Math.max(-30, Math.min(30,  mvx * 2));
      tRX = Math.max(-20, Math.min(20, -mvy * 1.5));
    } else if (hovering) {
      var rect = card.getBoundingClientRect();
      var nx   = (e.clientX - rect.left) / rect.width  - 0.5;
      var ny   = (e.clientY - rect.top)  / rect.height - 0.5;
      tRY =  nx * 24;
      tRX = -ny * 24;
    }
  }, { passive: true });

  /* ── Grab ────────────────────────────────────────────────── */
  if (!isCoarsePointer) {
    card.addEventListener('mousedown', function (e) {
      if (exiting || !enterDone) return;
      e.preventDefault();
      isDrag      = true;
      wasDragging = false;
      grabX       = e.clientX - ddx;
      grabY       = e.clientY - ddy;
      dvx = 0; dvy = 0;
      mvx = 0; mvy = 0;
      lastMX = e.clientX;
      lastMY = e.clientY;
      spinV = 0;
      resizeHolo();
      hCanvas.style.opacity = '1';
    });
  }

  /* ── Release → throw ─────────────────────────────────────── */
  window.addEventListener('mouseup', function () {
    if (!isDrag) return;
    isDrag      = false;
    wasDragging = Math.abs(ddx) > 5 || Math.abs(ddy) > 5;
    dvx         = mvx * 1.2;
    dvy         = mvy * 1.2;
    spinV       = mvx * 0.12;
    tRX = 0; tRY = 0;
  });

  /* ── Click → exit ────────────────────────────────────────── */
  card.addEventListener('click', function () {
    if (exiting || !enterDone) return;
    if (wasDragging) { wasDragging = false; return; }
    exiting = true;

    tRX = 10; tRY = -10;

    setTimeout(function () {
      cancelAnimationFrame(rafId);
      if (window.gsap) {
        window.gsap.to(card, {
          scale: 1.06,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.in',
        });
        window.gsap.to(loader, {
          opacity: 0,
          duration: 0.55,
          delay: 0.15,
          ease: 'power2.inOut',
          onComplete: function () {
            window.scrollTo(0, 0);
            loader.style.display = 'none';
            document.body.style.overflow = '';
            document.body.classList.remove('is-loading');
            document.dispatchEvent(new CustomEvent('loader:done'));
          }
        });
      } else {
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity    = '0';
        document.body.style.overflow = '';
        setTimeout(function () {
          loader.style.display = 'none';
          document.body.classList.remove('is-loading');
          document.dispatchEvent(new CustomEvent('loader:done'));
        }, 520);
      }
    }, 130);
  });

  /* ── Boucle principale ───────────────────────────────────── */
  function tick(now) {
    if (exiting) return;
    if (enterStart === null) enterStart = now;

    var dt  = lastNow ? Math.min((now - lastNow) / 1000, 0.05) : 0;
    lastNow = now;

    if (!enterDone) {
      var et   = Math.min((now - enterStart) / 600, 1);
      var ease = easeOutCubic(et);
      card.style.opacity   = ease;
      card.style.transform = 'scale(' + (0.8 + 0.2 * ease) + ')';
      if (et >= 1) enterDone = true;

    } else {
      floatT += dt;
      var floatY = (hovering || isDrag) ? 0 : Math.sin(floatT * 0.7) * 8;

      /* Spring retour après throw */
      if (!isDrag) {
        dvx += (0 - ddx) * 0.016; dvx *= 0.94; ddx += dvx;
        dvy += (0 - ddy) * 0.016; dvy *= 0.94; ddy += dvy;
      }

      /* Spin spring */
      spinV += (0 - spinAngle) * 0.012;
      spinV *= 0.97;
      spinAngle += spinV;

      cRX += (tRX - cRX) * 0.1;
      cRY += (tRY - cRY) * 0.1;

      if ((hovering || isDrag) && window.__renderHoloLight) {
        window.__renderHoloLight(hCtx, hCanvas.width, hCanvas.height, cRX, cRY);
      }

      if (photoEl) {
        photoEl.style.transform =
          'scale(1.16) translate(' + (-cRY * 0.5).toFixed(2) + 'px, ' + (cRX * 0.5).toFixed(2) + 'px)';
      }

      var sc = (hovering || isDrag) ? 1.03 : 1;
      card.style.transform =
        'translateY(' + (floatY + ddy * 0.35).toFixed(3) + 'px) ' +
        'translateX(' + (ddx * 0.35).toFixed(2) + 'px) ' +
        'rotateX(' + cRX.toFixed(3) + 'deg) ' +
        'rotateY(' + cRY.toFixed(3) + 'deg) ' +
        'rotateZ(' + spinAngle.toFixed(3) + 'deg) ' +
        'scale(' + sc + ')';
    }

    rafId = requestAnimationFrame(tick);
  }

  /* ── Hint drag (desktop uniquement) ───────────────────────── */
  if (!isCoarsePointer) (function () {
    var style = document.createElement('style');
    style.textContent =
      '@keyframes loaderDragFloat{' +
      '0%,100%{transform:translateX(-50%) translateY(-3px)}' +
      '50%{transform:translateX(-50%) translateY(3px)}' +
      '}';
    document.head.appendChild(style);

    var hint = document.createElement('span');
    hint.setAttribute('aria-hidden', 'true');
    hint.style.cssText =
      'position:absolute;top:18px;left:50%;' +
      'font-family:\'Unbounded\',sans-serif;font-size:9px;letter-spacing:0.18em;' +
      'color:rgba(255,255,255,0.28);white-space:nowrap;pointer-events:none;z-index:4;' +
      'transition:opacity 0.6s ease;' +
      'animation:loaderDragFloat 1.8s ease-in-out infinite;';
    hint.textContent = '↕  DRAG';
    card.appendChild(hint);

    card.addEventListener('mousedown', function () {
      hint.style.opacity = '0';
    }, { once: true });
  })();

  rafId = requestAnimationFrame(tick);
})();
