export { NuxtServer } from './NuxtServer';

export const PORT = 3000;

export const FOLDER_NAMES = `
  assets
  |components
  |compositions
  |layouts
  |pages
  |plugins
  |server
  |static
  |store
  |types
  |utils
`;
export const FILE_EXTENSIONS = 'js,ts,jsx,vue';
export const WATCH_GLOB = `./+(${FOLDER_NAMES})/**/*.{${FILE_EXTENSIONS}}`;
