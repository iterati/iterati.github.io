import { createReadStream, existsSync, readFileSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';
import type * as Prerender from './src/build/prerender';

const pictureTypes: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
};

// `pnpm dev` serves each route as the build prerenders it, so the dev page is the built page.
function prerenderInDev(): Plugin {
  return {
    name: 'prerender-in-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url ?? '/').split('?')[0];
        // the notes' pictures, which the build copies to docs/notes/img/
        if (url.startsWith('/notes/img/') && !url.includes('..') && existsSync(`content${url}`)) {
          const type = pictureTypes[url.slice(url.lastIndexOf('.'))];
          if (type) res.setHeader('Content-Type', type);
          createReadStream(`content${url}`).pipe(res);
          return;
        }
        const own = url.endsWith('/') ? `public${url}index.html` : `public${url}`;
        if (!/(\/|\.html)$/.test(url) || existsSync(own)) return next();
        try {
          const { routes, renderRoute } = (await server.ssrLoadModule(
            '/src/build/prerender.tsx',
          )) as typeof Prerender;
          const all = routes('content');
          const route = all.find((r) => r.path === url) ?? all[all.length - 1];
          const template = await server.transformIndexHtml(url, readFileSync('index.html', 'utf8'));
          res.statusCode = route.path === url ? 200 : 404;
          res.setHeader('Content-Type', 'text/html');
          res.end(renderRoute(route, template));
        } catch (e) {
          next(e);
        }
      });
    },
  };
}

// The client build writes docs/, which GitHub Pages serves from master /docs;
// `pnpm build` then prerenders every route into it (src/build/main.ts).
export default defineConfig({
  plugins: [react(), prerenderInDev()],
  build: { outDir: 'docs', emptyOutDir: true },
  test: { environment: 'node', include: ['test/**/*.test.{ts,tsx}'] },
});
