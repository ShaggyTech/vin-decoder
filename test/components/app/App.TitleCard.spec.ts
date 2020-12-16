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
          innerText: 'Heading',
          class: 'some-class',
        },
        subHeader: {
          innerText: 'Sub Heading',
          class: 'some-other-class',
        },
      },
    });
    // console.log(wrapper.vm);
    // expect(wrapper.vm.$el).toEqual('display-1');
    const header = wrapper.find('#header');
    console.log({ classList: header.element.classList });
    expect(wrapper.find('#header').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });
});
