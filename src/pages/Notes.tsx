import { NoteList } from '../components/NoteList';
import type { NoteSummary } from '../site';

export function Notes({ notes }: { notes: NoteSummary[] }) {
  return (
    <main className="wrap page">
      <h1 className="notes-title">Notes</h1>
      {notes.length ? <NoteList notes={notes} /> : <p className="none">Nothing written yet.</p>}
    </main>
  );
}
