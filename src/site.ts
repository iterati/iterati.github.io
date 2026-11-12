// What the build hands each page: the prerender renders it to HTML, and the page carries it
// as JSON so React can wake the same tree in the browser.

export interface NoteSummary {
  slug: string;
  title: string;
  /** "Nov 2026" */
  month: string;
  blurb: string;
  toy?: string;
}

export interface Note extends NoteSummary {
  /** "November 2026" */
  monthLong: string;
  minutes: number;
  html: string;
}

export interface Picture {
  src: string;
  alt: string;
}

export interface ToyPage {
  key: string;
  name: string;
  sub: string;
  intro: string;
  play: string;
  /** The toy's code, when it is public. */
  source?: string;
  poster: string;
  /** Text sections, side by side. */
  columns: { title: string; html: string }[];
  /** Picture sections, as galleries. */
  galleries: { title: string; pictures: Picture[] }[];
  /** The latest note about this toy. */
  note?: NoteSummary;
}

export type Page =
  | { kind: 'home'; notes: NoteSummary[]; toyPages: string[] }
  | { kind: 'about' }
  | { kind: 'notes'; notes: NoteSummary[] }
  | { kind: 'note'; note: Note; older?: NoteSummary; toyPage?: boolean }
  | { kind: 'toy'; toy: ToyPage }
  | { kind: 'missing' };
