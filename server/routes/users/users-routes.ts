import { Router } from 'express';
import { indexGet } from './users-controller';

function registerRoutes(router: Router) {
  router.get('/users', indexGet);
}

export { registerRoutes };
