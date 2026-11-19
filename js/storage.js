/* =========================================================
   Saves and loads the room design in the browser (localStorage),
   so a room designed in VR can be viewed in AR.
   ========================================================= */
window.MR = window.MR || {};

(function (MR) {
  const KEY = 'mrRoomDesigner.design.v1';

  MR.ROOM_HALF = 3; // the room is 6 m x 6 m, from -3 to +3 on X and Z

  MR.WALL_COLOURS = ['#efe9df', '#b9cfe0', '#c6d8bf', '#ecc9b8', '#d9cde6', '#5b6068'];

  MR.sampleDesign = function () {
    return {
      version: 1,
      wall: '#efe9df',
      floor: 'oak',
      items: [
        { type: 'rug',         x: 0,    z: 0.1,  rot: 0,   colour: '#8c3a3a' },
        { type: 'tvUnit',      x: 0,    z: -2.7, rot: 0,   colour: '#2b2b2e' },
        { type: 'sofa',        x: 0,    z: 1.25, rot: 180, colour: '#3d5a99' },
        { type: 'coffeeTable', x: 0,    z: 0,    rot: 0,   colour: '#8a5a35' },
        { type: 'armchair',    x: -1.9, z: -0.2, rot: 90,  colour: '#9c2f35' },
        { type: 'floorLamp',   x: -2.5, z: 1.4,  rot: 0,   colour: '#f5e6c8' },
        { type: 'bookshelf',   x: 2.8,  z: 0.4,  rot: -90, colour: '#8a5a35' },
        { type: 'plant',       x: 2.5,  z: -2.5, rot: 0,   colour: '#c0643a' },
        { type: 'plant',       x: -2.5, z: -2.5, rot: 0,   colour: '#f2f2ee' }
      ]
    };
  };

  MR.emptyDesign = function () {
    return { version: 1, wall: '#efe9df', floor: 'oak', items: [] };
  };

  MR.loadDesign = function () {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const d = JSON.parse(raw);
      if (!d || !Array.isArray(d.items)) return null;
      d.items = d.items.filter(function (i) { return MR.CATALOG && MR.CATALOG[i.type]; });
      return d;
    } catch (e) {
      return null;
    }
  };

  MR.saveDesign = function (design) {
    try {
      localStorage.setItem(KEY, JSON.stringify(design));
      return true;
    } catch (e) {
      return false;
    }
  };
})(window.MR);
