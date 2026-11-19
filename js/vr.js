/* =========================================================
   VR Room Designer – interaction logic (vr.html)
   ========================================================= */
(function () {
  const MR = window.MR;
  const THREE = window.THREE;
  const HALF = MR.ROOM_HALF;

  /* Keep the player inside the room */
  AFRAME.registerComponent('stay-in-room', {
    schema: { margin: { default: 0.35 } },
    tick: function () {
      const p = this.el.object3D.position;
      const lim = HALF - this.data.margin;
      p.x = Math.max(-lim, Math.min(lim, p.x));
      p.z = Math.max(-lim, Math.min(lim, p.z));
    }
  });

  const scene = document.querySelector('a-scene');
  const ui = {};
  let design, room, selected = null, night = false;
  const items = [];          // furniture root entities
  let dragging = false, dragOffset = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hit = new THREE.Vector3();

  function $(id) { return document.getElementById(id); }

  /* ---------------- Start-up ---------------- */
  function init() {
    design = MR.loadDesign() || MR.sampleDesign();
    room = MR.buildRoom($('room'), design, { walls: 'all', ceiling: true });
    design.items.forEach(function (it) { addItem(it.type, it); });
    buildUI();
    select(null);
    save();
    setupMouse();
    setupKeys();
    $('loading').classList.add('hidden');
  }

  /* ---------------- Furniture ---------------- */
  function addItem(type, data) {
    const el = MR.buildFurniture(type, data && data.colour, { lights: true, shadows: true });
    if (!el) return null;
    $('furnitureRoot').appendChild(el);
    el.object3D.position.set(data.x || 0, 0, data.z || 0);
    el.object3D.rotation.y = THREE.MathUtils.degToRad(data.rot || 0);
    el.object3D.visible = true;
    el.setAttribute('visible', true);
    items.push(el);
    applyNight(el);
    return el;
  }

  function spawn(type) {
    const cam = scene.camera;
    const camPos = new THREE.Vector3();
    cam.getWorldPosition(camPos);
    const dir = new THREE.Vector3();
    cam.getWorldDirection(dir);
    dir.y = 0;
    if (dir.lengthSq() < 0.001) dir.set(0, 0, -1);
    dir.normalize();

    const lim = HALF - 0.5;
    const x = THREE.MathUtils.clamp(camPos.x + dir.x * 1.8, -lim, lim);
    const z = THREE.MathUtils.clamp(camPos.z + dir.z * 1.8, -lim, lim);
    const rot = THREE.MathUtils.radToDeg(Math.atan2(camPos.x - x, camPos.z - z)); // front faces the player

    const el = addItem(type, { x: x, z: z, rot: rot, colour: MR.CATALOG[type].main });
    popIn(el);
    select(el);
    save();
    toast(MR.CATALOG[type].name + ' added');
  }

  function popIn(el) {
    const start = performance.now();
    const step = function (now) {
      const t = Math.min(1, (now - start) / 300);
      const c1 = 1.70158, c3 = c1 + 1;
      const s = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      el.object3D.scale.setScalar(Math.max(0.01, s));
      if (t < 1) requestAnimationFrame(step); else el.object3D.scale.setScalar(1);
    };
    requestAnimationFrame(step);
  }

  function select(el) {
    selected = el;
    const ring = $('selRing');
    const panel = $('selectedPanel');
    if (!el) {
      ring.object3D.visible = false;
      $('selName').textContent = 'Nothing selected';
      $('selHint').textContent = 'Click a piece of furniture to select it.';
      panel.classList.add('disabled');
      $('itemSwatches').innerHTML = '';
      return;
    }
    const def = MR.CATALOG[el.dataset.type];
    $('selName').textContent = def.icon + '  ' + def.name;
    $('selHint').textContent = 'Drag to move · Q / E to rotate · Del to delete';
    panel.classList.remove('disabled');
    $('itemSwatches').innerHTML = '';
    def.palette.forEach(function (c) {
      const b = document.createElement('button');
      b.className = 'swatch' + (c.toLowerCase() === (el.dataset.colour || '').toLowerCase() ? ' active' : '');
      b.style.background = c;
      b.title = c;
      b.addEventListener('click', function () {
        MR.recolour(el, c);
        select(el);
        save();
      });
      $('itemSwatches').appendChild(b);
    });
    updateRing();
  }

  function updateRing() {
    const ring = $('selRing');
    if (!selected) { ring.object3D.visible = false; return; }
    const box = new THREE.Box3().setFromObject(selected.object3D);
    const size = new THREE.Vector3(), centre = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(centre);
    const d = Math.max(size.x, size.z) * 1.1 + 0.1;
    ring.object3D.position.set(centre.x, 0.02, centre.z);
    ring.object3D.scale.set(d, d, 1);
    ring.object3D.visible = true;
  }

  function rotateSelected(deg) {
    if (!selected) return;
    selected.object3D.rotation.y += THREE.MathUtils.degToRad(deg);
    updateRing();
    save();
  }

  function deleteSelected() {
    if (!selected) return;
    const name = MR.CATALOG[selected.dataset.type].name;
    items.splice(items.indexOf(selected), 1);
    selected.parentNode.removeChild(selected);
    select(null);
    save();
    toast(name + ' removed');
  }

  function duplicateSelected() {
    if (!selected) return;
    const p = selected.object3D.position;
    const lim = HALF - 0.4;
    const el = addItem(selected.dataset.type, {
      x: THREE.MathUtils.clamp(p.x + 0.6, -lim, lim),
      z: THREE.MathUtils.clamp(p.z + 0.6, -lim, lim),
      rot: THREE.MathUtils.radToDeg(selected.object3D.rotation.y),
      colour: selected.dataset.colour
    });
    popIn(el);
    select(el);
    save();
  }

  function clearRoom() {
    if (!confirm('Remove all furniture from the room?')) return;
    items.slice().forEach(function (el) { el.parentNode.removeChild(el); });
    items.length = 0;
    select(null);
    save();
  }

  function loadSample() {
    items.slice().forEach(function (el) { el.parentNode.removeChild(el); });
    items.length = 0;
    const s = MR.sampleDesign();
    design.wall = s.wall;
    design.floor = s.floor;
    MR.setWallColour(room.walls, s.wall);
    MR.applyFloor(room.floor, s.floor);
    s.items.forEach(function (it) { addItem(it.type, it); });
    select(null);
    refreshRoomSwatches();
    save();
    toast('Sample living room loaded');
  }

  /* ---------------- Saving ---------------- */
  function save() {
    design.items = items.map(function (el) {
      const p = el.object3D.position;
      return {
        type: el.dataset.type,
        x: +p.x.toFixed(3),
        z: +p.z.toFixed(3),
        rot: +THREE.MathUtils.radToDeg(el.object3D.rotation.y).toFixed(1),
        colour: el.dataset.colour
      };
    });
    MR.saveDesign(design);
    $('itemCount').textContent = items.length + (items.length === 1 ? ' item' : ' items');
  }

  /* ---------------- Day / night ---------------- */
  function applyNight(el) {
    el.querySelectorAll('.lamp-light').forEach(function (l) {
      l.setAttribute('light', 'intensity', night ? 2.2 : 0.6);
    });
  }

  function toggleNight() {
    night = !night;
    $('sun').setAttribute('light', 'intensity', night ? 0 : 0.9);
    $('ambient').setAttribute('light', { intensity: night ? 0.05 : 0.3, color: night ? '#8090c0' : '#ffffff' });
    $('hemi').setAttribute('light', 'intensity', night ? 0.04 : 0.3);
    $('ceilingLight').setAttribute('light', 'intensity', night ? 0 : 0.35);
    if (room.fitting) room.fitting.setAttribute('material', 'emissiveIntensity', night ? 0.05 : 1);
    room.glass.forEach(function (g) {
      g.setAttribute('material', { color: night ? '#1b2747' : '#a8d4f5', emissive: night ? '#1b2747' : '#a8d4f5', emissiveIntensity: night ? 0.6 : 0.9 });
    });
    items.forEach(applyNight);
    scene.setAttribute('background', 'color', night ? '#05070d' : '#1b2030');
    $('nightBtn').textContent = night ? '☀️  Day mode' : '🌙  Night mode';
  }

  /* ---------------- Mouse: select & drag furniture ---------------- */
  function setupMouse() {
    const canvas = scene.canvas;

    function pickFurniture(evt) {
      const rect = canvas.getBoundingClientRect();
      ndc.x = ((evt.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((evt.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, scene.camera);
      const hits = raycaster.intersectObjects(items.map(function (e) { return e.object3D; }), true);
      for (let i = 0; i < hits.length; i++) {
        let o = hits[i].object;
        while (o && !(o.el && o.el.classList && o.el.classList.contains('furniture'))) o = o.parent;
        if (o) return o.el;
      }
      return null;
    }

    function floorPoint() {
      return raycaster.ray.intersectPlane(floorPlane, hit) ? hit : null;
    }

    // Capture phase so we run before look-controls and can stop it from turning the camera.
    canvas.addEventListener('mousedown', function (evt) {
      if (evt.button !== 0) return;
      const el = pickFurniture(evt);
      if (!el) {
        // Empty space: let look-controls turn the camera. A click without dragging deselects.
        const sx = evt.clientX, sy = evt.clientY;
        window.addEventListener('mouseup', function up(e) {
          if (Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) < 5) select(null);
        }, { once: true });
        return;
      }
      evt.stopImmediatePropagation();
      evt.preventDefault();
      select(el);
      const p = floorPoint();
      dragOffset.set(0, 0, 0);
      if (p) dragOffset.copy(el.object3D.position).sub(p);
      dragging = true;
      canvas.style.cursor = 'grabbing';
    }, true);

    window.addEventListener('mousemove', function (evt) {
      if (!dragging) {
        canvas.style.cursor = pickFurniture(evt) ? 'grab' : 'default';
        return;
      }
      const rect = canvas.getBoundingClientRect();
      ndc.x = ((evt.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((evt.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, scene.camera);
      const p = floorPoint();
      if (!p || !selected) return;
      const lim = HALF - 0.15;
      selected.object3D.position.x = THREE.MathUtils.clamp(p.x + dragOffset.x, -lim, lim);
      selected.object3D.position.z = THREE.MathUtils.clamp(p.z + dragOffset.z, -lim, lim);
      updateRing();
    });

    window.addEventListener('mouseup', function () {
      if (!dragging) return;
      dragging = false;
      canvas.style.cursor = 'grab';
      save();
    });

    // Mouse wheel over a selected item rotates it
    canvas.addEventListener('wheel', function (evt) {
      if (!selected) return;
      evt.preventDefault();
      rotateSelected(evt.deltaY > 0 ? 15 : -15);
    }, { passive: false });
  }

  function setupKeys() {
    window.addEventListener('keydown', function (evt) {
      if (evt.target.tagName === 'INPUT') return;
      const k = evt.key.toLowerCase();
      if (k === 'q') rotateSelected(-15);
      else if (k === 'e') rotateSelected(15);
      else if (k === 'delete' || k === 'backspace') deleteSelected();
      else if (k === 'escape') select(null);
      else if (k === 'n') toggleNight();
    });
  }

  /* ---------------- Side panel ---------------- */
  function refreshRoomSwatches() {
    document.querySelectorAll('#wallSwatches .swatch').forEach(function (b) {
      b.classList.toggle('active', b.dataset.colour === design.wall);
    });
    document.querySelectorAll('#floorButtons button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.floor === design.floor);
    });
  }

  function buildUI() {
    const cat = $('catalogue');
    Object.keys(MR.CATALOG).forEach(function (type) {
      const def = MR.CATALOG[type];
      const b = document.createElement('button');
      b.className = 'cat-btn';
      b.innerHTML = '<span class="icon">' + def.icon + '</span><span>' + def.name + '</span>';
      b.addEventListener('click', function () { spawn(type); });
      cat.appendChild(b);
    });

    MR.WALL_COLOURS.forEach(function (c) {
      const b = document.createElement('button');
      b.className = 'swatch';
      b.style.background = c;
      b.dataset.colour = c;
      b.addEventListener('click', function () {
        design.wall = c;
        MR.setWallColour(room.walls, c);
        refreshRoomSwatches();
        save();
      });
      $('wallSwatches').appendChild(b);
    });

    Object.keys(MR.FLOORS).forEach(function (key) {
      const b = document.createElement('button');
      b.className = 'pill';
      b.textContent = MR.FLOORS[key].name;
      b.dataset.floor = key;
      b.addEventListener('click', function () {
        design.floor = key;
        MR.applyFloor(room.floor, key);
        refreshRoomSwatches();
        save();
      });
      $('floorButtons').appendChild(b);
    });
    refreshRoomSwatches();

    $('rotL').addEventListener('click', function () { rotateSelected(-45); });
    $('rotR').addEventListener('click', function () { rotateSelected(45); });
    $('dupBtn').addEventListener('click', duplicateSelected);
    $('delBtn').addEventListener('click', deleteSelected);
    $('nightBtn').addEventListener('click', toggleNight);
    $('sampleBtn').addEventListener('click', loadSample);
    $('clearBtn').addEventListener('click', clearRoom);
    $('shotBtn').addEventListener('click', function () {
      scene.components.screenshot.capture('perspective');
    });
    $('helpBtn').addEventListener('click', function () { $('help').classList.toggle('hidden'); });
    $('helpClose').addEventListener('click', function () { $('help').classList.add('hidden'); });
    $('panelToggle').addEventListener('click', function () { document.body.classList.toggle('panel-hidden'); });
  }

  let toastTimer;
  function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1600);
  }

  // Expose a few functions for testing / the browser console
  window.MRApp = {
    spawn: spawn, select: select, rotateSelected: rotateSelected, deleteSelected: deleteSelected,
    toggleNight: toggleNight, items: items, getDesign: function () { return design; }
  };

  if (scene.hasLoaded) init(); else scene.addEventListener('loaded', init);
})();
