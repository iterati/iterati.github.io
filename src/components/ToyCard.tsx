import { hypercube, twinky } from '../disco/previews';
import type { ToyKey } from '../words';
import { CanvasLoop, Facets, Fade } from './Motion';

const elements = ['rhodec', 's2-1', 's2-2', 's2-3'].map((n) => `/media/elements-${n}.webp`);
const twinkyDark = () => twinky(true);
const hypercubeGrey = () => hypercube('#8a8fa3');

function Preview({ toy }: { toy: ToyKey }) {
  switch (toy) {
    case 'bermuda':
      return (
        <div className="shot">
          <img
            src="/media/bermuda-look3.jpg"
            alt="Bermuda's Tapestry 3 look"
            width={1280}
            height={800}
            loading="lazy"
          />
        </div>
      );
    case 'elements':
      return <Fade pictures={elements} every={3600} />;
    case 'twinky':
      return (
        <div className="shot">
          <CanvasLoop draw={twinkyDark} />
        </div>
      );
    case 'hypercube':
      return (
        <div className="shot">
          <CanvasLoop draw={hypercubeGrey} />
        </div>
      );
  }
}

export function ToyCard(props: {
  toy: ToyKey;
  name: string;
  what: string;
  status: string;
  live?: boolean;
  size: 'big' | 'wide' | undefined;
  href?: string;
}) {
  const body = (
    <>
      <Facets />
      <Preview toy={props.toy} />
      <div className="txt">
        <h3>{props.name}</h3>
        <p>{props.what}</p>
        <span className={props.live ? 'status live' : 'status'}>{props.status}</span>
      </div>
    </>
  );
  const className = props.size ? `toy ${props.size}` : 'toy';
  return props.href ? (
    <a className={className} href={props.href}>
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}
