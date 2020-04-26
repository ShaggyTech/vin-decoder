/* Composition API */
import { onMounted, computed } from '@vue/composition-api';
/* Types */
import { TypedVuexStore } from '@/store';
import { HistoryItem } from '@/store/history';

const getLocalStorageHistory = () => {
  let storage: boolean | string = false;
  try {
    storage = localStorage.getItem('history') || false;
    if (storage) {
      storage = JSON.parse(storage) || false;
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}

  return storage || {};
};

/* Returns the index if the given history item exists, or -1 if it does not exist */
export const getHistoryItemIndex = (
  vinValue: string,
  history: HistoryItem[]
): number => {
  const isExistingItem = (historyItem: HistoryItem) => {
    return vinValue === historyItem.VIN;
  };
  return history.findIndex(isExistingItem);
};

export const syncHistoryOnMounted = (store: TypedVuexStore): void => {
  onMounted(() => {
    const localHistory = getLocalStorageHistory();
    store.history.INITIALIZE_HISTORY_STORE(localHistory);
  });
};

export const historySetup = (store: TypedVuexStore) => ({
  /* History Array */
  history: computed(() => [...store.history.history]),

  addHistoryItem: (item: HistoryItem): void => {
    store.history.addHistoryItem(item);
  },
  deleteHistoryItem: (item: HistoryItem): void => {
    store.history.deleteHistoryItem(item);
  },
  clearHistory: (): void => {
    store.history.clearHistory();
  }
});
