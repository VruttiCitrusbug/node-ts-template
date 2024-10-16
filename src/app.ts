/*external modules*/
import express, { Application } from "express";
/*types */
// import { ProjectTypes } from '@project_types'; global types
/*service modules */
import config from "config";
import LoggerService from "./logger";
import RouterService from "./routes";

/**
 * Class that encapsulates the Express application.
 * It initializes the application and its components,
 * such as the middlewares and the routes.
 */
class App {
  private app: Application;
  private port: number;
  private logger: LoggerService;
  private routerService: RouterService;

  constructor() {
    this.app = express(); // Initialize Express application
    this.port = config.app.port; // Load the port from config
    this.logger = LoggerService.getInstance(); // Logger instance
    this.routerService = new RouterService();

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  // Setup middlewares (if needed, like bodyParser, etc.)
  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  // Setup routes using the RouterService
  private initializeRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    this.app.use("/api", this.routerService.getRouter());
  }

  // Start the Express server
  public listen() {
    this.app.listen(this.port, () => {
      this.logger.info(`Server is running at http://localhost:${this.port}`);
    });
  }
}

export default App;
