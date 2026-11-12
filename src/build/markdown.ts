// Markdown to HTML, at build time. A picture alone in its paragraph becomes a figure, its title
// the caption; a picture's `img/...` address is made the page folder's (`/notes/img/...`).
import { Marked, type Tokens } from 'marked';

export interface FrontMatter {
  [key: string]: string;
}

/** Splits `---` front matter of flat `key: value` lines from the Markdown under it. */
export function frontMatter(text: string): { data: FrontMatter; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return { data: {}, body: text };
  const data: FrontMatter = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([\w-]+):\s*(.*)$/.exec(line);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  return { data, body: text.slice(m[0].length) };
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** `img/a.webp` under `/notes/` is `/notes/img/a.webp`; any other address is left as it is. */
export function pictureAddress(href: string, base: string): string {
  return href.startsWith('img/') ? base + href : href;
}

export function renderMarkdown(md: string, base: string): string {
  const marked = new Marked({
    walkTokens(token) {
      if (token.type === 'image') token.href = pictureAddress(token.href, base);
    },
    renderer: {
      paragraph(token: Tokens.Paragraph) {
        const only = token.tokens.filter((t) => !(t.type === 'text' && !t.raw.trim()));
        if (only.length === 1 && only[0].type === 'image') {
          const img = only[0] as Tokens.Image;
          const caption = img.title ? `<figcaption>${esc(img.title)}</figcaption>` : '';
          return `<figure><img src="${esc(img.href)}" alt="${esc(img.text)}" loading="lazy">${caption}</figure>\n`;
        }
        return false;
      },
    },
  });
  return marked.parse(md, { async: false });
}

/** Splits Markdown at its `## ` headings, each section its title and the Markdown under it. */
export function sections(md: string): { title: string; md: string }[] {
  const out: { title: string; md: string }[] = [];
  for (const line of md.split(/\r?\n/)) {
    const h = /^##\s+(.*)$/.exec(line);
    if (h) out.push({ title: h[1].trim(), md: '' });
    else if (out.length) out[out.length - 1].md += line + '\n';
  }
  return out;
}

const pictureLine = /^!\[([^\]]*)\]\((\S+?)(?:\s+"[^"]*")?\)$/;

/** A section of nothing but pictures, one a line, as their addresses and alt texts; else undefined. */
export function pictures(md: string, base: string): { src: string; alt: string }[] | undefined {
  const lines = md.split(/\r?\n/).filter((l) => l.trim());
  const found = lines.map((l) => pictureLine.exec(l.trim()));
  if (!lines.length || found.some((m) => !m)) return undefined;
  return found.map((m) => ({ src: pictureAddress(m![2], base), alt: m![1] }));
}
