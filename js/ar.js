/* =========================================================
   AR Viewer – shows the room designed in VR as a small
   "dollhouse" on top of a printed Hiro marker, using the
   laptop webcam (AR.js marker tracking + A-Frame).
   ========================================================= */
(function () {
  const MR = window.MR;
  const design = MR.loadDesign() || MR.sampleDesign();

  // The marker data is embedded in js/ar-data.js and turned into blob: URLs, so the
  // AR page works even when opened straight from a folder (no web server needed).
  function blobUrl(dataUrl, type) {
    const bin = atob(dataUrl.split(',')[1]);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return URL.createObjectURL(new Blob([bytes], { type: type }));
  }
  const cameraUrl = blobUrl(MR.AR_CAMERA_PARAMS, 'application/octet-stream');
  const patternUrl = blobUrl(MR.AR_HIRO_PATTERN, 'text/plain');

  const sceneHTML =
    '<a-scene embedded vr-mode-ui="enabled: false" loading-screen="enabled: false"' +
    ' renderer="logarithmicDepthBuffer: true; antialias: true; colorManagement: true"' +
    ' arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono; trackingMethod: best;' +
    ' cameraParametersUrl: ' + cameraUrl + '">' +
    '  <a-entity light="type: ambient; intensity: 0.7"></a-entity>' +
    '  <a-entity light="type: directional; intensity: 0.9" position="-1 3 2"></a-entity>' +
    '  <a-marker id="marker" type="pattern" url="' + patternUrl + '" emitevents="true" smooth="true" smoothCount="6" smoothTolerance="0.01" smoothThreshold="3">' +
    '    <a-entity id="miniRoom" scale="0.16 0.16 0.16"></a-entity>' +
    '  </a-marker>' +
    '  <a-entity camera></a-entity>' +
    '</a-scene>';
  document.body.insertAdjacentHTML('afterbegin', sceneHTML);

  const scene = document.querySelector('a-scene');
  const marker = document.getElementById('marker');
  const mini = document.getElementById('miniRoom');
  const status = document.getElementById('arStatus');
  const statusText = document.getElementById('arStatusText');
  let scale = 0.16, wallsOn = true, room;

  function buildMiniRoom() {
    room = MR.buildRoom(mini, design, { walls: 'back', ceiling: false });
    design.items.forEach(function (it) {
      const el = MR.buildFurniture(it.type, it.colour, { lights: false, shadows: false });
      if (!el) return;
      mini.appendChild(el);
      el.setAttribute('position', it.x + ' 0 ' + it.z);
      el.setAttribute('rotation', '0 ' + (it.rot || 0) + ' 0');
    });
    // Tilt the dollhouse a little so the camera sees inside it
    mini.setAttribute('rotation', '0 0 0');
  }

  function setStatus(found) {
    status.classList.toggle('found', found);
    statusText.textContent = found ? 'Marker found – your room is on the marker' : 'Looking for the Hiro marker…';
    document.getElementById('arHelp').classList.toggle('hidden', found);
  }

  marker.addEventListener('markerFound', function () { setStatus(true); window.MR_AR_FOUND = true; });
  marker.addEventListener('markerLost', function () { setStatus(false); });

  scene.addEventListener('loaded', function () {
    buildMiniRoom();
    window.MR_AR_READY = true;
  });

  // The webcam starts after the browser asks for permission
  window.addEventListener('arjs-video-loaded', function () { setStatus(false); });
  window.addEventListener('camera-error', function () {
    statusText.textContent = 'Camera not available – allow camera access and reload';
  });

  document.getElementById('rotL').addEventListener('click', function () { mini.object3D.rotation.y += Math.PI / 4; });
  document.getElementById('rotR').addEventListener('click', function () { mini.object3D.rotation.y -= Math.PI / 4; });
  document.getElementById('smaller').addEventListener('click', function () {
    scale = Math.max(0.08, scale - 0.04);
    mini.object3D.scale.setScalar(scale);
  });
  document.getElementById('bigger').addEventListener('click', function () {
    scale = Math.min(0.6, scale + 0.04);
    mini.object3D.scale.setScalar(scale);
  });
  document.getElementById('wallsBtn').addEventListener('click', function () {
    wallsOn = !wallsOn;
    room.walls.forEach(function (w) { w.object3D.visible = wallsOn; });
    mini.querySelectorAll('.window-glass').forEach(function (g) { g.parentNode.object3D.visible = wallsOn; });
    this.textContent = 'Walls: ' + (wallsOn ? 'On' : 'Off');
  });
})();
