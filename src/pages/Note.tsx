import type { Note as NoteData, NoteSummary } from '../site';
import { toys } from '../words';

export function Note({
  note,
  older,
  toyPage,
}: {
  note: NoteData;
  older?: NoteSummary;
  toyPage?: boolean;
}) {
  const toy = toys.find((t) => t.key === note.toy);
  return (
    <main className="wrap page">
      <article className="post">
        <p className="label">{`Notes / ${note.monthLong}`}</p>
        <h1>{note.title}</h1>
        <p className="label meta">{`${note.minutes} minute read${toy ? ` - ${toy.name}` : ''}`}</p>
        <div className="prose" dangerouslySetInnerHTML={{ __html: note.html }} />
        <div className="end label">
          {older ? <a href={`/notes/${older.slug}/`}>{`older: ${older.title}`}</a> : <span />}
          {toy && <a href={toyPage ? `/toys/${toy.key}/` : '/#toys'}>{toy.name}</a>}
        </div>
      </article>
    </main>
  );
}
