import { mount } from '@vue/test-utils';
/* Component Setup Functions */
import { VALIDATOR, setupRefs } from '~/components/VinDecoder';
/* Component */
import VinDecoderCard from '~/components/VinDecoder/Card.vue';

const VALID_VIN = 'WVWDM7AJ1BW263846';

const refs = { ...setupRefs() };
const mockGetResults = jest.fn().mockResolvedValue(true);

const factory = (options: { [propName: string]: any } = {}) => {
  return mount(VinDecoderCard, {
    setup: () => ({
      ...refs,
      getResults: mockGetResults,
    }),
    stubs: ['vin-results'],
    ...options,
  });
};

describe('VinDecoderCard Component Tests', () => {
  let wrapper: ReturnType<typeof factory>;

  beforeEach(() => (wrapper = factory()));

  test('base component state, matches snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('base component state, submission button is disabled', () => {
    expect(wrapper.find('.btn__get-results').attributes().disabled).toEqual(
      'disabled'
    );
  });

  test('alertMessage Ref exists and has default value of `null`', () => {
    expect(wrapper.vm.$data.alertMessage).toBeDefined();
    expect(wrapper.vm.$data.alertMessage).toBe(null);
  });

  test('loading Ref exists and has default value of `false`', () => {
    expect(wrapper.vm.$data.loading).toBeDefined();
    expect(wrapper.vm.$data.loading).toBe(false);
  });

  test('rawResults Ref exists and has default value of `null`', () => {
    expect(wrapper.vm.$data.rawResults).toBeDefined();
    expect(wrapper.vm.$data.rawResults).toBe(null);
  });

  test('validator Ref exists and has default value equal to `VALIDATOR` constant', () => {
    expect(wrapper.vm.$data.validator).toBeDefined();
    expect(wrapper.vm.$data.validator).toEqual(VALIDATOR);
  });

  test('vin Ref exists and has default value of `null`', () => {
    expect(wrapper.vm.$data.vin).toBeDefined();
    expect(wrapper.vm.$data.vin).toBe(null);
  });

  test('vin Ref syncs with input value', async () => {
    wrapper.find('#VinDecoderInput').setValue(VALID_VIN);

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.vin).toBe(VALID_VIN);
  });

  test('submission button is clickable with valid VIN input', async () => {
    wrapper.find('#VinDecoderInput').setValue(VALID_VIN);

    await wrapper.vm.$nextTick();
    wrapper.find('.btn__get-results').trigger('click');

    await wrapper.vm.$nextTick();
    expect(mockGetResults).toHaveBeenCalledWith(VALID_VIN);
  });

  test('an alert is shown if there is an error (while getting results)', async () => {
    const alertElement = wrapper.find('.decoder-card__alert');
    const alertMessageText = 'Oops! Something went wrong.';

    expect(alertElement.element).not.toBeVisible();

    wrapper.setData({ alertMessage: alertMessageText });

    await wrapper.vm.$nextTick();
    expect(alertElement.element).toBeVisible();
    expect(alertElement.text()).toContain(alertMessageText);
  });
});
