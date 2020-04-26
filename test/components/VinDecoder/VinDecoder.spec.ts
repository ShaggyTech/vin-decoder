import { mount } from '@vue/test-utils';
import { VALIDATOR, setupRefs } from '@/components/VinDecoder/setup';
import VinDecoder from '@/components/VinDecoder/VinDecoder.vue';

const VALID_VIN = 'WVWDM7AJ1BW263846';

const refs = { ...setupRefs() };
const mockGetResults = jest.fn().mockResolvedValue(true);

const factory = (options: { [propName: string]: any } = {}) => {
  return mount(VinDecoder, {
    setup: () => ({
      ...refs,
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

  test('alertMessage Ref exists and has default value of `null`', async () => {
    const wrapper = factory();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.alertMessage).toBeDefined();
    expect(wrapper.vm.$data.alertMessage).toBe(null);
  });

  test('loading Ref exists and has default value of `false`', async () => {
    const wrapper = factory();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.loading).toBeDefined();
    expect(wrapper.vm.$data.loading).toBe(false);
  });

  test('rawResults Ref exists and has default value of `null`', async () => {
    const wrapper = factory();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.rawResults).toBeDefined();
    expect(wrapper.vm.$data.rawResults).toBe(null);
  });

  test('validator Ref exists and has default value equal to `VALIDATOR` constant', async () => {
    const wrapper = factory();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.validator).toBeDefined();
    expect(wrapper.vm.$data.validator).toEqual(VALIDATOR);
  });

  test('vin Ref exists and has default value of `null`', async () => {
    const wrapper = factory();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.vin).toBeDefined();
    expect(wrapper.vm.$data.vin).toBe(null);
  });

  test('vin Ref syncs with input value', async () => {
    const wrapper = factory();

    wrapper.find('#VinDecoderInput').setValue(VALID_VIN);

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.vin).toBe(VALID_VIN);
  });

  test('submission button is clickable with valid VIN input', async () => {
    const wrapper = factory();

    wrapper.find('#VinDecoderInput').setValue(VALID_VIN);

    await wrapper.vm.$nextTick();
    wrapper.find('.btn__get-results').trigger('click');

    await wrapper.vm.$nextTick();
    expect(mockGetResults).toHaveBeenCalledWith(VALID_VIN);
  });

  test('an alert is shown if there is an error (while getting results)', async () => {
    const wrapper = factory();

    const alertElement = wrapper.find('.decoder-card__alert');
    const alertMessageText = 'Oops! Something went wrong.';

    expect(alertElement.isVisible()).toBe(false);

    wrapper.setData({ alertMessage: alertMessageText });

    await wrapper.vm.$nextTick();
    expect(alertElement.isVisible()).toBe(true);
    expect(alertElement.text()).toContain(alertMessageText);
  });
});
