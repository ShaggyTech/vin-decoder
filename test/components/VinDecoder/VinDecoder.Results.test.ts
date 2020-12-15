import { mount } from '@vue/test-utils';
/* Component */
import VinDecoderResults from '~/components/VinDecoder/Results.vue';
/* Mock API Data */
import { mockRawResults } from '~/test/__mocks__/mockDecodeVinValuesExtendedResults';

const factory = (options: object) => {
  return mount(VinDecoderResults, {
    ...options,
  });
};

describe('VinDecoderResults Component Tests', () => {
  test('component is hidden if rawResults prop is empty', () => {
    const wrapper = factory({
      sync: false,
    });

    expect(wrapper.vm.$el.textContent).toEqual('');
    expect(wrapper.element).toMatchSnapshot();
  });

  test('if loading prop is true, a skeleton loader is shown in place of the results card', () => {
    const wrapper = factory({
      sync: false,
      propsData: {
        loading: true,
      },
    });

    expect(wrapper.find('.results-loader').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  test('given rawResults, component renders the correct title and subtitle', async () => {
    const wrapper = factory({
      sync: false,
      propsData: {
        rawResults: mockRawResults,
      },
    });

    await wrapper.vm.$nextTick();
    const { Make, Model, ModelYear, VIN } = mockRawResults;
    const titleItems = { Make, Model, ModelYear };

    const titleText = wrapper.find('.results-card__title').text();
    Object.keys(titleItems).forEach((key) =>
      expect(titleText).toContain(titleItems[key])
    );

    const subtitleText = wrapper.find('.results-card__subtitle').text();
    expect(subtitleText).toContain(`${VIN}`);

    expect(wrapper.element).toMatchSnapshot();
  });

  test('given rawResults, nullish or non-applicable values are filtered out of the results object ref', async () => {
    const wrapper = factory({
      sync: false,
      propsData: {
        rawResults: mockRawResults,
      },
    });

    await wrapper.vm.$nextTick();

    const { Make, Model, ModelYear, VIN } = mockRawResults;
    const validResults = { Make, Model, ModelYear, VIN };

    const resultsRef = wrapper.vm.$data.results;
    expect(resultsRef).toEqual(validResults);
  });

  test('watcher updates filtered results when rawResults changes', async () => {
    const wrapper = factory({
      sync: false,
    });

    await wrapper.vm.$nextTick();

    const { Make, Model, ModelYear, VIN } = mockRawResults;
    const validResults = { Make, Model, ModelYear, VIN };

    // start with empty rawResults
    let resultsRef = wrapper.vm.$data.results;
    expect(resultsRef).toEqual(null);

    // add rawResults
    await wrapper.setProps({ rawResults: mockRawResults });
    resultsRef = wrapper.vm.$data.results;
    expect(resultsRef).toEqual(validResults);

    // remove rawResults
    await wrapper.setProps({ rawResults: null });
    resultsRef = wrapper.vm.$data.results;
    expect(resultsRef).toEqual(null);
  });
});
