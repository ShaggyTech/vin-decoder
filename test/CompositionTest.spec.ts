import { shallowMount } from '@vue/test-utils';
import CompositionTest from '@/components/CompositionTest.vue';
import { User } from '@/types';

describe('Composition Test', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(CompositionTest, {
      propsData: {
        user: {
          firstName: 'Shaggy',
          lastName: 'Tech'
        } as User
      }
    });
    // or // wrapper.setProps({ user: { firstName: 'Shaggy', lastName: 'Tech' } });
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.text()).toBe(
      'Name: Shaggy Tech, Message: This is a message'
    );
  });
});
