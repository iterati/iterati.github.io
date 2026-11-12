// The motion rules every moving part follows: gentle and steady, nothing blinks,
// paused off screen, and held still when the reader asks for reduced motion.
// `data-still="1"` on <html> holds it still too, for screenshots.

export const glints: [number, number, number][] = [
  [232, 87, 155],
  [242, 184, 75],
  [79, 199, 184],
  [122, 108, 240],
];

export function isStill(): boolean {
  return (
    matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.dataset.still === '1'
  );
}

// The light the ball and the facet strips answer to: where the pointer is, as a fraction of the viewport.
export const light = { x: 0.25, y: 0.2 };
const watchers = new Set<() => void>();
let bound = false;
let queued = false;

function kick() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    watchers.forEach((f) => f());
  });
}

/** Calls `f` on the next frame after the pointer moves or the page scrolls; returns the unwatch. */
export function watchLight(f: () => void): () => void {
  if (!bound) {
    bound = true;
    addEventListener(
      'pointermove',
      (e) => {
        light.x = e.clientX / innerWidth;
        light.y = e.clientY / innerHeight;
        kick();
      },
      { passive: true },
    );
    addEventListener('scroll', kick, { passive: true });
  }
  watchers.add(f);
  return () => void watchers.delete(f);
}

/** Calls `f` with whether `el` is on screen, each time that changes; returns the unobserve. */
export function onScreen(el: Element, f: (visible: boolean) => void): () => void {
  const io = new IntersectionObserver((es) => es.forEach((e) => f(e.isIntersecting)));
  io.observe(el);
  return () => io.disconnect();
}

export type Draw = (g: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

/**
 * Runs `draw` on `cv` each frame while it is on screen, with `t` in seconds;
 * when still, draws one frame at `stillAt` and stops. Returns the stop.
 */
export function canvasLoop(cv: HTMLCanvasElement, draw: Draw, stillAt = 4): () => void {
  const g = cv.getContext('2d');
  if (!g) return () => {};
  const still = isStill();
  const t0 = performance.now();
  let raf = 0;
  let visible = false;
  const size = () => {
    const r = cv.getBoundingClientRect();
    const d = Math.min(2, devicePixelRatio || 1);
    cv.width = r.width * d;
    cv.height = r.height * d;
  };
  const once = (now: number) => draw(g, cv.width, cv.height, still ? stillAt : (now - t0) / 1000);
  const frame = (now: number) => {
    once(now);
    raf = visible ? requestAnimationFrame(frame) : 0;
  };
  const resize = () => {
    size();
    once(performance.now());
  };
  size();
  once(performance.now());
  addEventListener('resize', resize);
  const unobserve = still
    ? () => {}
    : onScreen(cv, (v) => {
        visible = v;
        if (v && !raf) raf = requestAnimationFrame(frame);
      });
  return () => {
    unobserve();
    cancelAnimationFrame(raf);
    removeEventListener('resize', resize);
  };
}
