// Wakes the prerendered page: the same tree, from the page's own data, so the shimmer and the previews start.
import '@fontsource/kaisei-opti/latin-400.css';
import '@fontsource/kaisei-opti/latin-700.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-600.css';
import './styles/disco.css';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from './App';
import type { Page } from './site';

const root = document.getElementById('root');
const data = document.getElementById('page-data');
if (root && data?.textContent) {
  const page = JSON.parse(data.textContent) as Page;
  hydrateRoot(
    root,
    <StrictMode>
      <App page={page} />
    </StrictMode>,
  );
}
