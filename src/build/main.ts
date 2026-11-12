// The last step of `pnpm build`: prerenders every route into docs/.
import { writeSite } from './prerender';

const routes = writeSite('content', 'docs');
console.log(`prerendered ${routes.length} pages into docs/`);
