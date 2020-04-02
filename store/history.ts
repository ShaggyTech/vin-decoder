/* Types */
// import { MutationTree, ActionTree } from 'vuex';

import { mutationTree, actionTree } from 'nuxt-typed-vuex';

import { ResultsObjectType } from '@/types';

export type HistoryItem = {
  VIN: string;
  results: ResultsObjectType;
};

export interface HistoryPayload {
  action: string;
  item?: HistoryItem;
}

// export const namespaced: boolean = true;

export const state = () => ({
  history: [] as HistoryItem[]
});

export type HistoryState = ReturnType<typeof state>;

export const mutations = mutationTree(state, {
  MODIFY_HISTORY(state, payload: HistoryPayload) {
    if (payload?.item && payload?.action) {
      if (payload.action === 'insert') {
        const isExistingItem = (historyItem: HistoryItem) => {
          return payload.item?.VIN === historyItem.VIN;
        };
        const itemIndex = state.history.findIndex(isExistingItem);

        if (itemIndex < 0) {
          state.history.unshift(payload.item);
        }
      } else if (payload.action === 'delete') {
        state.history = state.history.filter((item: HistoryItem) => {
          return item.VIN !== payload.item?.VIN;
        });
      }
    } else if (payload?.action === 'clear') {
      state.history = [];
    }
  }
});

export const actions = actionTree(
  { state, mutations },
  {
    clearHistory({ commit }): void {
      commit('MODIFY_HISTORY', { action: 'clear' });
    },
    addHistoryItem({ commit }, payload: HistoryItem): void {
      commit('MODIFY_HISTORY', { action: 'insert', item: payload });
    },
    deleteHistoryItem({ commit }, payload: HistoryItem): void {
      commit('MODIFY_HISTORY', { action: 'delete', item: payload });
    }
  }
);
