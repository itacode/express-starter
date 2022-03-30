import { Request, Response } from 'express';

function indexGet(_req: Request, res: Response) {
  res.render('index', { title: 'Express' });
}

export { indexGet };
