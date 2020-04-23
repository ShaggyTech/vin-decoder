import { mount } from '@vue/test-utils';
import { setupRefs } from '@/components/VinDecoder/setup';
import VinDecoder from '@/components/VinDecoder/VinDecoder.vue';

const VALID_VIN = 'WVWDM7AJ1BW263846';

const mockGetResults = jest.fn().mockResolvedValue(true);

const factory = (options: any = {}) => {
  options.sync = false;
  return mount(VinDecoder, {
    setup: () => ({
      ...setupRefs(),
      getResults: mockGetResults
    }),
    stubs: ['vin-results'],
    ...options
  });
};

describe('VinDecoder Component Tests', () => {
  test('base component state, matches snapshot', () => {
    const wrapper = factory();
    expect(wrapper.element).toMatchSnapshot();
  });

  test('base component state, submission button is disabled', () => {
    const wrapper = factory();
    expect(wrapper.find('.btn__get-results').attributes().disabled).toEqual(
      'disabled'
    );
  });

  test('with valid VIN input, submission button is clickable, and getResults method is called with the input value', async () => {
    const wrapper = factory();

    wrapper.find('#VinDecoderInput').setValue(VALID_VIN);
    await wrapper.vm.$nextTick();

    wrapper.find('.btn__get-results').trigger('click');
    await wrapper.vm.$nextTick();

    expect(mockGetResults).toHaveBeenCalledWith(VALID_VIN);
  });
});
