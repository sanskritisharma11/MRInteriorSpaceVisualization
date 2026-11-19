/* =========================================================
   Mixed Reality Room Designer – furniture catalogue & builders
   Shared by the VR designer (vr.html) and the AR viewer (ar.html).
   All sizes are in metres. Every item stands on the floor (y = 0)
   and its front faces +Z.
   ========================================================= */
window.MR = window.MR || {};

(function (MR) {
  const WOOD = '#8a5a35', DARK = '#3b2a1e', METAL = '#55575c';

  // Part types: box (s = [w, h, d]), cyl (r, h), sph (r, sc = scale), cone (r1 bottom, r2 top, h)
  // c: 'main' = recolourable colour, or a fixed hex colour.  e: true = glows.
  MR.CATALOG = {
    sofa: {
      name: 'Sofa', icon: '🛋️', main: '#3d5a99',
      palette: ['#3d5a99', '#9c2f35', '#2f6b4f', '#c9b48a', '#4a4a4f', '#d9822b'],
      parts: [
        { t: 'box', p: [0, 0.25, 0], s: [1.9, 0.3, 0.85], c: 'main' },
        { t: 'box', p: [0, 0.62, -0.33], s: [1.9, 0.5, 0.2], c: 'main' },
        { t: 'box', p: [0.87, 0.45, 0], s: [0.16, 0.36, 0.85], c: 'main' },
        { t: 'box', p: [-0.87, 0.45, 0], s: [0.16, 0.36, 0.85], c: 'main' },
        { t: 'box', p: [-0.4, 0.46, 0.07], s: [0.76, 0.12, 0.66], c: '#e8e0d0' },
        { t: 'box', p: [0.4, 0.46, 0.07], s: [0.76, 0.12, 0.66], c: '#e8e0d0' },
        { t: 'cyl', p: [0.85, 0.05, 0.35], r: 0.03, h: 0.1, c: DARK },
        { t: 'cyl', p: [-0.85, 0.05, 0.35], r: 0.03, h: 0.1, c: DARK },
        { t: 'cyl', p: [0.85, 0.05, -0.35], r: 0.03, h: 0.1, c: DARK },
        { t: 'cyl', p: [-0.85, 0.05, -0.35], r: 0.03, h: 0.1, c: DARK }
      ]
    },
    armchair: {
      name: 'Armchair', icon: '💺', main: '#9c2f35',
      palette: ['#9c2f35', '#3d5a99', '#2f6b4f', '#c9b48a', '#4a4a4f', '#d9822b'],
      parts: [
        { t: 'box', p: [0, 0.25, 0], s: [0.85, 0.3, 0.8], c: 'main' },
        { t: 'box', p: [0, 0.62, -0.3], s: [0.85, 0.5, 0.2], c: 'main' },
        { t: 'box', p: [0.36, 0.45, 0], s: [0.13, 0.36, 0.8], c: 'main' },
        { t: 'box', p: [-0.36, 0.45, 0], s: [0.13, 0.36, 0.8], c: 'main' },
        { t: 'box', p: [0, 0.46, 0.06], s: [0.58, 0.12, 0.6], c: '#e8e0d0' },
        { t: 'cyl', p: [0.35, 0.05, 0.32], r: 0.03, h: 0.1, c: DARK },
        { t: 'cyl', p: [-0.35, 0.05, 0.32], r: 0.03, h: 0.1, c: DARK },
        { t: 'cyl', p: [0.35, 0.05, -0.32], r: 0.03, h: 0.1, c: DARK },
        { t: 'cyl', p: [-0.35, 0.05, -0.32], r: 0.03, h: 0.1, c: DARK }
      ]
    },
    coffeeTable: {
      name: 'Coffee Table', icon: '☕', main: WOOD,
      palette: [WOOD, '#5c3b22', '#d8bf94', '#f2f2f2', '#222222'],
      parts: [
        { t: 'box', p: [0, 0.42, 0], s: [1.1, 0.05, 0.6], c: 'main' },
        { t: 'box', p: [0, 0.12, 0], s: [1.0, 0.03, 0.5], c: 'main' },
        { t: 'box', p: [0.5, 0.2, 0.25], s: [0.05, 0.4, 0.05], c: DARK },
        { t: 'box', p: [-0.5, 0.2, 0.25], s: [0.05, 0.4, 0.05], c: DARK },
        { t: 'box', p: [0.5, 0.2, -0.25], s: [0.05, 0.4, 0.05], c: DARK },
        { t: 'box', p: [-0.5, 0.2, -0.25], s: [0.05, 0.4, 0.05], c: DARK },
        { t: 'cyl', p: [0.25, 0.5, 0.05], r: 0.045, h: 0.1, c: '#f4f1ea' }
      ]
    },
    diningTable: {
      name: 'Dining Table', icon: '🍽️', main: WOOD,
      palette: [WOOD, '#5c3b22', '#d8bf94', '#f2f2f2', '#222222'],
      parts: [
        { t: 'box', p: [0, 0.75, 0], s: [1.6, 0.05, 0.9], c: 'main' },
        { t: 'box', p: [0.72, 0.36, 0.38], s: [0.07, 0.72, 0.07], c: 'main' },
        { t: 'box', p: [-0.72, 0.36, 0.38], s: [0.07, 0.72, 0.07], c: 'main' },
        { t: 'box', p: [0.72, 0.36, -0.38], s: [0.07, 0.72, 0.07], c: 'main' },
        { t: 'box', p: [-0.72, 0.36, -0.38], s: [0.07, 0.72, 0.07], c: 'main' }
      ]
    },
    chair: {
      name: 'Chair', icon: '🪑', main: WOOD,
      palette: [WOOD, '#5c3b22', '#d8bf94', '#f2f2f2', '#222222'],
      parts: [
        { t: 'box', p: [0, 0.45, 0], s: [0.45, 0.05, 0.45], c: 'main' },
        { t: 'box', p: [0, 0.75, -0.205], s: [0.45, 0.55, 0.04], c: 'main' },
        { t: 'box', p: [0, 0.485, 0.01], s: [0.4, 0.03, 0.4], c: '#e8e0d0' },
        { t: 'box', p: [0.19, 0.215, 0.19], s: [0.04, 0.43, 0.04], c: 'main' },
        { t: 'box', p: [-0.19, 0.215, 0.19], s: [0.04, 0.43, 0.04], c: 'main' },
        { t: 'box', p: [0.19, 0.215, -0.19], s: [0.04, 0.43, 0.04], c: 'main' },
        { t: 'box', p: [-0.19, 0.215, -0.19], s: [0.04, 0.43, 0.04], c: 'main' }
      ]
    },
    bed: {
      name: 'Bed', icon: '🛏️', main: '#3d5a99',
      palette: ['#3d5a99', '#9c2f35', '#2f6b4f', '#c9b48a', '#6d5a8c', '#e0e0e0'],
      parts: [
        { t: 'box', p: [0, 0.18, 0], s: [1.65, 0.26, 2.1], c: WOOD },
        { t: 'box', p: [0, 0.42, 0.03], s: [1.55, 0.22, 1.98], c: '#f3f1ec' },
        { t: 'box', p: [0, 0.6, -1.03], s: [1.65, 1.0, 0.08], c: WOOD },
        { t: 'box', p: [0.4, 0.59, -0.75], s: [0.55, 0.12, 0.32], c: '#ffffff' },
        { t: 'box', p: [-0.4, 0.59, -0.75], s: [0.55, 0.12, 0.32], c: '#ffffff' },
        { t: 'box', p: [0, 0.545, 0.35], s: [1.59, 0.04, 1.3], c: 'main' }
      ]
    },
    bookshelf: {
      name: 'Bookshelf', icon: '📚', main: WOOD,
      palette: [WOOD, '#5c3b22', '#d8bf94', '#f2f2f2', '#222222'],
      parts: [
        { t: 'box', p: [0.435, 0.9, 0], s: [0.03, 1.8, 0.32], c: 'main' },
        { t: 'box', p: [-0.435, 0.9, 0], s: [0.03, 1.8, 0.32], c: 'main' },
        { t: 'box', p: [0, 1.785, 0], s: [0.9, 0.03, 0.32], c: 'main' },
        { t: 'box', p: [0, 0.9, -0.15], s: [0.9, 1.8, 0.02], c: 'main' },
        { t: 'box', p: [0, 0.015, 0], s: [0.87, 0.03, 0.3], c: 'main' },
        { t: 'box', p: [0, 0.45, 0], s: [0.87, 0.03, 0.3], c: 'main' },
        { t: 'box', p: [0, 0.9, 0], s: [0.87, 0.03, 0.3], c: 'main' },
        { t: 'box', p: [0, 1.35, 0], s: [0.87, 0.03, 0.3], c: 'main' },
        { t: 'box', p: [-0.3, 0.17, 0.02], s: [0.08, 0.28, 0.22], c: '#b33939' },
        { t: 'box', p: [-0.2, 0.15, 0.02], s: [0.07, 0.24, 0.22], c: '#2d6a9f' },
        { t: 'box', p: [-0.11, 0.16, 0.02], s: [0.08, 0.26, 0.22], c: '#e0b040' },
        { t: 'box', p: [0.15, 0.6, 0.02], s: [0.08, 0.27, 0.22], c: '#3c8d5a' },
        { t: 'box', p: [0.24, 0.58, 0.02], s: [0.07, 0.23, 0.22], c: '#7a4f9a' },
        { t: 'box', p: [0.33, 0.6, 0.02], s: [0.08, 0.27, 0.22], c: '#d06030' },
        { t: 'box', p: [-0.25, 1.05, 0.02], s: [0.08, 0.27, 0.22], c: '#2d6a9f' },
        { t: 'box', p: [-0.15, 1.04, 0.02], s: [0.08, 0.25, 0.22], c: '#e8e0d0' },
        { t: 'sph', p: [0.2, 1.47, 0], r: 0.09, c: '#4a8a5a' }
      ]
    },
    tvUnit: {
      name: 'TV Unit', icon: '📺', main: '#2b2b2e',
      palette: ['#2b2b2e', WOOD, '#f2f2f2', '#5c3b22', '#3d5a99'],
      parts: [
        { t: 'box', p: [0, 0.25, 0], s: [1.6, 0.45, 0.42], c: 'main' },
        { t: 'box', p: [0, 0.5, -0.05], s: [0.3, 0.06, 0.2], c: '#1a1a1a' },
        { t: 'box', p: [0, 0.97, -0.06], s: [1.22, 0.72, 0.05], c: '#111111' },
        { t: 'box', p: [0, 0.97, -0.03], s: [1.14, 0.64, 0.01], c: '#2a5a8a', e: true }
      ]
    },
    floorLamp: {
      name: 'Floor Lamp', icon: '💡', main: '#f5e6c8',
      palette: ['#f5e6c8', '#ffffff', '#7fb3d5', '#e59866', '#a9cce3'],
      light: { y: 1.38, color: '#ffd9a0' },
      parts: [
        { t: 'cyl', p: [0, 0.015, 0], r: 0.17, h: 0.03, c: METAL },
        { t: 'cyl', p: [0, 0.72, 0], r: 0.018, h: 1.4, c: METAL },
        { t: 'cone', p: [0, 1.5, 0], r1: 0.25, r2: 0.15, h: 0.3, c: 'main', e: true }
      ]
    },
    plant: {
      name: 'Plant', icon: '🪴', main: '#c0643a',
      palette: ['#c0643a', '#f2f2ee', '#2b2b2e', '#5b8db8', '#d4b85a'],
      parts: [
        { t: 'cyl', p: [0, 0.16, 0], r: 0.17, h: 0.32, c: 'main' },
        { t: 'cyl', p: [0, 0.325, 0], r: 0.155, h: 0.02, c: DARK },
        { t: 'sph', p: [0, 0.65, 0], r: 0.28, sc: [1, 1.2, 1], c: '#2f7a3a' },
        { t: 'sph', p: [0.13, 0.88, 0.05], r: 0.17, c: '#3b8f45' },
        { t: 'sph', p: [-0.12, 0.83, -0.07], r: 0.16, c: '#27692f' }
      ]
    },
    rug: {
      name: 'Rug', icon: '🟫', main: '#8c3a3a',
      palette: ['#8c3a3a', '#3d5a99', '#c9b48a', '#4a4a4f', '#2f6b4f', '#e8e0d0'],
      flat: true,
      parts: [
        { t: 'box', p: [0, 0.006, 0], s: [2.4, 0.012, 1.6], c: 'main' },
        { t: 'box', p: [0, 0.008, 0], s: [2.0, 0.012, 1.2], c: '#e8d9b5' },
        { t: 'box', p: [0, 0.01, 0], s: [1.8, 0.012, 1.0], c: 'main' }
      ]
    }
  };

  /**
   * Builds one furniture item as an A-Frame entity.
   * options: { lights: true/false, shadows: true/false }
   */
  MR.buildFurniture = function (type, colour, options) {
    const def = MR.CATALOG[type];
    if (!def) return null;
    options = options || {};
    const main = colour || def.main;

    const root = document.createElement('a-entity');
    root.classList.add('furniture');
    root.dataset.type = type;
    root.dataset.colour = main;

    def.parts.forEach(function (part) {
      const el = document.createElement('a-entity');
      const c = part.c === 'main' ? main : part.c;

      if (part.t === 'box') {
        el.setAttribute('geometry', { primitive: 'box', width: part.s[0], height: part.s[1], depth: part.s[2] });
      } else if (part.t === 'cyl') {
        el.setAttribute('geometry', { primitive: 'cylinder', radius: part.r, height: part.h, segmentsRadial: 24 });
      } else if (part.t === 'sph') {
        el.setAttribute('geometry', { primitive: 'sphere', radius: part.r, segmentsWidth: 20, segmentsHeight: 14 });
        if (part.sc) el.setAttribute('scale', part.sc.join(' '));
      } else if (part.t === 'cone') {
        el.setAttribute('geometry', { primitive: 'cone', radiusBottom: part.r1, radiusTop: part.r2, height: part.h, openEnded: true, segmentsRadial: 24 });
      }

      const mat = { color: c, roughness: 0.75, metalness: c === METAL ? 0.6 : 0.05, side: part.t === 'cone' ? 'double' : 'front' };
      if (part.e) { mat.emissive = c; mat.emissiveIntensity = 0.55; }
      el.setAttribute('material', mat);
      el.setAttribute('position', part.p.join(' '));
      if (options.shadows !== false && !def.flat) el.setAttribute('shadow', 'cast: true; receive: true');
      if (part.c === 'main') el.classList.add('recolour');
      root.appendChild(el);
    });

    if (def.light && options.lights !== false) {
      const light = document.createElement('a-entity');
      light.classList.add('lamp-light');
      light.setAttribute('light', { type: 'point', color: def.light.color, intensity: 1.6, distance: 5, decay: 1.2 });
      light.setAttribute('position', '0 ' + def.light.y + ' 0');
      root.appendChild(light);
    }
    return root;
  };

  MR.recolour = function (root, colour) {
    root.dataset.colour = colour;
    root.querySelectorAll('.recolour').forEach(function (el) {
      el.setAttribute('material', 'color', colour);
      if (el.getAttribute('material').emissiveIntensity > 0) el.setAttribute('material', 'emissive', colour);
    });
  };

  /* ---------- Floor textures drawn on a canvas (no image files needed) ---------- */
  MR.FLOORS = {
    oak:     { name: 'Oak',      kind: 'planks', base: '#b8875a' },
    walnut:  { name: 'Walnut',   kind: 'planks', base: '#6b4a33' },
    marble:  { name: 'Marble',   kind: 'tiles',  base: '#e9e6e0' },
    slate:   { name: 'Slate',    kind: 'tiles',  base: '#6e7378' }
  };

  function shade(hex, amount) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.max(0, Math.min(255, (n >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amount));
    const b = Math.max(0, Math.min(255, (n & 255) + amount));
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  MR.makeFloorTexture = function (styleKey) {
    const style = MR.FLOORS[styleKey] || MR.FLOORS.oak;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 512;
    const ctx = canvas.getContext('2d');
    let seed = 7;
    const rand = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };

    if (style.kind === 'planks') {
      const rows = 8, h = 512 / rows;
      for (let r = 0; r < rows; r++) {
        let x = -rand() * 200;
        while (x < 512) {
          const w = 180 + rand() * 160;
          ctx.fillStyle = shade(style.base, Math.round((rand() - 0.5) * 36));
          ctx.fillRect(x, r * h, w, h);
          ctx.strokeStyle = 'rgba(0,0,0,0.08)';
          for (let g = 0; g < 5; g++) {
            ctx.beginPath();
            const gy = r * h + 6 + rand() * (h - 12);
            ctx.moveTo(x, gy);
            ctx.bezierCurveTo(x + w / 3, gy + 4, x + 2 * w / 3, gy - 4, x + w, gy);
            ctx.stroke();
          }
          ctx.fillStyle = 'rgba(0,0,0,0.35)';
          ctx.fillRect(x, r * h, 2, h);
          x += w;
        }
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fillRect(0, r * h, 512, 2);
      }
    } else {
      const n = 4, s = 512 / n;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        ctx.fillStyle = shade(style.base, Math.round((rand() - 0.5) * 16));
        ctx.fillRect(i * s, j * s, s, s);
        ctx.strokeStyle = 'rgba(0,0,0,0.07)';
        for (let v = 0; v < 4; v++) {
          ctx.beginPath();
          ctx.moveTo(i * s + rand() * s, j * s);
          ctx.quadraticCurveTo(i * s + rand() * s, j * s + s / 2, i * s + rand() * s, j * s + s);
          ctx.stroke();
        }
      }
      ctx.strokeStyle = 'rgba(0,0,0,0.25)';
      ctx.lineWidth = 3;
      for (let k = 0; k <= n; k++) {
        ctx.beginPath(); ctx.moveTo(k * s, 0); ctx.lineTo(k * s, 512); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, k * s); ctx.lineTo(512, k * s); ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 3);
    if ('colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  };

  /** Applies a floor texture to an entity once its mesh exists. */
  MR.applyFloor = function (floorEl, styleKey) {
    const apply = function () {
      const mesh = floorEl.getObject3D('mesh');
      if (!mesh) return;
      if (mesh.material.map) mesh.material.map.dispose();
      mesh.material.map = MR.makeFloorTexture(styleKey);
      mesh.material.color.set('#ffffff');
      mesh.material.needsUpdate = true;
    };
    // Wait until A-Frame has finished creating the entity's own material, then add the texture.
    if (floorEl.hasLoaded) apply();
    else floorEl.addEventListener('loaded', function () { setTimeout(apply, 0); }, { once: true });
  };
})(window.MR);
