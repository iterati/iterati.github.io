# iterati.github.io

The landing page for my toys. React and TypeScript with Vite; every page is prerendered to static
HTML at build time, and React then wakes the mirror ball, the facet strips and the toy previews.
No backend, no tracking, and no requests but the site's own files.

```sh
pnpm install
pnpm dev        # the site as the build renders it, at http://localhost:5173
pnpm build      # writes docs/, which GitHub Pages serves from master /docs
pnpm typecheck
pnpm lint
pnpm exec vitest run test/prerender.test.ts
```

Commit `docs/` with the source: Pages serves it as it is (`docs/.nojekyll` keeps Jekyll off it).

## Where things are

| Address                     | What                     | Source                                                           |
| --------------------------- | ------------------------ | ---------------------------------------------------------------- |
| `/`                         | hello, toys, notes       | `src/pages/Home.tsx`, the words in `src/words.ts`                |
| `/about/`                   | About                    | `src/pages/About.tsx`                                            |
| `/notes/`, `/notes/<slug>/` | every note; one note     | `content/notes/<date>-<slug>.md` (see `content/notes/README.md`) |
| `/toys/<toy>/`              | a toy's page             | `content/toys/<toy>.md`                                          |
| `/bermuda/`                 | Bermuda itself           | `public/bermuda/`, its own build copied in untouched             |
| `/404.html`                 | where old addresses land | `src/pages/NotFound.tsx`                                         |

The previews' loops and stills are in `public/media/`; the marks are `public/logo.svg` (the header),
`public/favicon.svg` and `public/mark.svg`. The build is `src/build/`: `content.ts` reads `content/`,
`prerender.tsx` writes each route into `docs/`.
