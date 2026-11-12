// The canvas toy previews: twinky's cone of lights and the infinity hypercube.
// Both move slowly and steadily; brightness swells and settles, never switches.
import type { Draw } from './motion';

/** twinky: a cone of lights with slow colour waves rolling up it. */
export function twinky(dark: boolean): Draw {
  const N = 90;
  const pts: { h: number; a: number }[] = [];
  for (let i = 0; i < N; i++) pts.push({ h: i / N, a: i * 2.4 });
  return (g, W, H, t) => {
    g.clearRect(0, 0, W, H);
    const cx = W / 2;
    const top = H * 0.1;
    const base = H * 0.9;
    const R = Math.min(W * 0.36, H * 0.34);
    const L = pts
      .map((p) => {
        const r = R * p.h;
        const a = p.a + t * 0.25;
        return {
          x: cx + r * Math.sin(a),
          y: top + (base - top) * p.h - r * 0.18 * Math.cos(a),
          z: Math.cos(a),
          p,
        };
      })
      .sort((u, v) => u.z - v.z);
    for (const q of L) {
      const hue = (q.p.h * 300 - t * 22) % 360;
      const wave = 0.55 + 0.45 * Math.sin(q.p.h * 9 - t * 0.9);
      const s = (2.2 + 2.2 * (q.z + 1)) * (W / 300);
      const glow = g.createRadialGradient(q.x, q.y, 0, q.x, q.y, s * 3.2);
      glow.addColorStop(0, `hsla(${hue},95%,${dark ? 70 : 58}%,${0.85 * wave})`);
      glow.addColorStop(1, `hsla(${hue},95%,60%,0)`);
      g.fillStyle = glow;
      g.beginPath();
      g.arc(q.x, q.y, s * 3.2, 0, 7);
      g.fill();
      g.fillStyle = `hsla(${hue},100%,${dark ? 88 : 62}%,${0.6 + 0.4 * wave})`;
      g.beginPath();
      g.arc(q.x, q.y, s * 0.8, 0, 7);
      g.fill();
    }
  };
}

/** A tesseract turning slowly through the fourth dimension, its reflections stepping back as in a mirror box. */
export function hypercube(ink: string): Draw {
  const V: number[][] = [];
  for (let i = 0; i < 16; i++)
    V.push([i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1, i & 8 ? 1 : -1]);
  const E: [number, number, number][] = [];
  for (let i = 0; i < 16; i++)
    for (let b = 0; b < 4; b++) {
      const j = i ^ (1 << b);
      if (j > i) E.push([i, j, b]);
    }
  const cols = ['#e8579b', '#f2b84b', '#4fc7b8', '#7a6cf0'];
  return (g, W, H, t) => {
    g.clearRect(0, 0, W, H);
    const a = t * 0.18;
    const b = t * 0.11;
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    const cb = Math.cos(b);
    const sb = Math.sin(b);
    const P = V.map(([x, y, z, w]) => {
      [x, w] = [x * ca - w * sa, x * sa + w * ca];
      [y, z] = [y * cb - z * sb, y * sb + z * cb];
      const k = 1 / (2.6 - w);
      return [x * k, y * k, z * k];
    });
    const S = Math.min(W, H) * 0.62;
    const at = (u: number[], sc: number): [number, number] => [
      W / 2 + (u[0] * 0.9 + u[2] * 0.35) * sc,
      H / 2 + (u[1] * 0.9 - u[2] * 0.2) * sc,
    ];
    for (let depth = 3; depth >= 0; depth--) {
      const sc = S * Math.pow(0.72, depth);
      g.globalAlpha = depth ? 0.16 / depth : 1;
      g.lineWidth = Math.max(1, W / 260) * (depth ? 0.8 : 1.4);
      g.lineCap = 'round';
      for (const [i, j, axis] of E) {
        const [x1, y1] = at(P[i], sc);
        const [x2, y2] = at(P[j], sc);
        g.strokeStyle = depth ? ink : cols[axis];
        g.beginPath();
        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.stroke();
      }
    }
    g.globalAlpha = 1;
  };
}
