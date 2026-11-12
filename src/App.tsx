import { Layout, type Section } from './components/Layout';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Note } from './pages/Note';
import { NotFound } from './pages/NotFound';
import { Notes } from './pages/Notes';
import { Toy } from './pages/Toy';
import type { Page } from './site';

function body(page: Page) {
  switch (page.kind) {
    case 'home':
      return <Home notes={page.notes} toyPages={page.toyPages} />;
    case 'about':
      return <About />;
    case 'notes':
      return <Notes notes={page.notes} />;
    case 'note':
      return <Note note={page.note} older={page.older} toyPage={page.toyPage} />;
    case 'toy':
      return <Toy toy={page.toy} />;
    case 'missing':
      return <NotFound />;
  }
}

const sections: Record<Page['kind'], Section> = {
  home: undefined,
  about: 'about',
  notes: 'notes',
  note: 'notes',
  toy: 'toys',
  missing: undefined,
};

export function App({ page }: { page: Page }) {
  return <Layout current={sections[page.kind]}>{body(page)}</Layout>;
}
