/* =========================================================
   Builds the 6 m x 6 m room: floor, walls, skirting, windows,
   door and ceiling. Used by the VR designer and (as a small
   "dollhouse" version) by the AR viewer.
   ========================================================= */
window.MR = window.MR || {};

(function (MR) {
  const H = 3;                 // wall height
  const S = MR.ROOM_HALF || 3; // half the room size

  function box(parent, pos, size, colour, extra) {
    const el = document.createElement('a-entity');
    el.setAttribute('geometry', { primitive: 'box', width: size[0], height: size[1], depth: size[2] });
    el.setAttribute('material', Object.assign({ color: colour, roughness: 0.9, metalness: 0 }, extra || {}));
    el.setAttribute('position', pos.join(' '));
    parent.appendChild(el);
    return el;
  }

  function windowOn(parent, pos, rotY, glassList) {
    const w = document.createElement('a-entity');
    w.setAttribute('position', pos.join(' '));
    w.setAttribute('rotation', '0 ' + rotY + ' 0');
    const glass = document.createElement('a-entity');
    glass.setAttribute('geometry', { primitive: 'plane', width: 1.4, height: 1.2 });
    glass.setAttribute('material', { color: '#a8d4f5', emissive: '#a8d4f5', emissiveIntensity: 0.9, roughness: 0.2 });
    glass.setAttribute('position', '0 0 0.005');
    glass.classList.add('window-glass');
    w.appendChild(glass);
    glassList.push(glass);
    const frame = '#f7f7f5';
    box(w, [0, 0.62, 0.03], [1.5, 0.06, 0.06], frame);
    box(w, [0, -0.62, 0.04], [1.6, 0.08, 0.12], frame);
    box(w, [0.72, 0, 0.03], [0.06, 1.3, 0.06], frame);
    box(w, [-0.72, 0, 0.03], [0.06, 1.3, 0.06], frame);
    box(w, [0, 0, 0.03], [0.04, 1.2, 0.04], frame);
    box(w, [0, 0.1, 0.03], [1.4, 0.04, 0.04], frame);
    parent.appendChild(w);
  }

  /**
   * options.walls: 'all' (VR) or 'back' (AR dollhouse: north + west only)
   * options.ceiling: true/false
   * Returns { floor, walls, glass }
   */
  MR.buildRoom = function (parent, design, options) {
    options = options || {};
    const result = { floor: null, walls: [], glass: [] };
    const wallColour = design.wall || '#efe9df';

    // Floor (a thin box so it also looks solid from the side in AR)
    const floor = box(parent, [0, -0.025, 0], [S * 2, 0.05, S * 2], '#ffffff', { roughness: 0.7 });
    floor.setAttribute('shadow', 'receive: true; cast: false');
    floor.classList.add('floor');
    MR.applyFloor(floor, design.floor || 'oak');
    result.floor = floor;

    const allWalls = options.walls !== 'back';
    const t = 0.1;
    const specs = [
      { name: 'north', pos: [0, H / 2, -S - t / 2], size: [S * 2 + 2 * t, H, t], show: true },
      { name: 'west',  pos: [-S - t / 2, H / 2, 0], size: [t, H, S * 2], show: true },
      { name: 'south', pos: [0, H / 2, S + t / 2],  size: [S * 2 + 2 * t, H, t], show: allWalls },
      { name: 'east',  pos: [S + t / 2, H / 2, 0],  size: [t, H, S * 2], show: allWalls }
    ];
    specs.forEach(function (w) {
      if (!w.show) return;
      const el = box(parent, w.pos, w.size, wallColour);
      el.classList.add('wall');
      el.setAttribute('shadow', 'receive: true; cast: false');
      result.walls.push(el);
    });

    // White skirting boards
    const sk = '#f4f4f2';
    box(parent, [0, 0.05, -S + 0.01], [S * 2, 0.1, 0.02], sk);
    box(parent, [-S + 0.01, 0.05, 0], [0.02, 0.1, S * 2], sk);
    if (allWalls) {
      box(parent, [0, 0.05, S - 0.01], [S * 2, 0.1, 0.02], sk);
      box(parent, [S - 0.01, 0.05, 0], [0.02, 0.1, S * 2], sk);
    }

    // Windows (north wall, right of the TV; west wall, behind the armchair)
    windowOn(parent, [1.8, 1.6, -S + 0.001], 0, result.glass);
    windowOn(parent, [-S + 0.001, 1.6, -0.2], 90, result.glass);

    // Door on the south wall
    if (allWalls) {
      const door = document.createElement('a-entity');
      door.setAttribute('position', '1.9 1.05 ' + (S - 0.012));
      door.setAttribute('rotation', '0 180 0');
      box(door, [0, 0, 0], [0.95, 2.1, 0.03], '#7a5233', { roughness: 0.6 });
      box(door, [0.36, -0.05, 0.03], [0.04, 0.04, 0.06], '#d4af37', { metalness: 0.8, roughness: 0.3 });
      parent.appendChild(door);
    }

    // Ceiling with a round light fitting
    if (options.ceiling) {
      const ceil = box(parent, [0, H + 0.025, 0], [S * 2, 0.05, S * 2], '#fafafa');
      ceil.setAttribute('shadow', 'receive: false; cast: false');
      const fitting = document.createElement('a-entity');
      fitting.setAttribute('geometry', { primitive: 'cylinder', radius: 0.3, height: 0.05, segmentsRadial: 32 });
      fitting.setAttribute('material', { color: '#fff8e8', emissive: '#fff8e8', emissiveIntensity: 1 });
      fitting.setAttribute('position', '0 ' + (H - 0.025) + ' 0');
      fitting.classList.add('ceiling-fitting');
      parent.appendChild(fitting);
      result.fitting = fitting;
    }
    return result;
  };

  MR.setWallColour = function (walls, colour) {
    walls.forEach(function (w) { w.setAttribute('material', 'color', colour); });
  };
})(window.MR);
