import path from 'path';
import express, { Express } from 'express';
import consola from 'consola';
import { loadNuxt, build, Nuxt } from 'nuxt-edge';

import config, { PRODUCTION_HOST_URL } from '../nuxt.config';
import { PORT } from './';

const rootDir = path.resolve(__dirname, '..');

export class NuxtServer {
  app: Express;
  host: string;
  nuxt: typeof Nuxt;
  port: number;
  started: boolean;

  constructor(port?: number) {
    this.app = express();
    this.nuxt = undefined;

    this.host = !config.dev ? PRODUCTION_HOST_URL : 'localhost';
    this.port = port || PORT;

    this.started = false;
  }

  async getNuxt() {
    if (config.dev) {
      const nuxt = await loadNuxt({ for: 'dev', rootDir });
      await build(nuxt);
      return nuxt;
    }

    const nuxt = await loadNuxt({ for: 'start', rootDir });
    return nuxt;
  }

  async start() {
    // Start the server one time only
    if (!this.started) {
      // get a new nuxt instance
      await this.getNuxt()
        .then((nuxt) => (this.nuxt = nuxt))
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
          process.exit(1);
        });

      this.host = this.nuxt.options.server.host;
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

  // If you prefer to use Nodemon or another custom watch script:
  // In your custom script, after instantiating a new NuxtServer,
  // you can call this.buildNuxt() to rebuild the app every time watched files are changed.
  async buildNuxt() {
    await this.nuxt.ready();
    await this.getNuxt()
      .then((nuxt) => (this.nuxt = nuxt))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        process.exit(1);
      });
  }
}
