import { mount } from '@vue/test-utils';
import { syncHistoryOnMounted } from '@/compositions/useLocalStorage';
/* Mocks */
import { mockRawResults } from '@/test/__mocks__/mockDecodeVinValuesExtendedResults';
/* Types */
import { DecodeVinValuesExtendedResults } from '@/types';
import { TypedVuexStore } from '@/store';
import { HistoryItem } from '@/store/history';

const MOCK_ITEM: HistoryItem = {
  VIN: 'TESTVIN',
  results: mockRawResults as DecodeVinValuesExtendedResults,
};

const mountComposition = (cb: () => any) => {
  return mount({
    setup() {
      return cb();
    },
    render(h) {
      return h('div');
    },
  });
};

const useMockStore = (history: HistoryItem[]): object => ({
  history: {
    history,
    addHistoryItem: jest.fn(),
    deleteHistoryItem: jest.fn(),
    clearHistory: jest.fn(),
    INITIALIZE_HISTORY_STORE: jest.fn(),
  },
});

describe('useLocalStorage composition functions', () => {
  describe('syncHistoryOnMounted exported function', () => {
    let store: TypedVuexStore;

    beforeEach(() => {
      localStorage.clear();
      store = useMockStore([]) as TypedVuexStore;
    });

    test('is correctly exported as a function', () => {
      expect(syncHistoryOnMounted).toBeDefined();
      expect(typeof syncHistoryOnMounted === 'function').toBe(true);
    });

    test('if no localStorage.history exists, store is initialized with an empty array', () => {
      const component = mountComposition(() => {
        syncHistoryOnMounted(store);
      });

      expect(component).toBeDefined();
      expect(store.history.INITIALIZE_HISTORY_STORE).toHaveBeenCalledWith([]);
    });

    test('if localStorage.history exists but is empty, store is initialized with an empty array', () => {
      const component = mountComposition(() => {
        localStorage.setItem('history', JSON.stringify([]));
        syncHistoryOnMounted(store);
      });

      expect(component).toBeDefined();
      expect(store.history.INITIALIZE_HISTORY_STORE).toHaveBeenCalledWith([]);
    });

    test('if localStorage.history exists and is populated, it should be used to intialize the history store', () => {
      const component = mountComposition(() => {
        localStorage.setItem('history', JSON.stringify([MOCK_ITEM]));
        syncHistoryOnMounted(store);
      });

      expect(component).toBeDefined();
      expect(store.history.INITIALIZE_HISTORY_STORE).toHaveBeenCalledWith([
        MOCK_ITEM,
      ]);
    });
  });
});
