import Vue from 'vue';

/* Types */
import { mutationTree, actionTree } from 'typed-vuex';
import { DecodeVinValuesExtendedResults } from '@/types';

export type HistoryItem = {
  VIN: string;
  results: DecodeVinValuesExtendedResults;
};

export interface HistoryPayload {
  action: string;
  item?: HistoryItem;
}

export const state = () => ({
  history: [] as HistoryItem[],
});

export type HistoryState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  INITIALIZE_HISTORY_STORE(state, localStorageState) {
    Vue.set(state, 'history', [...localStorageState]);
  },
  CLEAR_HISTORY(state) {
    Vue.set(state, 'history', []);
  },
  ADD_HISTORY_ITEM(state, item: HistoryItem) {
    if (item) {
      const isExistingItem = (item_: HistoryItem) => {
        return item_.VIN === item.VIN;
      };
      const itemIndex = state.history.findIndex(isExistingItem);

      if (itemIndex < 0) {
        state.history.unshift(item);
      }
    }
  },
  DELETE_HISTORY_ITEM(state, item: HistoryItem) {
    if (item) {
      const newHistory = state.history.filter((item_: HistoryItem) => {
        return item_.VIN !== item.VIN;
      });
      Vue.set(state, 'history', [...newHistory]);
    }
  },
});

export const actions = actionTree(
  { state, mutations },
  {
    clearHistory({ commit }) {
      commit('CLEAR_HISTORY');
    },
    addHistoryItem({ commit }, payload: HistoryItem) {
      commit('ADD_HISTORY_ITEM', payload);
    },
    deleteHistoryItem({ commit }, payload: HistoryItem) {
      commit('DELETE_HISTORY_ITEM', payload);
    },
  }
);
