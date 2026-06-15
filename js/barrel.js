// barrel.js — barrel distortion via SVG feDisplacementMap

(function initBarrel() {

  const content = document.querySelector('.hero__content');
  if (!content) return;

  const SIZE = 256;
  const k    = 0.04; // intensité pincushion — très subtil

  /* ── Génération de la carte de déplacement ────────────────
     R = déplacement horizontal, G = vertical
     128 = pas de déplacement
     Pincushion : + signe → bords tirés vers l'extérieur du bord */
  const mc  = document.createElement('canvas');
  mc.width  = mc.height = SIZE;
  const mx  = mc.getContext('2d');
  const img = mx.createImageData(SIZE, SIZE);

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const nx = (x / (SIZE - 1)) * 2 - 1; // [-1, 1]
      const ny = (y / (SIZE - 1)) * 2 - 1;
      const r2 = nx * nx + ny * ny;

      // Pincushion : échantillonner depuis l'extérieur (bords courbent vers l'intérieur)
      const R = Math.max(0, Math.min(1, 0.5 + nx * r2 * k));
      const G = Math.max(0, Math.min(1, 0.5 + ny * r2 * k));

      const i = (y * SIZE + x) * 4;
      img.data[i    ] = Math.round(R * 255);
      img.data[i + 1] = Math.round(G * 255);
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  mx.putImageData(img, 0, 0);

  /* ── SVG filter ───────────────────────────────────────────── */
  const NS     = 'http://www.w3.org/2000/svg';
  const svg    = document.createElementNS(NS, 'svg');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';

  const defs   = document.createElementNS(NS, 'defs');
  const filter = document.createElementNS(NS, 'filter');
  filter.setAttribute('id',     'hero-barrel');
  filter.setAttribute('x',      '0%');
  filter.setAttribute('y',      '0%');
  filter.setAttribute('width',  '100%');
  filter.setAttribute('height', '100%');
  filter.setAttribute('color-interpolation-filters', 'sRGB');

  const feImg = document.createElementNS(NS, 'feImage');
  feImg.setAttribute('href',               mc.toDataURL());
  feImg.setAttribute('result',             'map');
  feImg.setAttribute('preserveAspectRatio','none');
  feImg.setAttribute('width',              '100%');
  feImg.setAttribute('height',             '100%');

  const feDM  = document.createElementNS(NS, 'feDisplacementMap');
  feDM.setAttribute('in',              'SourceGraphic');
  feDM.setAttribute('in2',             'map');
  feDM.setAttribute('xChannelSelector','R');
  feDM.setAttribute('yChannelSelector','G');

  filter.appendChild(feImg);
  filter.appendChild(feDM);
  defs.appendChild(filter);
  svg.appendChild(defs);
  document.body.appendChild(svg);

  /* ── Application unique au chargement ────────────────────── */
  feDM.setAttribute('scale', String(content.offsetWidth / 2));
  content.style.filter = 'url(#hero-barrel)';

})();
