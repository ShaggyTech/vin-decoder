/* Types */
import type { TypedVuexStore } from '@/store';
import type { HistoryItem } from '@/store/history';

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
  } catch (err) {
    console.log('getHistoryFromLocalStorage error', err);
  }

  return history;
};

/* On component mount, will sync localStorage history array with history store module */
export const syncHistoryOnMounted = (store: TypedVuexStore): void => {
  onMounted(() => {
    const localHistory = getHistoryFromLocalStorage();
    store.history.INITIALIZE_HISTORY_STORE([...localHistory]);
  });
};
