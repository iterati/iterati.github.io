import type { ReactNode } from 'react';
import { links } from '../words';

export type Section = 'toys' | 'notes' | 'about' | undefined;

const nav: [Section, string][] = [
  ['toys', '/#toys'],
  ['notes', '/notes/'],
  ['about', '/about/'],
];

export function Links() {
  return links.map((l) => (
    <a key={l.name} href={l.href}>
      {l.name}
    </a>
  ));
}

export function Layout({ current, children }: { current: Section; children: ReactNode }) {
  return (
    <>
      <header className="wrap top">
        <a className="logo" href="/">
          <img src="/logo.svg" alt="iterati" width="132" height="65" />
        </a>
        <nav>
          {nav.map(([name, href]) => (
            <a key={name} href={href} aria-current={current === name ? 'page' : undefined}>
              {name}
            </a>
          ))}
        </nav>
      </header>
      {children}
      <footer>
        <div className="wrap">
          <span className="label">iterati - made by hand, no tracking</span>
          <span>
            <Links />
          </span>
        </div>
      </footer>
    </>
  );
}
