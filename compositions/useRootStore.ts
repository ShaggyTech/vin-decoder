import { computed } from '@vue/composition-api';
/* Types */
import { TypedVuexStore } from '@/store';

export const mapRootState = (store: TypedVuexStore) => ({
  drawerItems: computed(() => [...store.drawerItems]),
  drawer: computed({
    get: () => store.drawer,
    set: (drawer: boolean) => store.setDrawer(drawer)
  }),
  rightDrawer: computed({
    get: () => store.rightDrawer,
    set: (rightDrawer: boolean) => store.setRightDrawer(rightDrawer)
  })
});

export const mapRootActions = (store: TypedVuexStore) => ({
  toggleDrawer: (drawer: boolean) => {
    return store.setDrawer(!drawer);
  },
  toggleRightDrawer: (rightDrawer: boolean) => {
    return store.setRightDrawer(!rightDrawer);
  }
});
