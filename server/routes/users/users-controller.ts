import { Request, Response } from 'express';

const users = [{ name: 'Peter' }, { name: 'Victor' }, { name: 'Francesco' }];

function indexGet(_req: Request, res: Response) {
  res.render('users', { users });
}

export { indexGet };
