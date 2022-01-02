import { Request, Response, NextFunction } from 'express';

export function Logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${req.path}`);
  console.log('Params: ', req.params);
  console.log('Query: ', req.query);
  console.log('Body: ', req.body);
  next();
}
