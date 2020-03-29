import { provide, inject } from '@vue/composition-api';
import { Store } from 'vuex';

import { StoreStateRoot } from '@/types/store';

const StoreSymbol = Symbol('vuex store Symbol');

export const provideStore = (store: Store<StoreStateRoot>) =>
  provide(StoreSymbol, store);

export const useStore = () => {
  const store = inject(StoreSymbol) as Store<StoreStateRoot>;
  if (!store) {
    // do something
  }
  return store;
};
