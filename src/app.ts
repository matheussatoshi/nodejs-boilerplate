import { description, name, version } from "../package.json";
import config from "./config/default";
import { Server } from "./server";

class Application {
  private server: Server;
  private readonly port: number;

  public constructor() {
    this.server = new Server();
    this.port = config.get("port");
  }

  public initialize(): void {
    this.server.start({
      applicationName: name,
      applicationPort: this.port,
      description: description,
      version: version,
    });
  }
}

const main = new Application();

main.initialize();
