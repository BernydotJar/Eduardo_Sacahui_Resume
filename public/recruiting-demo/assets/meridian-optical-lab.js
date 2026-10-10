/** Meridian v4 optical experiment. No dependency, network, or background renderer. */
(() => {
  'use strict';
  const descriptions = {
    regular: 'Regular: legible, softly translucent controls.',
    clear: 'Clear: use only over intentionally visual backgrounds.',
    content: 'Content: fully opaque for recruiting data and evidence.'
  };
  const sample = document.querySelector('[data-meridian-specimen] [data-material]');
  const description = document.getElementById('meridian-material-description');
  const buttons = [...document.querySelectorAll('[data-select-material]')];
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const material = button.dataset.selectMaterial;
      if (!Object.prototype.hasOwnProperty.call(descriptions, material)) return;
      sample.dataset.material = material;
      description.textContent = descriptions[material];
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    });
  }

  const reduced = window.matchMedia('(prefers-reduced-transparency: reduce)');
  const transparencyStatus = document.getElementById('meridian-lab-transparency');
  const gpuStatus = document.getElementById('meridian-lab-webgpu');
  const stage = document.querySelector('[data-optical-stage]');
  const art = stage.querySelector('[data-optical-art]');
  const lens = stage.querySelector('[data-optical-lens]');
  const refracted = lens.querySelector('[data-optical-refracted]');
  const clone = lens.querySelector('[data-optical-clone]');
  const svgFilter = document.getElementById('meridian-refract-v4');
  const feImage = svgFilter.querySelector('feImage');
  const PADDING = 18;
  let signature = '';
  let raf = 0;

  const clamp = x => Math.max(0, Math.min(255, Math.round(x)));
  const smoothstep = value => {
    const t = Math.max(0, Math.min(1, value));
    return t * t * (3 - 2 * t);
  };
  const roundedDistance = (x, y, width, height, radius) => {
    const dx = Math.abs(x) - (width / 2 - radius);
    const dy = Math.abs(y) - (height / 2 - radius);
    return Math.hypot(Math.max(0, dx), Math.max(0, dy)) + Math.min(Math.max(dx, dy), 0) - radius;
  };
  // Build once per geometry signature. The image is not regenerated on animation frames.
  const buildDisplacement = (mapWidth, mapHeight, lensWidth, lensHeight) => {
    const canvas = document.createElement('canvas');
    canvas.width = mapWidth;
    canvas.height = mapHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return null;
    const data = ctx.createImageData(mapWidth, mapHeight);
    const radius = Math.min(27, Math.round(lensHeight / 2.5));
    const distance = (x, y) => roundedDistance(x - mapWidth / 2, y - mapHeight / 2, lensWidth, lensHeight, radius);
    for (let y = 0; y < mapHeight; y += 1) {
      for (let x = 0; x < mapWidth; x += 1) {
        const cx = x + .5;
        const cy = y + .5;
        const d = distance(cx, cy);
        const gx = distance(cx + 1, cy) - distance(cx - 1, cy);
        const gy = distance(cx, cy + 1) - distance(cx, cy - 1);
        const magnitude = Math.hypot(gx, gy) || 1;
        const edge = Math.max(0, 1 - Math.abs(d) / (d < 0 ? 24 : 4));
        const power = Math.pow(smoothstep(edge), 1.65);
        const i = 4 * (y * mapWidth + x);
        data.data[i] = clamp(128 - gx / magnitude * power * 100);
        data.data[i + 1] = clamp(128 - gy / magnitude * power * 100);
        data.data[i + 2] = 128;
        data.data[i + 3] = 255;
      }
    }
    ctx.putImageData(data, 0, 0);
    return canvas.toDataURL('image/png');
  };

  const clearRefraction = () => {
    lens.dataset.refractionReady = 'false';
    refracted.style.filter = 'none';
    feImage.removeAttribute('href');
    signature = '';
  };
  const measure = () => {
    cancelAnimationFrame(raf);
    if (reduced.matches) { clearRefraction(); return; }
    raf = requestAnimationFrame(() => {
      if (!stage.isConnected || !lens.isConnected || reduced.matches) return;
      const root = stage.getBoundingClientRect();
      const bounds = lens.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      const left = Math.round(bounds.left - root.left);
      const top = Math.round(bounds.top - root.top);
      const nextSignature = [root.width, root.height, width, height, left, top].map(Math.round).join(':');
      if (nextSignature === signature) return;
      const mapWidth = width + 2 * PADDING;
      const mapHeight = height + 2 * PADDING;
      const map = buildDisplacement(mapWidth, mapHeight, width, height);
      if (!map) { clearRefraction(); return; }
      clone.style.width = Math.round(root.width) + 'px';
      clone.style.height = Math.round(root.height) + 'px';
      clone.style.left = (PADDING - left) + 'px';
      clone.style.top = (PADDING - top) + 'px';
      svgFilter.setAttribute('width', String(mapWidth));
      svgFilter.setAttribute('height', String(mapHeight));
      feImage.setAttribute('width', String(mapWidth));
      feImage.setAttribute('height', String(mapHeight));
      feImage.setAttribute('href', map);
      refracted.style.filter = 'url(#meridian-refract-v4)';
      signature = nextSignature;
      lens.dataset.refractionReady = 'true';
    });
  };
  const sceneCopy = art.cloneNode(true);
  sceneCopy.removeAttribute('data-optical-art');
  sceneCopy.setAttribute('aria-hidden', 'true');
  clone.appendChild(sceneCopy);

  const updateTransparency = () => {
    transparencyStatus.textContent = reduced.matches
      ? 'Reduced: refraction generation disabled; solid fallbacks active.'
      : 'Standard: bounded CSS/SVG optics available.';
    measure();
  };
  reduced.addEventListener('change', updateTransparency);
  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
  observer?.observe(stage);
  observer?.observe(lens);
  if (!observer) window.addEventListener('resize', measure, { passive: true });
  updateTransparency();

  const gpu = navigator.gpu;
  if (!gpu || typeof gpu.requestAdapter !== 'function') {
    gpuStatus.textContent = 'WebGPU unavailable; CSS/SVG fallback active.';
  } else {
    Promise.resolve().then(() => gpu.requestAdapter()).then(adapter => {
      gpuStatus.textContent = adapter
        ? 'WebGPU available; experimental engine not installed.'
        : 'WebGPU adapter unavailable; CSS/SVG fallback active.';
    }).catch(() => {
      gpuStatus.textContent = 'WebGPU adapter unavailable; CSS/SVG fallback active.';
    });
  }
})();
