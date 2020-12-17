import chokidar from 'chokidar';
import consola from 'consola';
import { NuxtServer, WATCH_GLOB } from '.';

const server = new NuxtServer();
const watcher = chokidar.watch([WATCH_GLOB], {
  ignoreInitial: true,
});

const startMessage = `Starting Nuxt HMR dev server on http://${server.host}:${server.port}`;

consola.start({
  message: startMessage,
  badge: true,
});
server.start();

watcher.on('change', () => {
  server.buildNuxt();
});
