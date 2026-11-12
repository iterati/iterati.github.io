import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { routes, writeSite } from '../src/build/prerender';

const fixture = join(import.meta.dirname, 'fixtures', 'content');
const template = `<!doctype html><html><head><!--app-head--></head><body><div id="root"><!--app-html--></div><!--app-data--></body></html>`;

function built(contentDir: string) {
  const out = mkdtempSync(join(tmpdir(), 'site-'));
  writeFileSync(join(out, 'index.html'), template);
  writeSite(contentDir, out);
  return { out, read: (file: string) => readFileSync(join(out, file), 'utf8') };
}

describe('prerender', () => {
  it('emits every route', () => {
    const { out } = built(fixture);
    const files = [
      'index.html',
      'about/index.html',
      'notes/index.html',
      'notes/a-fixture-note/index.html',
      'notes/an-older-note/index.html',
      'toys/bermuda/index.html',
      '404.html',
    ];
    expect(routes(fixture).map((r) => r.file)).toEqual(files);
    for (const f of files) expect(existsSync(join(out, f)), f).toBe(true);
  });

  it("renders a note's Markdown", () => {
    const { out, read } = built(fixture);
    const html = read('notes/a-fixture-note/index.html');
    expect(html).toContain('<title>A fixture note - iterati</title>');
    expect(html).toContain('<h1>A fixture note</h1>');
    expect(html).toContain('<em>emphasis</em>');
    expect(html).toContain(
      '<figure><img src="/notes/img/dot.svg" alt="A dot" loading="lazy"><figcaption>One dot, captioned.</figcaption></figure>',
    );
    expect(html).toContain('older: An older note');
    expect(html).toContain('href="/toys/bermuda/"');
    expect(html).toContain('<script id="page-data" type="application/json">');
    expect(existsSync(join(out, 'notes/img/dot.svg'))).toBe(true);
  });

  it('writes the 404', () => {
    const { read } = built(fixture);
    expect(read('404.html')).toContain('<h1>Not found</h1>');
  });

  it('refuses a template already prerendered', () => {
    const { out } = built(fixture);
    expect(() => writeSite(fixture, out)).toThrow('has no <!--app-head-->');
  });

  it('writes .nojekyll', () => {
    const { out } = built(fixture);
    expect(existsSync(join(out, '.nojekyll'))).toBe(true);
  });

  it('ships no note, and says nothing is written yet', () => {
    const content = 'content';
    expect(routes(content).filter((r) => r.page.kind === 'note')).toEqual([]);
    expect(built(content).read('notes/index.html')).toContain('Nothing written yet.');
  });
});
