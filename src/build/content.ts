// Reads content/: notes/<date>-<slug>.md (front matter: title, date, toy, blurb; pictures in
// notes/img/) and toys/<toy>.md (front matter: name, sub, intro, play, source, poster).
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Note, ToyPage } from '../site';
import { frontMatter, pictures, renderMarkdown, sections } from './markdown';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const noteFile = /^(\d{4})-(\d{2})-(\d{2})-([a-z0-9-]+)\.md$/;

function markdownFiles(dir: string): string[] {
  return existsSync(dir)
    ? readdirSync(dir)
        .filter((f) => f.endsWith('.md'))
        .sort()
    : [];
}

/** The notes, newest first. */
export function readNotes(contentDir: string): Note[] {
  const dir = join(contentDir, 'notes');
  const notes: { date: string; note: Note }[] = [];
  for (const file of markdownFiles(dir)) {
    const m = noteFile.exec(file);
    if (!m) continue;
    const { data, body } = frontMatter(readFileSync(join(dir, file), 'utf8'));
    const date = data.date || `${m[1]}-${m[2]}-${m[3]}`;
    const [year, month] = date.split('-').map(Number);
    const words = body.split(/\s+/).filter(Boolean).length;
    notes.push({
      date,
      note: {
        slug: m[4],
        title: data.title || m[4],
        month: `${months[month - 1].slice(0, 3)} ${year}`,
        monthLong: `${months[month - 1]} ${year}`,
        blurb: data.blurb || '',
        toy: data.toy || undefined,
        minutes: Math.max(1, Math.ceil(words / 200)),
        html: renderMarkdown(body, '/notes/'),
      },
    });
  }
  return notes.sort((a, b) => b.date.localeCompare(a.date)).map((n) => n.note);
}

export function readToys(contentDir: string): ToyPage[] {
  const dir = join(contentDir, 'toys');
  return markdownFiles(dir).map((file) => {
    const { data, body } = frontMatter(readFileSync(join(dir, file), 'utf8'));
    const key = file.slice(0, -3);
    const toy: ToyPage = {
      key,
      name: data.name || key,
      sub: data.sub || '',
      intro: data.intro || '',
      play: data.play || `/${key}/`,
      source: data.source || undefined,
      poster: data.poster || '',
      columns: [],
      galleries: [],
    };
    for (const s of sections(body)) {
      const pics = pictures(s.md, '/toys/');
      if (pics) toy.galleries.push({ title: s.title, pictures: pics });
      else toy.columns.push({ title: s.title, html: renderMarkdown(s.md, '/toys/') });
    }
    return toy;
  });
}
