// projects.js — slider plein écran #projects

(function initProjects() {
  'use strict';

  const section = document.querySelector('#projects');
  if (!section) return;

  /* ═══════════════════════════════════════════════════════
     Données — 20 projets
     ═══════════════════════════════════════════════════════ */
  const ALL = [
    // SHOWREEL
    { titre: 'Showreel 2026',             cat: 'MOTION', annee: '2026', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1781511928/Showreel_bca18z.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/q_auto,f_auto/v1781511476/showreal_v2_y8hnbj.mp4',
      client: 'Adil Salim',
      contexte: 'Compilation de projets sélectionnés pour montrer l\'étendue des compétences — 3D, 2D, texturing, tournage, interviews, stratégie de contenu. Du studio au terrain.',
      realisation: 'Sélection éditoriale, motion design intro/outro avec DA personnelle, montage complet.',
      roles: ['Motion Design', 'Montage', 'Direction Artistique'] },
    // CHARGÉ DE COMMUNICATION (5)
    { titre: 'Série 10 Questions',        cat: 'CHARGÉ DE COMMUNICATION', annee: '2025', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1781439127/10_Questions_lmjr77.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/v1781439437/10_Questions_1_wwyejy.mp4',
      client: 'TOMA Interim',
      contexte: 'Série d\'interviews de franchisés TOMA Interim — 10 questions directes sur leur parcours et ambitions. Un format pensé pour donner envie aux entrepreneurs de se lancer en franchise.',
      realisation: 'Réflexion et stratégie en équipe chez TOMA. Prise en charge : contact franchisés, tournage, cadrage, lumières, son, montage, DA et motion design.',
      roles: ['Communication', 'Motion Design', 'Tournage', 'Montage'] },
    { titre: 'Focus Franchisé Sylvestre', cat: 'CHARGÉ DE COMMUNICATION', annee: '2025', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374680/Minia_projet_Focus_franchise_sylvestre_m1ugvj.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/v1781448520/Focus_Franchis%C3%A9_Sylveste_qcocwv.mp4',
      client: 'TOMA Interim',
      contexte: 'Interview d\'un franchisé TOMA — son parcours, ses motivations, ses ambitions. Un format humain et authentique pour attirer de futurs entrepreneurs.',
      realisation: 'Réflexion et stratégie en équipe chez TOMA. Tournage, cadrage, lumières, son, montage, motion design DA.',
      roles: ['Communication', 'Motion Design', 'Tournage', 'Montage'] },
    { titre: 'Focus Consultant Brendan',  cat: 'CHARGÉ DE COMMUNICATION', annee: '2025', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374682/Minia_projet_Focus_Consultant_brendan_ynq666.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/v1781448637/Focus_Consultant_Brendan_awmdtb.mp4',
      client: 'TOMA Interim',
      contexte: 'Mettre en avant le métier de consultant intérim, souvent méconnu, pour attirer de futurs consultants et valoriser les équipes terrain de TOMA.',
      realisation: 'Réflexion et stratégie en équipe chez TOMA. Prise en charge : tournage, cadrage, lumières, son, montage, motion design DA.',
      roles: ['Communication', 'Motion Design', 'Tournage', 'Montage'] },
    { titre: 'Vidéo UBB',                 cat: 'CHARGÉ DE COMMUNICATION', annee: '2025', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374682/Minia_projet_ubb_obcfqd.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/v1781448695/New_vid%C3%A9o_%C3%A9cran_g%C3%A9ant_UBB_V3_fcu137.mp4',
      client: 'TOMA Interim',
      contexte: 'Motion design publicitaire diffusé sur l\'écran géant du stade UBB dans le cadre du partenariat TOMA Interim × UBB.',
      realisation: 'Réflexion et stratégie en équipe chez TOMA. Prise en charge : motion design, DA, animation.',
      roles: ['Motion Design', 'Communication', 'DA'] },
    { titre: 'Ouverture Saint-Maximin',   cat: 'CHARGÉ DE COMMUNICATION', annee: '2025', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374683/Minia_projet_ouverture_d_agence_echngn.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/v1781448902/ouverture_saint_maximin_part_3_hldffl.mp4',
      client: 'TOMA Interim',
      contexte: 'Format vidéo en 3 épisodes pour chaque ouverture d\'agence TOMA — interview des franchisés, immersion dans l\'agence, focus sur l\'accompagnement réseau.',
      realisation: 'Réflexion et stratégie en équipe chez TOMA. Prise en charge : contact, écriture questions, entretiens franchisés, déplacement, tournage, montage, motion design.',
      roles: ['Communication', 'Tournage', 'Montage', 'Motion Design'] },
    // MOTION (8)
    { titre: 'Tracking 3D',               cat: 'MOTION', annee: '2025', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374681/Minia_projet_traking_jordan_pf22kg.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/v1781448958/C4D_RS_TRACKING_SALIM_Adil_rmuaip.mp4',
      client: 'e-artsup Lyon',
      contexte: 'Boîte Jordan qui s\'ouvre avec la chaussure et le logo Jumpman surgissant en 3D, incrustés sur une vraie prise de vue.',
      realisation: 'Tracking, compositing VFX, texturing, sound design.',
      roles: ['Motion Design', '3D', 'VFX', 'Tracking'] },
    { titre: 'Vidéo FDI',                 cat: 'MOTION', annee: '2025', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374682/Minia_projet_fdi_iaasvt.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/v1774374667/Vid%C3%A9o_FDI_zpf5vs.mp4',
      client: 'FDI',
      contexte: 'Mise en avant de la branche formation FDI de TOMA Interim — jamais promue auparavant.',
      realisation: 'Réflexion et stratégie en équipe chez TOMA. Prise en charge : contacts, organisation, tournage stabilisateur + drone, DA, motion design, son.',
      roles: ['Motion Design', 'Tournage', 'Direction Créative', 'DA'] },
    { titre: 'Intro Nasdas',              cat: 'MOTION', annee: '2025', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374684/Minia_projet_nasdas_kub5gx.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/v1774374664/Vid%C3%A9o_intro_nassdas_uybxhd.mp4',
      client: 'e-artsup Lyon',
      contexte: 'Animation d\'introduction pour le live Twitch de Nasdas — projet scolaire e-artsup en broadcast design.',
      realisation: 'Motion design broadcast — animation d\'intro adaptée à la DA existante de Nasdas. Réalisé en binôme e-artsup.',
      roles: ['Motion Design', 'Broadcast', 'DA'] },
    { titre: 'Outro Franchise',           cat: 'MOTION', annee: '2025', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374680/Minia_projet_Outro_je5gi7.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/v1774374667/Outo_Franchise_1920x1080_b9amsy.mp4',
      client: 'TOMA Interim',
      contexte: 'Outro animée avec CTA "Devenez franchisé" déclinée sur toutes les thématiques TOMA.',
      realisation: 'Réflexion et stratégie en équipe chez TOMA. DA unifiée et animation typographique percutante sur toutes les vidéos TOMA.',
      roles: ['Motion Design', 'DA', 'Communication'] },
    { titre: 'Polaris Motion 3D',         cat: 'MOTION', annee: '2025', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374680/Minia_projet_polaris_h4p2et.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/v1774374664/Polaris_vid%C3%A9o_ddmmx7.mp4',
      client: 'TOMA Interim',
      contexte: 'Animation 3D pour annoncer la gamme streetwear Polaris de TOMA Interim. Casquette et t-shirt avec logo en relief effet broderie.',
      realisation: 'Réflexion et stratégie en équipe chez TOMA. Création du logo Polaris, animation 3D, sound design.',
      roles: ['Motion Design', '3D', 'DA', 'Identité Visuelle'] },
    { titre: 'Ray Chair HAY',             cat: 'MOTION', annee: '2025', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374684/Minia_projet_hay_qad1og.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/v1774374663/Ray_chair_hjnixf.mp4',
      client: 'e-artsup Lyon',
      contexte: 'Pub 3D pour la chaise HAY, recréer l\'univers de la marque : lumières, ombres, feuilles en mouvement.',
      realisation: 'Texturing, lighting, animation et rendu 3D photoréaliste, recréation complète de l\'univers de la marque HAY.',
      roles: ['Motion Design', '3D', 'Lighting'] },
    { titre: 'Ode au Gangsta Rap',        cat: 'MOTION', annee: '2026', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1781511928/ode_au_gangsta_rap_vrs0ty.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/Ode_au_gangsta_rap_zsmqpx.mp4',
      client: 'Personnel',
      contexte: 'Documenter l\'évolution du gangsta rap, de la rue au trône. Retracer comment des artistes issus des ghettos ont transformé leur réalité en empire.',
      realisation: 'Motion design, montage, DA, parallax, retouche Photoshop, texturing. Projet personnel ancré dans une passion réelle pour l\'histoire du rap.',
      roles: ['Motion Design', 'Montage', 'DA', 'Parallax'] },
    // GRAPHISME (5)
    { titre: 'Red Signature',             cat: 'GRAPHISME', annee: '2024', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374689/Red_Signature_slawtn.png',
      client: 'TOMA Interim',
      contexte: 'Première gamme streetwear TOMA — vêtements pensés pour être portés en dehors du travail. Typo TOMA en fond, signature intérim en rouge par-dessus. Univers urbain et contemporain.',
      realisation: 'Création logo, DA, déclinaisons visuelles sur t-shirt et casquette.',
      roles: ['Graphisme', 'Identité Visuelle', 'DA'] },
    { titre: 'Summer',                    cat: 'GRAPHISME', annee: '2024', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374689/Summer_ryviqn.png',
      client: 'TOMA Interim',
      contexte: 'Gamme estivale — teintes chaudes inspirées des couchers de soleil. Couleurs d\'orange et de jaune rappelant le soleil, typographie arrondie et douce.',
      realisation: 'Création logo, DA, déclinaisons visuelles.',
      roles: ['Graphisme', 'Identité Visuelle', 'DA'] },
    { titre: 'Polaris Logo',              cat: 'GRAPHISME', annee: '2025', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374689/Polaris_i49c7v.png',
      client: 'TOMA Interim',
      contexte: 'Inspiré de la disposition des lettres T-O-M-A formant un cadran directionnel — Nord, Sud, Est, Ouest. Le nom Polaris évoque les pôles et les points cardinaux.',
      realisation: 'Création logo, DA, déclinaisons visuelles sur casquette et t-shirt.',
      roles: ['Graphisme', 'Identité Visuelle', 'DA'] },
    { titre: 'Morph',                     cat: 'GRAPHISME', annee: '2026', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374688/Morph_zxn7ed.png',
      client: 'TOMA Interim',
      contexte: 'Logo conçu pour être porté en patch sur bob et t-shirt. Nouvelle palette intégrant le vert de la charte graphique TOMA. Lancement prévu rentrée septembre.',
      realisation: 'Création logo, DA, déclinaisons visuelles.',
      roles: ['Graphisme', 'Identité Visuelle', 'DA'] },
    { titre: 'TOMA Interim',              cat: 'GRAPHISME', annee: '2024', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374691/Toma_int%C3%A9rim_car%C3%A9e_blanc_pclwye.png',
      client: 'TOMA Interim',
      contexte: 'Direction artistique globale de la gamme streetwear TOMA Interim sur 3 ans — 4 logos distincts, chacun avec sa propre DA, ses couleurs et son univers.',
      realisation: 'De la réflexion créative à la livraison finale — Red Signature, Summer, Polaris, Morph.',
      roles: ['Graphisme', 'Direction Artistique', 'Identité Visuelle'] },
    // VIDÉO (3)
    { titre: 'Fast & Franchise BDX Anglet', cat: 'VIDÉO', annee: '2024', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374678/Minia_projet_FAST_Franchise_plmotj.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/v1781449112/Fast_and_Franchise_BDX_Anglet_jdhqnq.mov',
      client: 'TOMA Interim',
      contexte: 'Format inspiré du Fast & Curious de Konbini — deux franchisés s\'affrontent en questions rapides, pro et perso. Fun, dynamique, humain.',
      realisation: 'Réflexion et stratégie en équipe chez TOMA. Tournage, montage, motion design DA inspiré Konbini adapté à l\'univers TOMA.',
      roles: ['Montage', 'Motion Design', 'Tournage', 'DA'] },
    { titre: 'Journée Consultants',       cat: 'VIDÉO', annee: '2025', format: 'landscape',
      img:   'https://res.cloudinary.com/dwgfd808v/image/upload/v1774374679/Minia_projet_journ%C3%A9e_consultants_zng7q0.png',
      video: 'https://res.cloudinary.com/dwgfd808v/video/upload/v1781449369/Journ%C3%A9e_Consultants_compressed_grdwtm.mp4',
      client: 'TOMA Interim',
      contexte: 'Reportage événementiel — journée de formation et team building pour les consultants TOMA de toute la France. Captures du matin au soir, interviews, exercices.',
      realisation: 'Réflexion et stratégie en équipe chez TOMA. Tournage toute la journée, montage, motion design.',
      roles: ['Montage', 'Tournage', 'Motion Design'] },
  ];

  /* ═══════════════════════════════════════════════════════
     Rendu holo canvas — partagé · exposé globalement
     ═══════════════════════════════════════════════════════ */
  window.__renderHoloLight = function(ctx, W, H, rx, ry) {
    ctx.clearRect(0, 0, W, H);
    const angle = Math.atan2(ry / 8, rx / 6);
    const cx = W / 2, cy = H / 2, d = Math.hypot(W, H) / 2;
    const cs = Math.cos(angle), sn = Math.sin(angle);
    const g = ctx.createLinearGradient(cx - cs * d, cy - sn * d, cx + cs * d, cy + sn * d);
    const hBase = ((ry / 8) * 180 + (rx / 6) * 90 + 360) % 360;
    for (let i = 0; i <= 12; i++)
      g.addColorStop(i / 12, `hsla(${(hBase + i * 30) % 360},100%,65%,0.026)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    const sx = ( ry / 8 * 0.5 + 0.5) * W;
    const sy = (-rx / 6 * 0.5 + 0.5) * H;
    const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, W * 0.55);
    sg.addColorStop(0,   'rgba(255,255,255,0.027)');
    sg.addColorStop(0.4, 'rgba(255,255,255,0.006)');
    sg.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, W, H);
  };

  /* ═══════════════════════════════════════════════════════
     initImageEffects — sleeve holographique + tilt 3D + canvas holo
     Réutilisable : slider ET overlay détail
     ═══════════════════════════════════════════════════════ */
  function initImageEffects(container, {
    maxRX = 8,
    maxRY = 10,
    damp  = 0.05,
    floatAmplitude = 8,
  } = {}) {
    const cardInner = document.createElement('div');
    cardInner.className = 'proj__card-inner';

    const sleeve = document.createElement('div');
    sleeve.className = 'proj__holo-sleeve';
    sleeve.setAttribute('aria-hidden', 'true');

    const imgInner = document.createElement('div');
    imgInner.className = 'proj__img-inner';

    const imgEl = document.createElement('img');
    imgEl.className = 'proj__img';
    imgEl.alt = '';
    imgEl.loading = 'eager';

    const holoCanvas = document.createElement('canvas');
    holoCanvas.className = 'proj__holo';
    holoCanvas.setAttribute('aria-hidden', 'true');

    imgInner.appendChild(imgEl);
    imgInner.appendChild(holoCanvas);

    const holoOverlay = document.createElement('canvas');
    holoOverlay.className = 'proj__holo-overlay';
    holoOverlay.setAttribute('aria-hidden', 'true');

    cardInner.appendChild(sleeve);
    cardInner.appendChild(imgInner);
    cardInner.appendChild(holoOverlay);
    container.appendChild(cardInner);

    const hctx  = holoCanvas.getContext('2d');
    const hoctx = holoOverlay.getContext('2d');
    let hKey = '', iRX = 0, iRY = 0, iTRX = 0, iTRY = 0, holoActive = false;
    const floatStart = performance.now();

    function resize() {
      holoCanvas.width   = imgInner.offsetWidth;
      holoCanvas.height  = imgInner.offsetHeight;
      holoOverlay.width  = cardInner.offsetWidth  + 24;
      holoOverlay.height = cardInner.offsetHeight + 24;
      hKey = '';
    }

    function drawHolo(rx, ry) {
      const key = rx.toFixed(1) + '|' + ry.toFixed(1);
      if (key === hKey) return;
      hKey = key;
      window.__renderHoloLight(hctx,  holoCanvas.width,  holoCanvas.height,  rx, ry);
      window.__renderHoloLight(hoctx, holoOverlay.width, holoOverlay.height, rx, ry);
    }

    (function tick() {
      const t      = (performance.now() - floatStart) * 0.001;
      const floatY = floatAmplitude > 0 ? Math.sin(t * 0.7) * floatAmplitude : 0;
      iRX += (iTRX - iRX) * damp;
      iRY += (iTRY - iRY) * damp;

      if (holoActive && (Math.abs(iRX) > 0.01 || Math.abs(iRY) > 0.01))
        drawHolo(iRX, iRY);

      cardInner.style.transform =
        `perspective(700px) translateY(${floatY.toFixed(2)}px)` +
        ` rotateX(${iRX.toFixed(2)}deg) rotateY(${iRY.toFixed(2)}deg)`;

      requestAnimationFrame(tick);
    })();

    container.addEventListener('mouseenter', () => {
      holoActive = true;
      holoCanvas.style.opacity  = '1';
      holoOverlay.style.opacity = '1';
    });
    container.addEventListener('mousemove', e => {
      const r = container.getBoundingClientRect();
      iTRX = -((e.clientY - r.top)  / r.height - 0.5) * maxRX;
      iTRY =  ((e.clientX - r.left) / r.width  - 0.5) * maxRY;
    });
    container.addEventListener('mouseleave', () => {
      holoActive = false;
      iTRX = 0; iTRY = 0;
      holoCanvas.style.opacity  = '0';
      holoOverlay.style.opacity = '0';
      hKey = '';
    });

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    return { cardInner, imgEl, imgInner, resetHolo() { hKey = ''; } };
  }

  // Exposés pour réutilisation externe
  window.initImageEffects = initImageEffects;
  window.openDetail = function (p) { openDetail(p); };

  /* ═══════════════════════════════════════════════════════
     Construction DOM — zone images slider
     ═══════════════════════════════════════════════════════ */
  const imagesEl = section.querySelector('.proj__images');

  const imgWrap = document.createElement('div');
  imgWrap.className = 'proj__img-wrap';
  imagesEl.appendChild(imgWrap);

  const sliderFx = initImageEffects(imgWrap, { maxRX: 8, maxRY: 10, damp: 0.05, floatAmplitude: 8 });
  const { cardInner, imgEl } = sliderFx;

  const titlesEl = section.querySelector('.proj__titles');
  const titleEl  = document.createElement('h2');
  titleEl.className = 'proj__title';
  titleEl.setAttribute('aria-live', 'polite');
  titlesEl.appendChild(titleEl);

  /* ═══════════════════════════════════════════════════════
     Refs DOM statiques
     ═══════════════════════════════════════════════════════ */
  const counterCurrentEl = section.querySelector('.proj__counter-current');
  const counterTotalEl   = section.querySelector('.proj__counter-total');
  const catEl            = section.querySelector('.proj__info');
  const yearEl           = section.querySelector('.proj__year-wrap');
  const scrollHint       = section.querySelector('.proj__scroll-hint');
  const dialTrack        = section.querySelector('.proj__dial-track');

  const dropdownEl = section.querySelector('.proj__dropdown');
  const dropToggle = section.querySelector('.proj__dropdown-toggle');
  const dropMenu   = section.querySelector('.proj__dropdown-menu');
  const dropActive = section.querySelector('.proj__dropdown-active');
  const dropBtns   = section.querySelectorAll('.proj__dropdown-menu button');
  const listEl     = section.querySelector('.proj__list');
  const viewBtns   = section.querySelectorAll('.proj__view-btn');

  /* ═══════════════════════════════════════════════════════
     État
     ═══════════════════════════════════════════════════════ */
  let filtered     = [...ALL];
  let currentIdx   = 0;
  let isAnimating  = false;
  let isListMode   = false;
  let contactOpen  = false;

  function buildDecoLines() {
    dialTrack.innerHTML = '';
    filtered.forEach(() => {
      const s = document.createElement('span');
      s.className = 'proj__dial-tick';
      dialTrack.appendChild(s);
    });
  }

  function updateDecoActive() {
    dialTrack.querySelectorAll('.proj__dial-tick').forEach((tick, i) => {
      tick.classList.toggle('is-active', i === currentIdx);
    });
  }

  /* ═══════════════════════════════════════════════════════
     Contact overlay — slide depuis le bas
     ═══════════════════════════════════════════════════════ */
  window.__openContact = function () {
    if (contactOpen) return;
    contactOpen = true;
    gsap.to('#contact', {
      y: '-100vh', duration: 0.8, ease: 'power3.out',
      onComplete: () => window.dispatchEvent(new CustomEvent('contact:open'))
    });
  };

  window.__closeContact = function () {
    contactOpen = false;
    window.dispatchEvent(new CustomEvent('contact:close'));
    gsap.to('#contact', {
      y: '0', duration: 0.6, ease: 'power3.in',
      onComplete: function () {
        var card = document.querySelector('#contact .ct__card');
        if (card) gsap.set(card, { opacity: 0 });
      }
    });
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && contactOpen) window.__closeContact();
  });

  /* ═══════════════════════════════════════════════════════
     Parallaxe dial — souris
     ═══════════════════════════════════════════════════════ */
  section.addEventListener('mousemove', e => {
    const ny = e.clientY / window.innerHeight - 0.5;
    dialTrack.style.transform = `translateY(${(ny * -8).toFixed(2)}px)`;
  });

  /* ═══════════════════════════════════════════════════════
     Mise à jour UI
     ═══════════════════════════════════════════════════════ */
  function updateUI() {
    const p = filtered[currentIdx];
    if (!p) return;
    const n     = String(currentIdx + 1).padStart(2, '0');
    const total = String(filtered.length).padStart(2, '0');
    counterCurrentEl.textContent = n;
    counterTotalEl.textContent   = total;
    catEl.textContent   = p.cat;
    yearEl.textContent  = p.annee;
    titleEl.textContent = p.titre;
    imgEl.src = p.img || '';
    imgEl.alt = p.titre;
    imgWrap.classList.toggle('proj__img-wrap--portrait', p.format === 'portrait');
    sliderFx.resetHolo();
    if (window._recacheMagnetic) window._recacheMagnetic();
    updateDecoActive();
  }

  /* ═══════════════════════════════════════════════════════
     Transition entre projets
     ═══════════════════════════════════════════════════════ */
  function goTo(newIdx, dir) {
    if (isAnimating || newIdx < 0 || newIdx >= filtered.length) return;
    if (newIdx === currentIdx) return;
    isAnimating = true;

    const yExit  = `${dir * 70}%`;
    const yEnter = `${dir * -70}%`;

    gsap.to(imgWrap, { y: yExit, opacity: 0, duration: 0.42, ease: 'power2.in' });
    gsap.to(titleEl, { y: yExit, opacity: 0, duration: 0.36, ease: 'power2.in', delay: 0.04 });

    setTimeout(() => {
      currentIdx = newIdx;
      updateUI();
      gsap.fromTo(imgWrap,
        { y: yEnter, opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.52, ease: 'power2.out',
          onComplete: () => { isAnimating = false; }
        }
      );
      gsap.fromTo(titleEl,
        { y: yEnter, opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.44, ease: 'power2.out', delay: 0.06 }
      );
    }, 450);
  }

  /* ═══════════════════════════════════════════════════════
     Navigation — wheel
     ═══════════════════════════════════════════════════════ */
  let wheelCooldown = false;

  window.addEventListener('wheel', e => {
    if (isListMode) return;

    const r = section.getBoundingClientRect();
    const inSection = r.top <= 10 && r.bottom >= window.innerHeight - 10;
    if (!inSection) return;

    // contact ouvert → bloquer tout wheel dans la section
    if (contactOpen) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    if (e.deltaY < 0 && currentIdx === 0) return;

    if (e.deltaY > 0 && currentIdx === filtered.length - 1) {
      e.preventDefault();
      e.stopImmediatePropagation();
      contactOpen = true;
      gsap.to('#contact', {
        y: '-100vh', duration: 0.8, ease: 'power3.out',
        onComplete: () => window.dispatchEvent(new CustomEvent('contact:open'))
      });
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();

    if (wheelCooldown || isAnimating) return;
    wheelCooldown = true;
    setTimeout(() => { wheelCooldown = false; }, 920);

    if (scrollHint && !scrollHint.classList.contains('is-hidden'))
      scrollHint.classList.add('is-hidden');

    if (e.deltaY > 0) goTo(currentIdx + 1,  1);
    else              goTo(currentIdx - 1, -1);

  }, { passive: false, capture: true });

  /* ═══════════════════════════════════════════════════════
     Filtre — dropdown
     ═══════════════════════════════════════════════════════ */
  dropToggle.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = dropdownEl.classList.toggle('is-open');
    dropMenu.classList.toggle('is-open', isOpen);
  });

  document.addEventListener('click', () => {
    dropdownEl.classList.remove('is-open');
    dropMenu.classList.remove('is-open');
  });

  dropBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (btn.classList.contains('is-active')) {
        dropdownEl.classList.remove('is-open');
        dropMenu.classList.remove('is-open');
        return;
      }
      dropBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const cat = btn.dataset.filter;
      dropActive.textContent = cat;
      dropdownEl.classList.remove('is-open');
      dropMenu.classList.remove('is-open');

      const next = cat === 'TOUT' ? [...ALL] : ALL.filter(p => p.cat === cat);

      if (isListMode) {
        gsap.to(listEl, { opacity: 0, duration: 0.15, ease: 'power2.in', onComplete: () => {
          filtered = next; currentIdx = 0;
          buildDecoLines(); buildList();
          gsap.to(listEl, { opacity: 1, duration: 0.25, ease: 'power2.out' });
        }});
      } else {
        gsap.to([imgWrap, titleEl], {
          opacity: 0, duration: 0.22, ease: 'power2.in',
          onComplete: () => {
            filtered   = next;
            currentIdx = 0;
            buildDecoLines();
            updateUI();
            gsap.to([imgWrap, titleEl], { opacity: 1, duration: 0.32, ease: 'power2.out' });
          },
        });
      }
    });
  });

  /* ═══════════════════════════════════════════════════════
     Vue liste — build + toggle + preview flottante
     ═══════════════════════════════════════════════════════ */

  // ── Preview image ──────────────────────────────────────
  const previewEl  = document.createElement('div');
  previewEl.className = 'proj__list-preview';
  const previewImg = document.createElement('img');
  previewImg.alt   = '';
  previewEl.appendChild(previewImg);
  document.body.appendChild(previewEl);

  let prevMx = 0, prevMy = 0, prevPx = 0, prevPy = 0, prevVx = 0;

  document.addEventListener('mousemove', e => { prevMx = e.clientX; prevMy = e.clientY; });

  (function previewTick() {
    const dx = prevMx - prevPx;
    const dy = prevMy - prevPy;
    prevPx += dx * 0.08;
    prevPy += dy * 0.08;
    prevVx  = prevVx * 0.7 + dx * 0.3;
    const rot = Math.max(-3, Math.min(3, prevVx * 0.12));
    previewEl.style.transform = `translate(${(prevPx + 24).toFixed(1)}px, ${(prevPy - 140).toFixed(1)}px) rotate(${rot.toFixed(2)}deg)`;
    requestAnimationFrame(previewTick);
  })();

  // ── Scroll garanti sur la liste (contourne Lenis + capture handler) ──
  listEl.addEventListener('wheel', e => {
    if (!isListMode) return;
    listEl.scrollTop += e.deltaY;
    e.stopPropagation(); // empêche Lenis (bubble phase) de voir l'événement
  }, { passive: true });

  // ── Build liste ────────────────────────────────────────
  function buildList() {
    listEl.scrollTop = 0;
    listEl.innerHTML = '';

    // En-tête colonnes
    const header = document.createElement('div');
    header.className = 'proj__list-header';
    header.innerHTML = '<span>#</span><span>PROJET</span><span>CLIENT</span><span style="text-align:right">ANNÉE</span>';
    listEl.appendChild(header);

    filtered.forEach((p, i) => {
      const item = document.createElement('div');
      item.className = 'proj__list-item';
      item.innerHTML =
        `<span class="proj__list-num">${String(i + 1).padStart(2, '0')}</span>` +
        `<span class="proj__list-title">${p.titre}</span>` +
        `<span class="proj__list-client">${p.client || ''}</span>` +
        `<span class="proj__list-year">${p.annee}</span>`;

      item.addEventListener('click', () => openDetail(p));
      item.addEventListener('mouseenter', () => {
        previewImg.src = p.img || '';
        previewEl.classList.add('is-visible');
      });
      item.addEventListener('mouseleave', () => {
        previewEl.classList.remove('is-visible');
      });
      listEl.appendChild(item);
    });
  }

  // ── Toggle SLIDER / LISTE ──────────────────────────────
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view === 'list' && !isListMode) {
        isListMode = true;
        if (window.__lenis) window.__lenis.stop();
        viewBtns.forEach(b => b.classList.toggle('is-active', b.dataset.view === 'list'));
        buildList();
        section.classList.add('proj--list-mode');
        gsap.fromTo(listEl, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      } else if (view === 'slider' && isListMode) {
        gsap.to(listEl, { opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: () => {
          isListMode = false;
          if (window.__lenis) window.__lenis.start();
          viewBtns.forEach(b => b.classList.toggle('is-active', b.dataset.view === 'slider'));
          section.classList.remove('proj--list-mode');
          gsap.fromTo([imgWrap, titleEl], { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        }});
      }
    });
  });

  /* ═══════════════════════════════════════════════════════
     Overlay détail projet
     ═══════════════════════════════════════════════════════ */
  const detailEl   = document.getElementById('project-detail');
  const pdCardWrap = detailEl.querySelector('.pd__card-wrap');

  const detailFx = initImageEffects(pdCardWrap, { maxRX: 4, maxRY: 4, damp: 0.04, floatAmplitude: 0 });

  function openDetail(p) {
    // ── Média : vidéo ou image ────────────────────────────
    let videoEl = pdCardWrap.querySelector('.pd__video');

    if (p.video) {
      if (!videoEl) {
        videoEl = document.createElement('video');
        videoEl.className  = 'pd__video';
        videoEl.autoplay   = true;
        videoEl.loop       = true;
        videoEl.muted      = true;
        videoEl.controls   = true;
        videoEl.playsInline = true;
        // Inséré dans imgInner (avant le holo canvas) → border-radius + overflow: hidden appliqués
        detailFx.imgInner.insertBefore(videoEl, detailFx.imgEl);
      }
      videoEl.src = p.video;
      videoEl.load();
      videoEl.style.display  = '';
      detailFx.imgEl.style.display = 'none';
    } else {
      if (videoEl) {
        videoEl.pause();
        videoEl.src           = '';
        videoEl.style.display = 'none';
      }
      detailFx.imgEl.src           = p.img   || '';
      detailFx.imgEl.alt           = p.titre || '';
      detailFx.imgEl.style.display = '';
    }

    detailFx.resetHolo();

    // ── Textes ────────────────────────────────────────────
    detailEl.querySelector('.pd__client-val').textContent = p.client || '';
    detailEl.querySelector('.pd__year-val').textContent   = p.annee  || '';
    detailEl.querySelector('.pd__title').textContent        = p.titre       || '';
    detailEl.querySelector('.pd__contexte').textContent    = p.contexte    || '';
    detailEl.querySelector('.pd__realisation').textContent = p.realisation  || '';

    const rolesEl = detailEl.querySelector('.pd__roles');
    rolesEl.innerHTML = '';
    (p.roles || []).forEach(r => {
      const pill = document.createElement('span');
      pill.className   = 'pd__role';
      pill.textContent = r;
      rolesEl.appendChild(pill);
    });

    // ── Ouverture overlay ─────────────────────────────────
    detailEl.removeAttribute('aria-hidden');
    detailEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (window.__lenis) window.__lenis.stop();

    const animEls = detailEl.querySelectorAll('.pd__animate');
    animEls.forEach(el => gsap.set(el, { y: 20, opacity: 0 }));
    animEls.forEach((el, i) =>
      gsap.to(el, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.3 + i * 0.1 })
    );
  }

  function closeDetail() {
    const videoEl = pdCardWrap.querySelector('.pd__video');
    if (videoEl) { videoEl.pause(); videoEl.src = ''; }

    detailEl.classList.remove('is-open');
    detailEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (window.__lenis) window.__lenis.start();
  }

  imgWrap.addEventListener('click', () => openDetail(filtered[currentIdx]));
  detailEl.querySelector('.pd__back').addEventListener('click', closeDetail);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && detailEl.classList.contains('is-open')) closeDetail();
  });

  /* ═══════════════════════════════════════════════════════
     Entrée au scroll — GSAP ScrollTrigger
     ═══════════════════════════════════════════════════════ */
  if (window.gsap && window.ScrollTrigger) {
    gsap.from('.proj__deco-top', {
      y: -20, opacity: 0, duration: 0.7, ease: 'power3.out',
      clearProps: 'all',
      scrollTrigger: { trigger: section, start: 'top 90%' },
    });
    gsap.from(imgWrap, {
      y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
      clearProps: 'all',
      scrollTrigger: { trigger: section, start: 'top 80%' },
    });
    gsap.from(titleEl, {
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
      clearProps: 'all',
      scrollTrigger: { trigger: section, start: 'top 80%' },
    });
  }

  /* ═══════════════════════════════════════════════════════
     Init
     ═══════════════════════════════════════════════════════ */
  buildDecoLines();
  updateUI();

})();
