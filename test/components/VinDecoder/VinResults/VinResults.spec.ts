// import flushPromises from 'flush-promises';

import { shallowMount } from '@vue/test-utils';

import { mockRawResults } from '../../../__mocks__/mockDecodeVinValuesExtendedResults';
import VinResults from '@/components/VinDecoder/VinResults/VinResults.vue';

const factory = (options: object) => {
  return shallowMount(VinResults, {
    ...options
  });
};

describe('VinResults Component Tests', () => {
  test('component is hidden if rawResults prop is empty', () => {
    const wrapper = factory({
      sync: false
    });

    expect(wrapper.vm.$el.textContent).toEqual('');
    expect(wrapper.element).toMatchSnapshot();
  });

  test('if loading prop is true, a skeleton loader is shown in place of the results card', () => {
    const wrapper = factory({
      sync: false,
      propsData: {
        loading: true
      }
    });

    expect(wrapper.find('.results-loader').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  test('given rawResults, component renders the correct title and subtitle', () => {
    const wrapper = factory({
      sync: false,
      propsData: {
        rawResults: mockRawResults
      }
    });

    const { Make, Model, ModelYear, VIN } = mockRawResults;
    const titleItems = { Make, Model, ModelYear };

    const titleText = wrapper.find('.results-card__title').text();
    Object.keys(titleItems).forEach(key =>
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
        rawResults: mockRawResults
      }
    });

    const { Make, Model, ModelYear, VIN } = mockRawResults;
    const validResults = { Make, Model, ModelYear, VIN };

    await wrapper.vm.$nextTick();

    const resultsRef = wrapper.vm.$data.results;
    expect(resultsRef).toEqual(validResults);
  });
});
