import { TypedVuexStore } from '~/store';

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

export interface User {
  firstName: string;
  lastName: string;
}

export type ResultsObjectType = { [propName: string]: string };

export interface Validator {
  rules: {
    [propName: string]: any;
  };
  immediate?: boolean;
  vid?: string;
  name?: string;
  customMessages?: {
    [propName: string]: string;
  };
}
