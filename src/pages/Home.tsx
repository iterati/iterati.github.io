import { MirrorBall } from '../components/Motion';
import { NoteList } from '../components/NoteList';
import { ToyCard } from '../components/ToyCard';
import type { NoteSummary } from '../site';
import { hello, toys } from '../words';

// The first toy is the big card beside two rows of two; an odd one left over at the end goes wide.
const size = (i: number) =>
  i === 0 ? 'big' : i === toys.length - 1 && toys.length % 2 === 0 ? 'wide' : undefined;

export function Home({ notes, toyPages }: { notes: NoteSummary[]; toyPages: string[] }) {
  return (
    <>
      <section className="hero">
        <MirrorBall />
        <div className="wrap">
          <h1 className="hello own">{hello.line}</h1>
          <p className="day">{hello.day}</p>
        </div>
      </section>
      <section className="block" id="toys">
        <div className="wrap">
          <div className="head">
            <h2>Toys</h2>
            <span className="label">things I&apos;ve made, and some I&apos;m making</span>
          </div>
          <div className="toys">
            {toys.map((t, i) => (
              <ToyCard
                key={t.key}
                toy={t.key}
                name={t.name}
                what={t.what}
                status={t.status}
                live={t.live}
                size={size(i)}
                href={toyPages.includes(t.key) ? `/toys/${t.key}/` : t.href}
              />
            ))}
          </div>
        </div>
      </section>
      {notes.length > 0 && (
        <section className="block">
          <div className="wrap">
            <div className="head">
              <h2>Notes</h2>
              <a className="label" href="/notes/">
                all notes
              </a>
            </div>
            <NoteList notes={notes.slice(0, 3)} />
          </div>
        </section>
      )}
    </>
  );
}
