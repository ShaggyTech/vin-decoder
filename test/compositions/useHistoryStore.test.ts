/**
 * @jest-environment jsdom
 */

import { isRef } from '@nuxtjs/composition-api';
import {
  mapHistoryState,
  mapHistoryActions,
} from '@/compositions/useHistoryStore';
/* Mocks */
import { mockRawResults } from '@/test/__mocks__/mockDecodeVinValuesExtendedResults';
/* Types */
import { HistoryItem } from '@/store/history';
import { TypedVuexStore } from '@/store';
import { DecodeVinValuesExtendedResults } from '@/types';

const MOCK_ITEM: HistoryItem = {
  VIN: 'TESTVIN',
  results: mockRawResults as DecodeVinValuesExtendedResults,
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

describe('useHistoryStore composition functions', () => {
  describe('mapHistoryState exported function', () => {
    let store: TypedVuexStore;

    beforeEach(() => {
      store = useMockStore([]) as TypedVuexStore;
    });

    test('returns composition Refs computed from history store state', () => {
      const { history } = mapHistoryState(store);

      expect(history).toBeDefined();
      expect(isRef(history)).toBe(true);
      expect(history.value).toBeDefined();
    });

    test('history Ref is computed from root store state', () => {
      const { history } = mapHistoryState(store);

      expect(history.value).toEqual(store.history.history);
    });
  });

  describe('mapHistoryActions exported function', () => {
    let store: TypedVuexStore;

    beforeEach(() => {
      store = useMockStore([]) as TypedVuexStore;
    });

    test('returns composition methods mapped to history store actions', () => {
      const {
        addHistoryItem,
        deleteHistoryItem,
        clearHistory,
      } = mapHistoryActions(store);

      expect(addHistoryItem).toBeDefined();
      expect(typeof addHistoryItem === 'function').toBe(true);

      expect(deleteHistoryItem).toBeDefined();
      expect(typeof deleteHistoryItem === 'function').toBe(true);

      expect(clearHistory).toBeDefined();
      expect(typeof clearHistory === 'function').toBe(true);
    });

    test('addHistoryItem is a function and correctly calls mapped store action', () => {
      const { addHistoryItem } = mapHistoryActions(store);

      addHistoryItem(MOCK_ITEM);

      expect(store.history.addHistoryItem).toHaveBeenCalledTimes(1);
      expect(store.history.addHistoryItem).toHaveBeenCalledWith(MOCK_ITEM);
    });

    test('deleteHistoryItem calls the correct mapped store action', () => {
      const { deleteHistoryItem } = mapHistoryActions(store);

      deleteHistoryItem(MOCK_ITEM);

      expect(store.history.deleteHistoryItem).toHaveBeenCalledTimes(1);
      expect(store.history.deleteHistoryItem).toHaveBeenCalledWith(MOCK_ITEM);
    });

    test('clearHistory calls the correct mapped store action', () => {
      const { clearHistory } = mapHistoryActions(store);

      clearHistory();

      expect(store.history.clearHistory).toHaveBeenCalledTimes(1);
      expect(store.history.clearHistory).toHaveBeenCalledWith();
    });
  });
});
