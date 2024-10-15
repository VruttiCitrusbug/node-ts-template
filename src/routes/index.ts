import { Router } from 'express';
import router1First from './route1/route1.first';
import router1Second from './route1/router1.second';
import router2First from './route2/route2.first';

/**
 * Service that handles the routes of the application.
 */
class RouterService {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/router1', router1First);
    this.router.use('/router1', router1Second);

    this.router.use('/router2', router2First);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default RouterService;
