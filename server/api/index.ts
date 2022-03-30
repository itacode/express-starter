import express, { Router } from 'express';
import { registerRoutes as registerSearchRoutes } from './search/search-routes';

const router = express.Router();

registerAllRoutes(router);

function registerAllRoutes(router: Router) {
  registerSearchRoutes(router);
}

export { router };
