// The page's moving parts: the mirror ball, the facet strips and the toy previews.
// Each draws or plays only after React wakes it in the browser; the prerendered page is their still.
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ball, ballStillAt, paintFacets } from '../disco/ball';
import { canvasLoop, isStill, onScreen, watchLight, type Draw } from '../disco/motion';

export function MirrorBall() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    return cv ? canvasLoop(cv, ball(cv), ballStillAt) : undefined;
  }, []);
  return <canvas ref={ref} aria-hidden="true" />;
}

const tiles = Array.from({ length: 48 }, (_, i) => <i key={i} />);

export function Facets({ style }: { style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paint = () => paintFacets(el);
    paint();
    return watchLight(paint);
  }, []);
  return (
    <div className="facets" ref={ref} style={style} aria-hidden="true">
      {tiles}
    </div>
  );
}

/** A recorded loop, played slow while on screen; held on its poster when still. */
export function Loop({ src, poster, rate }: { src: string; poster: string; rate: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || isStill()) return;
    v.muted = true;
    v.defaultPlaybackRate = v.playbackRate = rate;
    return onScreen(v, (on) => (on ? v.play().catch(() => {}) : v.pause()));
  }, [rate]);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}

/** Stills crossfading slowly while on screen. */
export function Fade({ pictures, every }: { pictures: string[]; every: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || isStill()) return;
    let timer = 0;
    const stop = onScreen(el, (on) => {
      clearInterval(timer);
      if (on) timer = window.setInterval(() => setK((n) => (n + 1) % pictures.length), every);
    });
    return () => {
      stop();
      clearInterval(timer);
    };
  }, [pictures.length, every]);
  return (
    <div className="shot light fade" ref={ref}>
      {pictures.map((src, i) => (
        <img key={src} src={src} alt="" loading="lazy" className={i === k ? 'on' : undefined} />
      ))}
    </div>
  );
}

export function CanvasLoop({ draw }: { draw: () => Draw }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    return cv ? canvasLoop(cv, draw()) : undefined;
  }, [draw]);
  return <canvas ref={ref} aria-hidden="true" />;
}
