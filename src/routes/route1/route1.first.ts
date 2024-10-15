/*external modules*/
import { Router, Request, Response } from 'express';
/*service modules*/
import Service1Second from '../../services/service1/service1.second';

const router1First = Router();
const service1second = new Service1Second();

router1First.get('/router1-first', (req: Request, res: Response) => {
    const users = service1second.getUsers();
    res.json(users);
});


router1First.get("/router1-first/:id", (req: Request, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = service1second.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });

export default router1First;
