import { NuxtConfig } from '@nuxt/types';
import { name as PACKAGE_NAME } from './package.json';
import { PORT } from './server';

const isDev = process.env.NODE_ENV !== 'production';

const PRODUCTION_HOST_URL = 'shaggytech.com';

const META_TITLE = 'VIN Decoder';
const META_URL = isDev ? `localhost:${PORT}/` : PRODUCTION_HOST_URL;
const META_DESCRIPTION =
  'A web app to decode Vehicle Identification Numbers (VIN) using the NHTSA.dot.gov Vehicles API.';

const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? { router: { base: `/${PACKAGE_NAME}/` } }
    : {};

const config: NuxtConfig = {
  mode: 'universal',
  target: 'server',
  telemetry: false,
  dev: isDev,
  ...routerBase,

  // https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config/
  publicRuntimeConfig: {},
  privateRuntimeConfig: {},

  head: {
    // titleTemplate: '%s - ',
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
      { property: 'og:description', content: META_DESCRIPTION }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'prefetch',
        as: 'font',
        href: 'https://fonts.googleapis.com/css?family=Roboto'
      }
    ]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: ['~/plugins/composition-api.ts', '~/plugins/vee-validate.ts'],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
    'nuxt-typed-vuex'
  ],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  pwa: {
    manifest: {
      name: 'VIN Decoder',
      short_name: 'Vehicle Information Decoder',
      lang: 'en',
      display: 'standalone',
      theme_color: '#78a0ff'
    }
  },
  // Runtime type checking when running nuxt build
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },
  vuetify: {
    optionsPath: '~/plugins/vuetify.ts'
  },
  build: {
    extractCSS: !isDev,
    transpile: [
      'vee-validate/dist/rules',
      'vuetify/lib/util/colors',
      '/typed-vuex/'
    ]
  }
};

export default config;
