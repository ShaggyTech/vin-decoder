import { onMounted } from '@nuxtjs/composition-api';
/* Types */
import { TypedVuexStore } from '@/store';
import { HistoryItem } from '@/store/history';

const getHistoryFromLocalStorage = (): HistoryItem[] => {
  let storage;
  let history: HistoryItem[] = [];
  try {
    storage = localStorage.getItem('history');
    if (storage) {
      storage = JSON.parse(storage);
      if (Array.isArray(storage) && storage.length > 0) {
        history = [...storage];
      }
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}

  return history;
};

/* On component mount, will sync localStorage history array with history store module */
export const syncHistoryOnMounted = (store: TypedVuexStore): void => {
  onMounted(() => {
    const localHistory = getHistoryFromLocalStorage();
    store.history.INITIALIZE_HISTORY_STORE([...localHistory]);
  });
};
