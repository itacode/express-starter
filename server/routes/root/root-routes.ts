import { Router } from 'express';
import { indexGet } from './root-controller';

function registerRoutes(router: Router) {
  router.get('/', indexGet);
}

export { registerRoutes };
