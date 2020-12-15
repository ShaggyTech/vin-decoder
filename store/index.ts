import {
  getAccessorType,
  getterTree,
  mutationTree,
  actionTree,
} from 'typed-vuex';
/* Vuex Plugins */
import { syncLocalStorage } from '@/store/plugins/syncLocalStorage';
// Import all your store submodules
import * as history from '@/store/history';

/* Plugins */
export const plugins = [syncLocalStorage];

export const namespaced: boolean = true;

const getDefaultState = () => ({
  counter: 0,
  drawer: false,
  drawerItems: [
    {
      icon: 'mdi-apps',
      title: 'Welcome',
      to: '/',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Inspire',
      to: '/inspire',
    },
  ],
  rightDrawer: false,
});

export const state = () => ({ ...getDefaultState() });

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
  message: (state) => `The count is: ${state.counter}!`,
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
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    increment({ state, commit }) {
      commit('SET_COUNTER', state.counter + 1);
    },
    setDrawer({ commit }, drawer: boolean) {
      commit('SET_DRAWER', drawer);
    },
    setRightDrawer({ commit }, rightDrawer: boolean) {
      commit('SET_RIGHT_DRAWER', rightDrawer);
    },
  }
);

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    history,
  },
});

export type TypedVuexStore = typeof accessorType;
