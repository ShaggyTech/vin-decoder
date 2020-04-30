import { onMounted } from '@vue/composition-api';
/* Types */
import { TypedVuexStore } from '@/store';
import { HistoryItem } from '@/store/history';

const getHistoryFromLocalStorage = (): Array<any> => {
  let storage: Array<any> | string | boolean = false;
  try {
    storage = localStorage.getItem('history') || false;
    if (storage) {
      storage = JSON.parse(storage);
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}

  if (Array.isArray(storage) && storage.length > 0) {
    return [...storage] as HistoryItem[];
  } else {
    return [];
  }
};

/* On component mount, will sync localStorage history array with history store module */
export const syncHistoryOnMounted = (store: TypedVuexStore): void => {
  onMounted(() => {
    const localHistory = getHistoryFromLocalStorage();
    store.history.INITIALIZE_HISTORY_STORE(localHistory);
  });
};
