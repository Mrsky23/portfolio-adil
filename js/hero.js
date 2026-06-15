// hero.js — entrance · cards holo · showreel overlay

(function initHero() {

  const showreel = document.querySelector('.hero__showreel');
  const wrappers = document.querySelectorAll('.hero__card-wrap');
  const srRed    = document.querySelector('.sr__red');

  // Scale de base par wrap (réutilisé pour le hover)
  const BASE_SCALE = {
    '.hero__card-wrap--1': 0.86,
    '.hero__card-wrap--2': 0.93,
    '.hero__card-wrap--3': 1.00,
    '.hero__card-wrap--4': 0.93,
    '.hero__card-wrap--5': 0.86,
  };

  gsap.set('.hero__card-wrap--1', { rotation: -24, scale: 0.86, opacity: 0, y: 160 });
  gsap.set('.hero__card-wrap--2', { rotation: -12, scale: 0.93, opacity: 0, y: 160 });
  gsap.set('.hero__card-wrap--3', { rotation:  -2, scale: 1,    opacity: 0, y: 160 });
  gsap.set('.hero__card-wrap--4', { rotation:  10, scale: 0.93, opacity: 0, y: 160 });
  gsap.set('.hero__card-wrap--5', { rotation:  20, scale: 0.86, opacity: 0, y: 160 });
  gsap.set(showreel, { opacity: 0, y: 70 });
  gsap.set(['#nav', '.hero__foot'], { opacity: 0 });

  // ── Données images par wrap ────────────────────────────────
  const CARD_DATA = [
    { sel: '.hero__card-wrap--4', url: 'https://res.cloudinary.com/dwgfd808v/image/upload/v1781511928/ode_au_gangsta_rap_vrs0ty.png' },
    { sel: '.hero__card-wrap--2', url: 'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374680/Minia_projet_polaris_h4p2et.png' },
    { sel: '.hero__card-wrap--3', url: 'https://res.cloudinary.com/dwgfd808v/image/upload/v1781511928/Showreel_bca18z.png', isShowreel: true },
    { sel: '.hero__card-wrap--1', url: 'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374684/Minia_projet_nasdas_kub5gx.png' },
    { sel: '.hero__card-wrap--5', url: 'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374679/Minia_projet_journ%C3%A9e_consultants_zng7q0.png' },
  ];

  // ── Setup images (projects.js chargé avant hero.js) ───────
  CARD_DATA.forEach(function (data) {
    const wrap = document.querySelector(data.sel);
    if (!wrap) return;

    const base = BASE_SCALE[data.sel] || 1;

    const fx = window.initImageEffects(wrap, {
      maxRX: 12, maxRY: 12, damp: 0.08, floatAmplitude: 5,
    });

    fx.cardInner.style.width  = '100%';
    fx.cardInner.style.height = '100%';
    fx.imgInner.style.width   = '100%';
    fx.imgInner.style.height  = '100%';
    fx.imgEl.style.cssText    =
      'width:100%;height:100%;object-fit:cover;' +
      'max-width:none;max-height:none;border-radius:0;display:block;';
    fx.imgEl.src = data.url;

    // Hover : scale + ombre
    wrap.addEventListener('mouseenter', function () {
      gsap.to(wrap, {
        scale: base * 1.05,
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        duration: 0.35,
        ease: 'power2.out',
      });
    });
    wrap.addEventListener('mouseleave', function () {
      gsap.to(wrap, {
        scale: base,
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    if (data.isShowreel) {
      wrap.addEventListener('click', function () {
        if (window.openDetail) window.openDetail({
          titre: 'Showreel 2026',
          cat: 'MOTION',
          annee: '2026',
          client: 'Adil Salim',
          img: 'https://res.cloudinary.com/dwgfd808v/image/upload/v1781511928/Showreel_bca18z.png',
          video: 'https://res.cloudinary.com/dwgfd808v/video/upload/q_auto,f_auto/v1781511476/showreal_v2_y8hnbj.mp4',
          contexte: 'Compilation de projets sélectionnés pour montrer l\'étendue des compétences — 3D, 2D, texturing, tournage, interviews, stratégie de contenu. Du studio au terrain.',
          realisation: 'Sélection éditoriale, motion design intro/outro avec DA personnelle, montage complet.',
          roles: ['Motion Design', 'Montage', 'Direction Artistique'],
        });
      });
    }
  });

  // ── Entrance ───────────────────────────────────────────────
  function playEntrance() {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to(showreel, { y: 0, opacity: 1, duration: 0.9, clearProps: 'all' })
      .to(wrappers, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: { amount: 0.45, from: 'center' },
        ease: 'back.out(1.3)',
      }, '<+0.15')
      .to(['#nav', '.hero__foot'], { opacity: 1, duration: 0.5, ease: 'power2.out' }, '<+0.3');
  }

  if (document.getElementById('loader')) {
    document.addEventListener('loader:done', playEntrance, { once: true });
  } else {
    playEntrance();
  }

  // ── Cycle folio ─────────────────────────────────────────────
  const states = [
    { color: '#ffffff', font: "'Monigue', sans-serif"         },
    { color: '#E8453C', font: "'Network', sans-serif"         },
    { color: '#E8453C', font: "'eco', sans-serif"             },
    { color: '#E8453C', font: "'eckmannpsych-small', serif"   },
    { color: '#E8453C', font: "'Forte', sans-serif"           },
  ];

  let step = 0;

  srRed.addEventListener('click', function () {
    step = (step + 1) % states.length;
    const s = states[step];
    srRed.style.fontFamily = s.font;
    gsap.to(srRed, { color: s.color, duration: 0.3, ease: 'power2.out' });
  });

})();
