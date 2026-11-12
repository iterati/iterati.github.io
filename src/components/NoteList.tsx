import type { NoteSummary } from '../site';

export function NoteList({ notes }: { notes: NoteSummary[] }) {
  return (
    <ul className="notes">
      {notes.map((n) => (
        <li key={n.slug}>
          <span className="label">{n.month}</span>
          <div>
            <a href={`/notes/${n.slug}/`}>{n.title}</a>
            {n.blurb && <p>{n.blurb}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
