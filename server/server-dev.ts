import chokidar from 'chokidar';
import consola from 'consola';
import { NuxtServer, WATCH_GLOB } from '.';

const server = new NuxtServer();

consola.start({
  message: `Starting Nuxt HMR dev server on http://${server.host}:${server.port}`,
  badge: true
});
server.start();

chokidar
  .watch([WATCH_GLOB], {
    ignoreInitial: true
  })
  .on('change', () => {
    server.buildNuxt();
  });
