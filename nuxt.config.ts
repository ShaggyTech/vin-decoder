import { NuxtConfig } from '@nuxt/types';
import { description, name } from './package.json';

const TITLE = 'Vin Decoder';
const isDev = process.env.NODE_ENV !== 'production';
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? { router: { base: `/${name}/` } }
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
    title: TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: description || ''
      }
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
