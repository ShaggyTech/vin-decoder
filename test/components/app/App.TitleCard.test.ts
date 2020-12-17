// import flushPromises from 'flush-promises';

import { mount } from '@vue/test-utils';

import AppTitleCard from '@/components/app/TitleCard.vue';

const factory = (options: { [propName: string]: any } = {}) => {
  return mount(AppTitleCard, {
    ...options,
  });
};

describe('AppTitleCard Component Tests', () => {
  // let wrapper: ReturnType<typeof factory>;

  test('base component state, matches snapshot', () => {
    const wrapper = factory({
      sync: false,
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  test('Props "header" and "subheader"', () => {
    const wrapper = factory({
      sync: false,
      propsData: {
        header: {
          innerText: 'This is a heading',
          class: 'some-class',
        },
        subHeader: {
          innerText: 'This is a sub-heading',
          class: 'some-other-class',
        },
      },
    });

    /* innerText and class are bound to id#Header element */
    expect(wrapper.find('#Header').text()).toBe('This is a heading');
    expect(wrapper.find('#Header').classes()).toContain('some-class');

    /* innerText and class are bound to id#SubHeader element  */
    expect(wrapper.find('#SubHeader').text()).toBe('This is a sub-heading');
    expect(wrapper.find('#SubHeader').classes()).toContain('some-other-class');

    expect(wrapper.element).toMatchSnapshot();
  });
});
