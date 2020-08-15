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

  async buildNuxt() {
    await this.nuxt.ready();

    const builder = new Builder(this.nuxt);
    await builder.build();
  }

  async start() {
    // Build once in production and every time in dev mode if this.start() is called
    if (!this.started || config.dev) {
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
        badge: true
      });
    }
  }
}
