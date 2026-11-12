import { Facets } from '../components/Motion';
import type { ToyPage } from '../site';

export function Toy({ toy }: { toy: ToyPage }) {
  return (
    <main className="wrap page">
      <div className="toy-hero">
        <div>
          <p className="label kicker">{`Toys / ${toy.sub}`}</p>
          <h1>{toy.name}</h1>
        </div>
        <div>
          <p className="intro">{toy.intro}</p>
          <div className="actions">
            <a className="button" href={toy.play}>
              {`Open ${toy.name}`}
            </a>
            {toy.source && (
              <a className="label" href={toy.source}>
                source on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
      <Facets style={{ marginBottom: -1 }} />
      <div className="screen">
        <img
          src={toy.poster}
          alt={`${toy.name}, one of its looks`}
          width={1280}
          height={800}
          loading="lazy"
        />
      </div>
      <div className="two">
        {toy.columns.map((c, i) => (
          <div key={c.title}>
            <h2 className="small">{c.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: c.html }} />
            {toy.note && i === toy.columns.length - 1 && (
              <p>
                <a href={`/notes/${toy.note.slug}/`}>{`Notes on ${toy.name}`}</a>
              </p>
            )}
          </div>
        ))}
      </div>
      {toy.galleries.map((g) => (
        <section key={g.title}>
          <h2 className="small gallery-title">{g.title}</h2>
          <div className="looks">
            {g.pictures.map((p) => (
              <figure key={p.src}>
                <img src={p.src} alt="" loading="lazy" />
                <figcaption>{p.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
