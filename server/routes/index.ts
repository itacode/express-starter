import { Router } from 'express';
import { registerRoutes as registerRootRoutes } from './root/root-routes';
import { registerRoutes as registerUsersRoutes } from './users/users-routes';
const router = Router();

registerAllRoutes(router);

function registerAllRoutes(router: Router) {
  registerRootRoutes(router);
  registerUsersRoutes(router);
}

export { router };
