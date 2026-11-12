// One mirror ball in the hello. It turns once a minute, and its glints and the coloured light
// it throws follow the pointer. Drawn on a canvas that reaches up behind the header.
import { glints, light, type Draw } from './motion';

const rad = Math.PI / 180;
const bands: { lat: number; n: number }[] = [];
for (let lat = -82.5; lat <= 82.5; lat += 7.5)
  bands.push({ lat, n: Math.max(6, Math.round(48 * Math.cos(lat * rad))) });

/** The canvas's top sits this far above its hero, behind the header. */
export const ballOverhang = 104;

/** One turn a minute; held still, the ball rests at this turn. */
export const ballTurn = (t: number) => (t / 60) * 2 * Math.PI;
export const ballStillAt = (0.6 * 60) / (2 * Math.PI);

/** Draws the ball onto `cv`, turned for `t` seconds. */
export function ball(cv: HTMLCanvasElement): Draw {
  return (g, W, H, t) => {
    g.clearRect(0, 0, W, H);
    const rect = cv.getBoundingClientRect();
    const d = W / rect.width || 1;
    const mobile = W / d < 700;
    const hero = (cv.parentElement?.getBoundingClientRect().height ?? 0) * d;
    const off = ballOverhang * d;
    const R = mobile ? W * 0.27 : Math.min(hero * 0.36, W * 0.17);
    const cx = mobile ? W * 0.72 : W * 0.75;
    const cy = mobile ? off + R * 1.05 : off + hero * 0.48;
    const spin = ballTurn(t) + scrollY * 0.0025;
    let Lx = (light.x * innerWidth - (rect.left + cx / d)) / (R / d);
    let Ly = (light.y * innerHeight - (rect.top + cy / d)) / (R / d);
    let Lz = 1.6;
    const ln = Math.hypot(Lx, Ly, Lz);
    Lx /= ln;
    Ly /= ln;
    Lz /= ln;
    const spots: { x: number; y: number; s: number; c: number[] }[] = [];
    bands.forEach((b, bi) => {
      const step = 360 / b.n;
      for (let k = 0; k < b.n; k++) {
        const lon = k * step * rad + spin;
        const la = b.lat * rad;
        const nx = Math.cos(la) * Math.sin(lon);
        const ny = -Math.sin(la);
        const nz = Math.cos(la) * Math.cos(lon);
        if (nz <= 0.02) continue;
        const dot = nx * Lx + ny * Ly + nz * Lz;
        const rz = 2 * dot * nz - Lz;
        const rx = 2 * dot * nx - Lx;
        const ry = 2 * dot * ny - Ly;
        const spec = Math.pow(Math.max(0, rz), 18);
        const diff = Math.max(0, dot);
        const c = (la1: number, lo1: number): [number, number] => [
          cx + R * Math.cos(la1) * Math.sin(lo1),
          cy - R * Math.sin(la1),
        ];
        const h1 = 3.4 * rad;
        const h2 = step * 0.44 * rad;
        const q = [
          c(la + h1, lon - h2),
          c(la + h1, lon + h2),
          c(la - h1, lon + h2),
          c(la - h1, lon - h2),
        ];
        const base = 150 + 70 * diff + 25 * nz;
        const gl = glints[(k + bi * 3) % 4];
        const m = Math.min(1, spec * 1.3);
        g.fillStyle = `rgb(${base * (1 - m) + (gl[0] * 0.5 + 127) * m},${base * (1 - m) + (gl[1] * 0.5 + 127) * m},${(base + 8) * (1 - m) + (gl[2] * 0.5 + 127) * m})`;
        g.beginPath();
        g.moveTo(...q[0]);
        q.slice(1).forEach((p) => g.lineTo(...p));
        g.closePath();
        g.fill();
        if (rz < -0.15 && dot > 0.05) {
          const tt = (nz + 1.4) / -rz;
          spots.push({ x: nx + rx * tt, y: ny + ry * tt, s: Math.min(1, dot * 2), c: gl });
        }
      }
    });
    // grout shading and rim, so it reads as a ball and not a disc
    const sh = g.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R * 1.02);
    sh.addColorStop(0, 'rgba(255,255,255,0.18)');
    sh.addColorStop(0.75, 'rgba(40,40,60,0)');
    sh.addColorStop(1, 'rgba(40,40,60,0.28)');
    g.fillStyle = sh;
    g.beginPath();
    g.arc(cx, cy, R, 0, 7);
    g.fill();
    // thrown light: facets near the rim send the light back onto the ground around the ball, as a real one does on a wall
    for (const s of spots.slice(0, 90)) {
      const x = cx + s.x * R;
      const y = cy + s.y * R;
      const r = (5 + 7 * s.s) * d * (mobile ? 0.7 : 1);
      if (Math.hypot(x - cx, y - cy) < R * 1.04 || (mobile && y > cy + R * 1.1)) continue;
      const sp = g.createRadialGradient(x, y, 0, x, y, r);
      sp.addColorStop(0, `rgba(${s.c},${0.55 * s.s})`);
      sp.addColorStop(0.5, `rgba(${s.c},${0.3 * s.s})`);
      sp.addColorStop(1, `rgba(${s.c},0)`);
      g.fillStyle = sp;
      g.beginPath();
      g.arc(x, y, r, 0, 7);
      g.fill();
    }
  };
}

/** The facet strip under `el`'s tiles: each tile catches the light by its distance from the pointer. */
export function paintFacets(el: HTMLElement): void {
  const r = el.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight) return;
  const kids = el.children as HTMLCollectionOf<HTMLElement>;
  const n = kids.length;
  const lx = light.x * innerWidth;
  const ly = light.y * innerHeight;
  for (let i = 0; i < n; i++) {
    const x = r.left + ((i + 0.5) * r.width) / n;
    const dist = Math.hypot(x - lx, (r.top - ly) * 0.6) / 140;
    const v = Math.exp(-dist * dist);
    const c = glints[(i * 7 + Math.round(r.top / 40)) % 4];
    kids[i].style.background =
      v > 0.08
        ? `rgb(${c.map((u) => Math.round(u * v + (205 + 30 * (i % 2)) * (1 - v))).join(',')})`
        : '';
  }
}
