import express, { Application } from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { corsMiddleware } from "./core/cors.middleware";
import { errorMiddleware } from "./core/error.middleware";
import createRouter from "./core/router.middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Server {
  public express: Application;

  public constructor() {
    this.express = express();
    this.initialize();
  }

  private async initialize() {
    this.express.use(corsMiddleware);

    this.express.use(express.json({ limit: "1mb" }));
    this.express.use(express.urlencoded({ extended: true }));
    /*
     * Enable if you want to use the docs
     * - this.express.use(express.static(path.join(__dirname, "..", "docs")));
     */
    this.express.use(
      morgan("[:date[web]] - [:method] :url (:status) in :response-time ms"),
    );

    await createRouter(this.express, {
      directory: path.join(__dirname, "routes"),
    });

    this.express.use(errorMiddleware);
  }

  public start(params: OnStart): void {
    this.express.get("/", (_, res) => {
      res.json({
        status: `${params.applicationName} is up and running.`,
        description: params.description,
        version: params.version,
        currentDateTime: new Date().toLocaleString(),
      });
    });
    this.express.listen(params.applicationPort, () => {
      console.log(
        `${params.applicationName} is running in http://localhost:${params.applicationPort}/`,
      );
    });
  }
}
