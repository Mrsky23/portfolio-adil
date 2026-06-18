// cv.js — overlay CV, open/close GSAP, export PDF

(function () {
  'use strict';

  var cvEl    = document.getElementById('cv');
  if (!cvEl) return;

  var backBtn  = cvEl.querySelector('.cv__back-btn');
  var printBtn = cvEl.querySelector('.cv__print-btn');
  var isOpen   = false;

  function open() {
    if (isOpen) return;
    isOpen = true;
    if (window.__lenis) window.__lenis.stop();
    gsap.to(cvEl, { bottom: 0, duration: 0.7, ease: 'power3.out' });
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    gsap.to(cvEl, {
      bottom: '-100vh',
      duration: 0.6,
      ease: 'power3.in',
      onComplete: function () {
        cvEl.scrollTop = 0;
        if (window.__lenis) window.__lenis.start();
      },
    });
  }

  if (backBtn)  backBtn.addEventListener('click', close);
  if (printBtn) printBtn.addEventListener('click', function () { window.open('cv.html', '_blank'); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) close();
  });

  window.__openCV  = open;
  window.__closeCV = close;
})();
