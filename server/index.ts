export { NuxtServer } from './NuxtServer';

export const PORT = 3000;

export const WATCH_FOLDERS = `
  assets
  |components
  |compositions
  |layouts
  |middleware
  |pages
  |plugins
  |server
  |static
  |store
  |types
  |utils
`;
export const WATCH_EXTENSIONS = 'js,ts,jsx,vue';

export const WATCH_GLOB = `./+(${WATCH_FOLDERS})/**/*.{${WATCH_EXTENSIONS}}`;
