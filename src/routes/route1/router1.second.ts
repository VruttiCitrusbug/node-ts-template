import { Router, Request, Response } from 'express';
import Service1Second from '../../services/service1/service1.second';

const router1Second = Router();
const service1second = new Service1Second();

router1Second.get('/router1-second', (req: Request, res: Response) => {
  const users = service1second.getUsers();
  res.json(users);
});

export default router1Second;
