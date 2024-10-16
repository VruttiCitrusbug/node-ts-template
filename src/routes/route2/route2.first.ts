import { Router, Request, Response } from "express";

const router2First = Router();

router2First.get("/router2-first", (req: Request, res: Response) => {
  res.json({ message: "Hello from Router2 First Endpoint" });
});

export default router2First;
