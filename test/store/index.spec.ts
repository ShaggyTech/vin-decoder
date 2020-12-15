import { getters, state, mutations, actions } from '~/store';

// destructure assign `mutations`
const { SET_COUNTER, SET_DRAWER, SET_RIGHT_DRAWER } = mutations;
const { increment, setDrawer, setRightDrawer } = actions;
let mockState = state();

beforeEach(() => {
  mockState = { ...state() };
});

describe('getters', () => {
  test('message', () => {
    let message = getters.message(mockState);
    expect(message).toEqual('The count is: 0!');

    mockState.counter = 24;
    message = getters.message(mockState);
    expect(message).toEqual('The count is: 24!');
  });
});

describe('mutations', () => {
  test('SET_COUNTER', () => {
    expect(mockState.counter).toEqual(0);
    SET_COUNTER(mockState, 24);
    expect(mockState.counter).toEqual(24);
  });

  test('SET_DRAWER', () => {
    // default state, drawer closed
    expect(mockState.drawer).toEqual(false);
    // set drawer open
    SET_DRAWER(mockState, true);
    expect(mockState.drawer).toEqual(true);
    // set drawer closed
    SET_DRAWER(mockState, false);
    expect(mockState.drawer).toEqual(false);
  });

  test('SET_RIGHT_DRAWER', () => {
    // default state, drawer closed
    expect(mockState.rightDrawer).toEqual(false);
    // set rightDrawer open
    SET_RIGHT_DRAWER(mockState, true);
    expect(mockState.rightDrawer).toEqual(true);
    // set rightDrawer closed
    SET_RIGHT_DRAWER(mockState, false);
    expect(mockState.rightDrawer).toEqual(false);
  });
});

describe('actions', () => {
  test('increment', () => {
    const context = {
      state: mockState,
      commit: jest.fn()
    };

    (increment as Function)(context);
    expect(context.commit).toHaveBeenCalledWith('SET_COUNTER', 1);

    mockState.counter++;
    (increment as Function)(context);
    expect(context.commit).toHaveBeenCalledWith('SET_COUNTER', 2);

    mockState.counter = 22;
    (increment as Function)(context);
    expect(context.commit).toHaveBeenCalledWith('SET_COUNTER', 23);
  });

  test('setDrawer', () => {
    const context = {
      state: mockState,
      commit: jest.fn()
    };

    (setDrawer as Function)(context, true);
    expect(context.commit).toHaveBeenCalledWith('SET_DRAWER', true);

    (setDrawer as Function)(context, false);
    expect(context.commit).toHaveBeenCalledWith('SET_DRAWER', false);
  });

  test('setRightDrawer', () => {
    const context = {
      state: mockState,
      commit: jest.fn()
    };

    (setRightDrawer as Function)(context, true);
    expect(context.commit).toHaveBeenCalledWith('SET_RIGHT_DRAWER', true);

    (setRightDrawer as Function)(context, false);
    expect(context.commit).toHaveBeenCalledWith('SET_RIGHT_DRAWER', false);
  });
});
