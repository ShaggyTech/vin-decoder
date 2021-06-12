/**
 * @jest-environment jsdom
 */

import flushPromises from 'flush-promises';

import { mount } from '@vue/test-utils';

import BaseInputWithValidation from '@/components/base/InputWithValidation.vue';
import { Validator } from '@/types';

const factory = (options: object) => {
  return mount(BaseInputWithValidation, {
    ...options,
  });
};

const validator: Validator = {
  rules: { required: true },
  immediate: false,
  vid: 'test-input-validator',
  name: 'test-input-validator',
  customMessages: {
    required: 'test input is required',
  },
};

describe('BaseInputWithValidation Component Tests', () => {
  let wrapper: ReturnType<typeof factory>;

  beforeEach(() => {
    wrapper = factory({
      sync: false,
      propsData: {
        id: 'TestInput',
      },
    });
  });

  test('it watches for input changes and emits "input" event with newest value', async () => {
    expect(wrapper.emitted().input?.[1]).toEqual(undefined);
    wrapper.find('#TestInput').setValue('testing');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input?.[0]).toEqual(['testing']);
  });

  test('if props.toUpperCase is set to true, input is transformed to uppercase', async () => {
    wrapper.setProps({ toUpperCase: true });
    expect(wrapper.emitted().input?.[1]).toEqual(undefined);
    wrapper.find('#TestInput').setValue('tes!)#)@"}{ting!.,;');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input?.[0]).toEqual(['TES!)#)@"}{TING!.,;']);
  });

  test('validation-provider binds validator prop and does not inherit $attrs', async () => {
    wrapper.setProps({ validator, id: 'InputId' });
    await wrapper.vm.$nextTick();

    const providerEl = wrapper.find('#validator');
    expect(providerEl.props('validator')).toEqual(validator);

    const inputEl = wrapper.find('#InputId');
    expect(inputEl.attributes().id).toEqual('InputId');
  });

  test('shows success on validation success', async () => {
    wrapper.setProps({ validator });
    await wrapper.vm.$nextTick();

    const providerEl = wrapper.find('#validator');
    expect(providerEl.props('validator')).toEqual(validator);

    expect(wrapper.find('.success--text').exists()).toBe(false);
    wrapper.find('#TestInput').setValue('test value');
    // flush the pending validation.
    await flushPromises();
    // Check if the input shows successful validation.
    expect(wrapper.find('.success--text').exists()).toBe(true);
  });

  test('shows error message on validation failure', async () => {
    wrapper.setProps({ validator });
    wrapper.find('#TestInput').setValue('');
    // flush the pending validation.
    await flushPromises();
    // Check if error message is showing.
    const el = wrapper.find('.v-messages__message');
    expect(el.text()).toBe('test input is required');
  });
});
