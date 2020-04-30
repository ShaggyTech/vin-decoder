import { Configuration } from '@nuxt/types';
import { name } from './package.json';

const isDev = process.env.NODE_ENV !== 'production';
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? { router: { base: `/${name}/` } }
    : {};

const config: Configuration = {
  mode: 'universal',
  dev: isDev,
  ...routerBase,
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: ['@/plugins/composition-api.ts', '@/plugins/vee-validate.ts'],
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
    'nuxt-typed-vuex'
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    optionsPath: '@/plugins/vuetify.ts'
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [
      'vee-validate/dist/rules',
      'vuetify/lib/util/colors',
      '/typed-vuex/'
    ]
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
  }
};

export default config;
