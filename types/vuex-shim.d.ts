import { TypedVuexStore } from './';

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: TypedVuexStore;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: TypedVuexStore;
  }
}
