import { Router } from 'express';
import { indexGet } from './search-controller';

function registerRoutes(router: Router) {
  router.get('/search', indexGet);
}

export { registerRoutes };
