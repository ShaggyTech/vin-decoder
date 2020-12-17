import express, { Express } from 'express';
import consola from 'consola';
import { Nuxt, Builder } from 'nuxt-edge';

import config from '../nuxt.config';
import { PORT } from './';

export class NuxtServer {
  app: Express;
  host: string;
  nuxt: typeof Nuxt;
  port: number;
  started: boolean;

  constructor(port?: number) {
    this.app = express();
    this.nuxt = new Nuxt(config);

    this.host = this.nuxt.options.server.host;
    this.port = port || PORT;

    this.started = false;
  }

  // If you prefer to use Nodemon or another custom watch script:
  // In your custom script, after instantiating a new NuxtServer,
  // you can call this.buildNuxt() to rebuild the app every time watched files are changed.
  async buildNuxt() {
    await this.nuxt.ready();
    const builder = new Builder(this.nuxt);
    await builder.build();
  }

  async start() {
    // If dev mode, build a fresh app
    if (config.dev) {
      await this.buildNuxt();
    }

    // Start the server one time only
    if (!this.started) {
      // Give nuxt middleware to express
      this.app.use(this.nuxt.render);
      // Listen to the server
      this.app.listen(this.port, this.host);
      // flag that the server is already running
      this.started = true;

      consola.ready({
        message: `Server listening on http://${this.host}:${this.port}`,
        badge: true,
      });
    }
  }
}
