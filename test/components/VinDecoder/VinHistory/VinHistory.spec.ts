import { mount } from '@vue/test-utils';
import VinHistory from '@/components/VinDecoder/VinHistory/VinHistory.vue';

const factory = (options: object) => {
  return mount(VinHistory, {
    ...options
  });
};

const getMocks = (history: Array<any> = []) => {
  return {
    $accessor: {
      history: {
        history,
        clearHistory() {
          return (this.history = []);
        }
      }
    }
  };
};

const mockHistory = [{ VIN: 'TESTVIN', results: { Make: 'VW' } }];

describe('VinHistory Component Tests', () => {
  test('component is invisible if history is empty', () => {
    const wrapper = factory({
      sync: false,
      mocks: { ...getMocks() }
    });

    expect(wrapper.vm.$el.textContent).toEqual('');
    expect(wrapper.element).toMatchSnapshot();
  });

  test('component is visible if history contains items', () => {
    const wrapper = factory({
      sync: false,
      mocks: { ...getMocks(mockHistory) }
    });

    expect(wrapper.find('.history-card').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  test('history can be cleared and component is invisible after clearing', async () => {
    const wrapper = factory({
      sync: false,
      mocks: { ...getMocks(mockHistory) }
    });

    // history exists
    expect(wrapper.vm.$accessor.history.history).toEqual(mockHistory);
    // component is visible
    expect(wrapper.find('.history-card').exists()).toBe(true);

    // Click the button triggering the clearHistory method
    wrapper.find('.btn__clear-history').trigger('click');
    await wrapper.vm.$nextTick();

    // history is cleared
    expect(wrapper.vm.$accessor.history.history).toEqual([]);
    // component is invisible after clearing
    expect(wrapper.vm.$el.textContent).toEqual('');

    expect(wrapper.element).toMatchSnapshot();
  });
});
