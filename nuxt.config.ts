import { defineNuxtConfig } from '@nuxt/bridge';

import { name as PACKAGE_NAME } from './package.json';
import { PORT } from './server';

const isDev = process.env.NODE_ENV !== 'production';
// const typeCheck = isDev ? {
//   eslint: {
//     files: './**/*.{ts,js,vue}',
//   },
// }
//   : false;

export const PRODUCTION_HOST_URL =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? 'shaggytech.com'
    : 'vin.dubsquared.com';

const META_TITLE = 'VIN Decoder';
const META_URL = isDev ? `localhost:${PORT}/` : PRODUCTION_HOST_URL;
const META_DESCRIPTION =
  'A web app to decode Vehicle Identification Numbers (VIN) using the NHTSA.dot.gov Vehicles API.';

const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? { router: { base: `/${PACKAGE_NAME}/` } }
    : {};

const config = defineNuxtConfig({
  rootDir: __dirname,
  target: 'server',
  buildDir: '.nuxt',
  generate: { dir: 'dist' },
  // telemetry: false,
  dev: isDev,
  ...routerBase,
  // loading: { color: '#fff' },
  css: ['@/assets/css/main.scss'],
  /* Auto import components */
  components: [{ path: '~/components', extensions: ['vue'] }],
  // components: [
  //   '~/components',
  //   {
  //     path: '~/components/app/',
  //     prefix: 'App',
  //   },
  //   {
  //     path: '~/components/base/',
  //     prefix: 'Base',
  //   },
  //   {
  //     path: '~/components/VinDecoder/',
  //     prefix: 'VinDecoder',
  //   },
  // ],

  // https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config/
  publicRuntimeConfig: {},
  privateRuntimeConfig: {},
  render: {
    // asyncScripts: true,
  },
  head: {
    // titleTemplate: '%s - ',
    htmlAttrs: {
      lang: 'en',
    },
    title: META_TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: META_DESCRIPTION },
      { property: 'og:title', content: META_TITLE },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `/og-image.jpg` },
      { property: 'og:image:width', content: '237' },
      { property: 'og:image:height', content: '237' },
      { property: 'og:url', content: META_URL },
      { property: 'og:description', content: META_DESCRIPTION },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  plugins: ['~/plugins/vee-validate.ts'],
  buildModules: ['@nuxtjs/vuetify', 'nuxt-typed-vuex'],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', 'nuxt-webfontloader'],

  pwa: {
    meta: {
      // nativeUI: false,
      theme_color: '#78a0ff',
      ogHost: 'shaggytech.com',
    },
    manifest: {
      name: 'Vehicle Information Decoder',
      short_name: 'VIN Decoder',
    },
  },
  // Runtime type checking when running nuxt build
  // typescript: {
  //   typeCheck,
  // },
  vuetify: {
    defaultAssets: false,
    optionsPath: '~/plugins/vuetify.ts',
  },

  webfontloader: {
    google: {
      families: ['Rubik:400,500,700&display=swap'],
    },
  },

  build: {
    extractCSS: !isDev,
    transpile: [
      'vee-validate/dist/rules',
      'vuetify/lib/util/colors',
      '/typed-vuex/',
    ],
  },
});

export default config;
