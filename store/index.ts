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
    drawer: false,
    drawerItems: [
      {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: '/'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Inspire',
        to: '/inspire'
      }
    ],
    rightDrawer: false,
    history: []
  }),

  mutations: {
    SET_COUNTER(state: StoreStateRoot, newCount: number) {
      state.counter = newCount;
    },
    SET_DRAWER(state: StoreStateRoot, drawer: boolean) {
      state.drawer = drawer;
    },
    SET_RIGHT_DRAWER(state: StoreStateRoot, rightDrawer: boolean) {
      state.rightDrawer = rightDrawer;
    },
    MODIFY_HISTORY(state: StoreStateRoot, payload: HistoryPayload) {
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
    setDrawer({ commit }: RootActionContext, drawer: boolean): void {
      commit('SET_DRAWER', drawer);
    },
    setRightDrawer({ commit }: RootActionContext, rightDrawer: boolean): void {
      commit('SET_RIGHT_DRAWER', rightDrawer);
    },
    clearHistory({ commit }: RootActionContext): void {
      commit('MODIFY_HISTORY', { action: 'clear' });
    },
    addHistoryItem({ commit }: RootActionContext, payload: HistoryItem): void {
      commit('MODIFY_HISTORY', { action: 'insert', item: payload });
    },
    deleteHistoryItem(
      { commit }: RootActionContext,
      payload: HistoryItem
    ): void {
      commit('MODIFY_HISTORY', { action: 'delete', item: payload });
    }
  },

  getters: {
    message: (state: StoreStateRoot) => `The count is: ${state.counter}!`
  }
};
