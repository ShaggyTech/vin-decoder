import { Store } from 'vuex';
import { accessorType } from '@/store';

export const syncLocalStorage = (store: Store<typeof accessorType>) => {
  store.subscribe((mutation, state) => {
    if (mutation.type !== 'INITIALIZE_HISTORY_STORE') {
      localStorage.setItem('history', JSON.stringify(state.history));
    }
  });
};
