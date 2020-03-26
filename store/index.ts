/* Types */
import {
  StoreStateRoot,
  HistoryItem,
  HistoryPayload,
  RootActionContext
} from '@/types/store';

export default {
  namespaced: true as true,
  state: () => ({
    counter: 0,
    history: []
  }),
  getters: {
    message: (state: StoreStateRoot) => `The count is: ${state.counter}!`
  },
  mutations: {
    SET_COUNTER(state: StoreStateRoot, newCount: number) {
      state.counter = newCount;
    },
    MODIFY_HISTORY(state: StoreStateRoot, payload: HistoryPayload) {
      if (payload?.item) {
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
            return item.VIN !== payload.item.VIN;
          });
        }
      } else if (payload?.action === 'clear') {
        state.history = [];
      }
    }
  },
  actions: {
    increment({ state, commit }: RootActionContext): void {
      commit('SET_COUNTER', state.counter + 1);
    },
    clearHistory({ commit }: RootActionContext): void {
      commit('MODIFY_HISTORY', { action: 'clear' });
    },
    addHistoryItem({ commit }: RootActionContext, payload: HistoryItem): void {
      commit('MODIFY_HISTORY', { action: 'insert', item: payload });
    }
  }
};
