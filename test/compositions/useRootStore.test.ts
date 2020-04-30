import { isRef } from '@vue/composition-api';
import { mapRootState, mapRootActions } from '@/compositions/useRootStore';
/* Types */
import { TypedVuexStore } from '~/store';

const mockDrawerItems = [
  {
    icon: 'test-icon-1',
    title: 'Test Page 1',
    to: '/'
  },
  {
    icon: 'test-icon-2',
    title: 'Test Page 2',
    to: '/testpage2'
  }
];

const useMockStore = (): object => ({
  drawerItems: [...mockDrawerItems],
  drawer: false,
  rightDrawer: false,
  setDrawer: jest.fn(),
  setRightDrawer: jest.fn()
});

describe('useRootStore composition functions', () => {
  describe('mapRootState exported function', () => {
    let store: TypedVuexStore;

    beforeEach(() => {
      store = useMockStore() as TypedVuexStore;
    });

    test('returns composition Refs computed from root store state', () => {
      const { drawerItems, drawer, rightDrawer } = mapRootState(store);

      expect(drawerItems).toBeDefined();
      expect(isRef(drawerItems)).toBe(true);
      expect(drawerItems.value).toBeDefined();

      expect(drawer).toBeDefined();
      expect(isRef(drawer)).toBe(true);
      expect(drawer.value).toBeDefined();

      expect(rightDrawer).toBeDefined();
      expect(isRef(rightDrawer)).toBe(true);
      expect(rightDrawer.value).toBeDefined();
    });

    test('drawerItems Ref is computed from root store state', () => {
      const { drawerItems } = mapRootState(store);

      expect(drawerItems.value).toEqual(store.drawerItems);
    });

    test('drawer Ref is computed from root store state', () => {
      const { drawer } = mapRootState(store);

      expect(drawer.value).toEqual(store.drawer);
    });

    test('drawer value can be set', () => {
      const { drawer } = mapRootState(store);

      expect(drawer.value).toEqual(store.drawer);

      drawer.value = true;

      expect(store.setDrawer).toHaveBeenCalledTimes(1);
      expect(store.setDrawer).toHaveBeenCalledWith(true);
    });

    test('rightDrawer is a composition Ref and is defined as a boolean', () => {
      const { rightDrawer } = mapRootState(store);
      expect(typeof rightDrawer.value === 'boolean').toEqual(true);
    });

    test('rightDrawer value can be set', () => {
      const { rightDrawer } = mapRootState(store);

      expect(rightDrawer.value).toEqual(store.rightDrawer);

      rightDrawer.value = true;

      expect(store.setRightDrawer).toHaveBeenCalledTimes(1);
      expect(store.setRightDrawer).toHaveBeenCalledWith(true);
    });
  });

  describe('mapRootActions exported function', () => {
    let store: TypedVuexStore;

    beforeEach(() => {
      store = useMockStore() as TypedVuexStore;
    });

    test('returns composition methods mapped to root store actions', () => {
      const { toggleDrawer, toggleRightDrawer } = mapRootActions(store);

      expect(toggleDrawer).toBeDefined();
      expect(typeof toggleDrawer === 'function').toBe(true);

      expect(toggleRightDrawer).toBeDefined();
      expect(typeof toggleRightDrawer === 'function').toBe(true);
    });

    test('toggleDrawer calls mapped store action', () => {
      const { toggleDrawer } = mapRootActions(store);

      toggleDrawer(true);

      expect(store.setDrawer).toHaveBeenCalledTimes(1);
      expect(store.setDrawer).toHaveBeenCalledWith(false);
    });

    test('toggleRightDrawer calls mapped store action', () => {
      const { toggleRightDrawer } = mapRootActions(store);

      toggleRightDrawer(true);

      expect(store.setRightDrawer).toHaveBeenCalledTimes(1);
      expect(store.setRightDrawer).toHaveBeenCalledWith(false);
    });
  });
});
