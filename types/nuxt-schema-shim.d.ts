import type {
  NuxtConfig as _NuxtConfig,
  NuxtOptions as _NuxtOptions,
} from '@nuxt/schema';

import type { PWAOptions } from '@nuxtjs/pwa';
import type { Options as VuetifyOptions } from '@nuxtjs/vuetify';

declare module '@nuxt/schema' {
  interface NuxtConfig extends _NuxtConfig {
    pwa?: PWAOptions;
    vuetify?: VuetifyOptions;
    webfontloader?: Record<string, any>;
  }
  interface NuxtOptions extends _NuxtOptions {
    pwa?: PWAOptions;
    vuetify?: VuetifyOptions;
    webfontloader?: Record<string, any>;
  }
}
