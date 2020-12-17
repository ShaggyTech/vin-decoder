import consola from 'consola';
import { NuxtServer } from '.';

const startProduction = () => {
  const server = new NuxtServer();

  consola.start({
    message: `Starting production server on http://${server.host}:${server.port}`,
    badge: true,
  });
  server.start();
};

export default startProduction();
