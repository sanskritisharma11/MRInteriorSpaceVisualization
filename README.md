# Mixed Reality Room Designer

Design a room in **Virtual Reality**, then view it in the real world with **Augmented Reality**, all in the web browser on a laptop. Nothing needs to be installed.

*Project for the subject Augmented, Virtual and Mixed Reality.*

---

## What it does

| Mode | What you can do |
|---|---|
| 🥽 **VR Designer** (`vr.html`) | Walk around a 3D 6 m × 6 m room. Add 11 kinds of furniture, drag them across the floor, rotate, recolour, duplicate and delete them. Change the wall colour and floor material (oak, walnut, marble, slate) and switch between **day and night** lighting (at night the floor lamps light the room). Save a screenshot. Works with mouse and keyboard, and can enter immersive VR on a WebXR headset. |
| 📷 **AR Viewer** (`ar.html`) | Turns on the laptop **webcam** and tracks a printed **Hiro marker**. The room you designed appears on top of the marker as a 3D "dollhouse" model that you can rotate, resize and view with or without walls. |
| 🔁 **Mixed Reality link** | The design is saved automatically in the browser, so the same room moves between the virtual world (VR) and the real world (AR). |

## How to run

### Option A: open it directly (simplest)
1. Download or clone this repository.
2. Open **`index.html`** in **Google Chrome** or **Microsoft Edge**.
3. Click **Enter VR Designer** to design your room.
4. Click **View in AR**, allow camera access, and hold the marker (`marker.html`, printed or shown on a phone) in front of the webcam.

### Option B: GitHub Pages (share a link)
1. In the repository, open **Settings → Pages**.
2. Under *Branch*, choose `main` and `/ (root)`, then click **Save**.
3. After about a minute the site is live at `https://<your-username>.github.io/<repository-name>/`, and anyone can open it, including on a phone.

## Controls (VR Designer)

| Action | Control |
|---|---|
| Walk | `W` `A` `S` `D` or arrow keys |
| Look around | Drag on empty space with the mouse |
| Select furniture | Click it |
| Move furniture | Drag it across the floor |
| Rotate selected item | `Q` / `E`, mouse wheel, or the Rotate buttons |
| Delete selected item | `Delete` key or the Delete button |
| Day / night | `N` key or the Night mode button |
| Deselect | `Esc` |
| Immersive VR (headset) | The goggles button at the bottom right |

## Technology

| Technology | Purpose |
|---|---|
| **A-Frame 1.6** (WebXR, built on three.js) | 3D scene, camera, lighting, shadows, VR mode |
| **AR.js 3.4** (ARToolKit) | Webcam marker tracking for AR |
| **HTML / CSS / JavaScript** | Interface and all project logic |
| **localStorage** | Saves the design and shares it between VR and AR |
| **Canvas 2D** | Generates the wood and tile floor textures in code |

The libraries are included in the `lib/` folder, so the project also works offline.

## Project structure

```
index.html        Home page (choose VR or AR)
vr.html           VR Designer
ar.html           AR Viewer (webcam + marker)
marker.html       Printable Hiro marker
css/style.css     All styles
js/furniture.js   Furniture catalogue, 3D builders, floor textures
js/room.js        Builds the room: floor, walls, windows, door, ceiling
js/storage.js     Saves and loads the design, sample room
js/vr.js          VR Designer interaction: select, drag, rotate, colours, lighting
js/ar.js          AR Viewer: marker tracking, dollhouse model, controls
js/ar-data.js     Marker pattern and camera calibration, embedded
lib/              A-Frame and AR.js libraries
assets/hiro.png   The Hiro marker image
data/             Original AR.js marker files (camera_para.dat, patt.hiro)
```

## Concepts demonstrated

- **Virtual Reality:** a fully computer-generated environment, first-person navigation, 6-DoF camera, real-time lighting and shadows, WebXR immersive mode
- **Augmented Reality:** marker-based tracking, camera calibration, pose estimation (placing 3D content using the marker's position and rotation), overlaying virtual objects on live video
- **Mixed Reality:** one shared digital model that moves between the virtual and real environments
- **3D interaction:** ray casting from the mouse to pick and drag objects, plane intersection, bounding boxes for selection

## Troubleshooting

- **Camera doesn't start:** allow camera access when the browser asks (click the camera icon in the address bar), and close other apps that are using the webcam.
- **Marker not detected:** keep the whole black border visible, use good lighting, avoid glare, and hold the marker about 20–50 cm from the webcam.
- **Design not showing in AR:** open VR and AR in the same browser (designs are saved per browser).

## Credits

- [A-Frame](https://aframe.io) (MIT licence)
- [AR.js](https://github.com/AR-js-org/AR.js) (MIT licence), including the Hiro marker
