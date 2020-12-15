import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import vuetifyConfig from '@/plugins/vuetify';
import pageIndex from '@/pages/index.vue';

const localVue = createLocalVue();

const getMocks = (history: Array<any>) => {
  return {
    $accessor: {
      history: {
        history,
      },
    },
  };
};

const factory = (options: object) => {
  return mount(pageIndex, {
    localVue,
    ...options,
  });
};

describe('Pages: Home', () => {
  const vuetify = new Vuetify(vuetifyConfig);
  const wrapper = factory({
    vuetify,
    mocks: { ...getMocks([]) },
  });

  test('component matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
