/* Types */
// import { MutationTree, ActionTree, GetterTree } from 'vuex';

import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree
} from 'typed-vuex';

// Import all your submodules
import * as history from '~/store/history';

export const namespaced: boolean = true;

export const state = () => ({
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
  rightDrawer: false
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
  message: state => `The count is: ${state.counter}!`
});

export const mutations = mutationTree(state, {
  SET_COUNTER(state, newCount: number) {
    state.counter = newCount;
  },
  SET_DRAWER(state, drawer: boolean) {
    state.drawer = drawer;
  },
  SET_RIGHT_DRAWER(state, rightDrawer: boolean) {
    state.rightDrawer = rightDrawer;
  }
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    increment({ state, commit }): void {
      commit('SET_COUNTER', state.counter + 1);
    },
    setDrawer({ commit }, drawer: boolean): void {
      commit('SET_DRAWER', drawer);
    },
    setRightDrawer({ commit }, rightDrawer: boolean): void {
      commit('SET_RIGHT_DRAWER', rightDrawer);
    }
  }
);

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    history
  }
});

// export default {
//   namespaced: true as true,

//   state: () => ({
//     counter: 0,
//     drawer: false,
//     drawerItems: [
//       {
//         icon: 'mdi-apps',
//         title: 'Welcome',
//         to: '/'
//       },
//       {
//         icon: 'mdi-chart-bubble',
//         title: 'Inspire',
//         to: '/inspire'
//       }
//     ],
//     rightDrawer: false,
//     history: []
//   }),

//   mutations: {
//     SET_COUNTER(state: RootState, newCount: number) {
//       state.counter = newCount;
//     },
//     SET_DRAWER(state: RootState, drawer: boolean) {
//       state.drawer = drawer;
//     },
//     SET_RIGHT_DRAWER(state: RootState, rightDrawer: boolean) {
//       state.rightDrawer = rightDrawer;
//     },
//     MODIFY_HISTORY(state: RootState, payload: HistoryPayload) {
//       if (payload?.item && payload?.action) {
//         if (payload.action === 'insert') {
//           const isExistingItem = (historyItem: HistoryItem) => {
//             return payload.item?.VIN === historyItem.VIN;
//           };
//           const itemIndex = state.history.findIndex(isExistingItem);

//           if (itemIndex < 0) {
//             state.history.unshift(payload.item);
//           }
//         } else if (payload.action === 'delete') {
//           state.history = state.history.filter((item: HistoryItem) => {
//             return item.VIN !== payload.item.VIN;
//           });
//         }
//       } else if (payload?.action === 'clear') {
//         state.history = [];
//       }
//     }
//   },

//   actions: {
//     increment({ state, commit }: RootActionContext): void {
//       commit('SET_COUNTER', state.counter + 1);
//     },
//     setDrawer({ commit }: RootActionContext, drawer: boolean): void {
//       commit('SET_DRAWER', drawer);
//     },
//     setRightDrawer({ commit }: RootActionContext, rightDrawer: boolean): void {
//       commit('SET_RIGHT_DRAWER', rightDrawer);
//     },
//     clearHistory({ commit }: RootActionContext): void {
//       commit('MODIFY_HISTORY', { action: 'clear' });
//     },
//     addHistoryItem({ commit }: RootActionContext, payload: HistoryItem): void {
//       commit('MODIFY_HISTORY', { action: 'insert', item: payload });
//     },
//     deleteHistoryItem(
//       { commit }: RootActionContext,
//       payload: HistoryItem
//     ): void {
//       commit('MODIFY_HISTORY', { action: 'delete', item: payload });
//     }
//   },

//   getters: {
//     message: (state: RootState) => `The count is: ${state.counter}!`
//   }
// };
