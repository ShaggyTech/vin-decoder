import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import errorLayout from '@/layouts/error.vue';
import vuetifyConfig from '@/plugins/vuetify';

const localVue = createLocalVue();

const factory = (options: { [propName: string]: any }) => {
  return mount(errorLayout, {
    propsData: {
      error: {
        statusCode: null,
      },
    },
    stubs: ['NuxtLink'],
    localVue,
    ...options,
  });
};

describe('Layouts - error', () => {
  let vuetify;
  let wrapper: ReturnType<typeof factory>;

  beforeEach(() => {
    vuetify = new Vuetify(vuetifyConfig);
    wrapper = factory({
      vuetify,
    });
  });

  test('component matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('component has "error" prop', () => {
    expect(wrapper.vm.$props.error).toBeDefined();
  });

  test('component has "pageNotFound" ref defined', () => {
    expect(wrapper.vm.$data.pageNotFound).toBeDefined();
  });

  test('component has "otherError" ref', () => {
    expect(wrapper.vm.$data.otherError).toBeDefined();
  });

  test('if error props is undefined, heading text defaults to otherError.value', () => {
    const heading = wrapper.find('h1').text();
    const otherError = wrapper.vm.$data.otherError;
    expect(heading).toEqual(otherError);
  });

  test('if error.statusCode === 404, heading text defaults to pageNotFound.value', async () => {
    const vuetify = new Vuetify(vuetifyConfig);
    const wrapper = factory({
      propsData: {
        error: { statusCode: 404 },
      },
      vuetify,
    });

    await wrapper.vm.$nextTick();
    const heading = wrapper.find('h1').text();
    const pageNotFound = wrapper.vm.$data.pageNotFound;
    expect(heading).toEqual(pageNotFound);
  });
});
