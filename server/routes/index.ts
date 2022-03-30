import { Router } from 'express';
const router = Router();
import { registerRoutes as registerRootRoutes } from './root/root-routes';
import { registerRoutes as registerUsersRoutes } from './users/users-routes';

registerAllRoutes(router);

function registerAllRoutes(router: Router) {
  registerRootRoutes(router);
  registerUsersRoutes(router);
}

export { router };
