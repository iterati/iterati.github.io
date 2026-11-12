// Renders every route to static HTML: the pages read without JavaScript, and each carries its
// data for React to wake the shimmer and the previews.
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { renderToString } from 'react-dom/server';
import { App } from '../App';
import type { NoteSummary, Page } from '../site';
import { hello } from '../words';
import { readNotes, readToys } from './content';

export interface Route {
  /** The address, `/notes/` */
  path: string;
  /** The file under the output folder, `notes/index.html` */
  file: string;
  title: string;
  description: string;
  page: Page;
}

const summary = ({ slug, title, month, blurb, toy }: NoteSummary): NoteSummary => ({
  slug,
  title,
  month,
  blurb,
  toy,
});

export function routes(contentDir: string): Route[] {
  const notes = readNotes(contentDir);
  const toys = readToys(contentDir);
  const list = notes.map(summary);
  const toyPages = toys.map((t) => t.key);
  const at = (path: string) => ({ path, file: path.slice(1) + 'index.html' });
  return [
    {
      ...at('/'),
      title: 'iterati',
      description: hello.line,
      page: { kind: 'home', notes: list, toyPages },
    },
    { ...at('/about/'), title: 'About - iterati', description: hello.day, page: { kind: 'about' } },
    {
      ...at('/notes/'),
      title: 'Notes - iterati',
      description: hello.line,
      page: { kind: 'notes', notes: list },
    },
    ...notes.map((note, i): Route => ({
      ...at(`/notes/${note.slug}/`),
      title: `${note.title} - iterati`,
      description: note.blurb || note.title,
      page: {
        kind: 'note',
        note,
        older: list[i + 1],
        toyPage: !!note.toy && toyPages.includes(note.toy),
      },
    })),
    ...toys.map((toy): Route => ({
      ...at(`/toys/${toy.key}/`),
      title: `${toy.name} - iterati`,
      description: toy.intro,
      page: { kind: 'toy', toy: { ...toy, note: list.find((n) => n.toy === toy.key) } },
    })),
    {
      path: '/404.html',
      file: '404.html',
      title: 'Not found - iterati',
      description: hello.line,
      page: { kind: 'missing' },
    },
  ];
}

const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const text = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
// JSON inside <script>: no `<` may close it early
const json = (v: unknown) => JSON.stringify(v).replace(/</g, '\\u003c');

/** `template` is the built index.html, with its <!--app-head-->, <!--app-html--> and <!--app-data--> marks. */
export function renderRoute(route: Route, template: string): string {
  const head = `<title>${text(route.title)}</title>\n    <meta name="description" content="${attr(route.description)}" />`;
  const data = `<script id="page-data" type="application/json">${json(route.page)}</script>`;
  return template
    .replace('<!--app-head-->', () => head)
    .replace('<!--app-html-->', () => renderToString(<App page={route.page} />))
    .replace('<!--app-data-->', () => data);
}

/** Writes every route into `outDir` over its built index.html, the notes' pictures and `.nojekyll`. */
export function writeSite(contentDir: string, outDir: string): Route[] {
  const template = readFileSync(join(outDir, 'index.html'), 'utf8');
  // a second run would find the home page there, not Vite's template
  for (const mark of ['<!--app-head-->', '<!--app-html-->', '<!--app-data-->'])
    if (!template.includes(mark))
      throw new Error(`${outDir}/index.html has no ${mark}: run vite build first`);
  const all = routes(contentDir);
  for (const r of all) {
    const file = join(outDir, r.file);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, renderRoute(r, template));
  }
  const img = join(contentDir, 'notes', 'img');
  if (existsSync(img)) cpSync(img, join(outDir, 'notes', 'img'), { recursive: true });
  // GitHub Pages serves docs/ as it is, without running Jekyll over it
  writeFileSync(join(outDir, '.nojekyll'), '');
  return all;
}
