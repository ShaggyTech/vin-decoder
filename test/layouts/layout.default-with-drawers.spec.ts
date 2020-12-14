import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import defaultLayoutWithDrawers from '@/layouts/default-with-drawers.vue';
import vuetifyConfig from '@/plugins/vuetify';

const localVue = createLocalVue();

jest.mock('@/compositions/useLocalStorage', () => ({
  syncHistoryOnMounted: () => jest.fn()
}));

jest.mock('@/compositions/useRootStore', () =>
  jest.requireActual('@/compositions/useRootStore')
);

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

const getMocks = () => {
  return {
    $accessor: {
      _drawer: false,
      get drawer(): boolean {
        return this._drawer;
      },
      set drawer(newDrawer: boolean) {
        this._drawer = newDrawer;
      },

      _rightDrawer: false,
      get rightDrawer(): boolean {
        return this._rightDrawer;
      },
      set rightDrawer(newDrawer: boolean) {
        this._rightDrawer = newDrawer;
      },

      drawerItems: [...mockDrawerItems],

      setDrawer(newDrawer: boolean) {
        return (this._drawer = newDrawer);
      },
      setRightDrawer(newDrawer: boolean) {
        return (this._rightDrawer = newDrawer);
      }
    }
  };
};

const factory = (options: { [propName: string]: any } = {}) => {
  return mount(defaultLayoutWithDrawers, {
    stubs: ['nuxt', 'router-link'],
    localVue,
    ...options
  });
};

describe('Layouts - default', () => {
  let vuetify;
  let wrapper: ReturnType<typeof factory>;

  beforeEach(() => {
    vuetify = new Vuetify(vuetifyConfig);
    wrapper = factory({
      mocks: { ...getMocks() },
      vuetify
    });
  });

  test('component matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('component has "right" ref', () => {
    expect(wrapper.vm.$data.right).toBeDefined();
  });

  test('component has "title" ref', () => {
    expect(wrapper.vm.$data.title).toBeDefined();
  });

  test('component has "drawer" computed property', () => {
    expect(wrapper.vm.$data.drawer).toBeDefined();
    expect(wrapper.vm.$data.drawer).toEqual(false);
  });

  test('component has "drawerItems" computed property', () => {
    expect(wrapper.vm.$data.drawerItems).toBeDefined();
    expect(wrapper.vm.$data.drawerItems).toEqual(mockDrawerItems);
  });

  test('component has "rightDrawer" computed property', () => {
    expect(wrapper.vm.$data.rightDrawer).toBeDefined();
    expect(wrapper.vm.$data.rightDrawer).toEqual(false);
  });

  test('component has "toggleDrawer" method', () => {
    expect(wrapper.vm.$data.toggleDrawer).toBeDefined();
  });

  test('component has "toggleRightDrawer" method', () => {
    expect(wrapper.vm.$data.toggleRightDrawer).toBeDefined();
  });

  test('"drawer" computed value can be updated via "toggleDrawer" method', () => {
    const toggleDrawer: Function = wrapper.vm.$data.toggleDrawer;
    const getDrawer = (): boolean => wrapper.vm.$data.drawer;

    expect(getDrawer()).toEqual(false);

    toggleDrawer(getDrawer());

    expect(getDrawer()).toEqual(true);
  });

  test('"rightDrawer" computed value can be updated via "toggleRightDrawer" method', () => {
    const toggleRightDrawer: Function = wrapper.vm.$data.toggleRightDrawer;
    const getRightDrawer = (): boolean => wrapper.vm.$data.rightDrawer;

    expect(getRightDrawer()).toEqual(false);

    toggleRightDrawer(getRightDrawer());

    expect(getRightDrawer()).toEqual(true);
  });
});
