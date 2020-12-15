import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import defaultLayout from '@/layouts/default.vue';
import vuetifyConfig from '@/plugins/vuetify';

const localVue = createLocalVue();

jest.mock('@/compositions/useLocalStorage', () => ({
  syncHistoryOnMounted: () => jest.fn()
}));

const factory = (options: { [propName: string]: any } = {}) => {
  return mount(defaultLayout, {
    stubs: ['nuxt', 'router-link', 'AppTitleCard'],
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
      vuetify
    });
  });

  test('component matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('component has "title" ref', () => {
    expect(wrapper.vm.$data.title).toBeDefined();
  });
});
