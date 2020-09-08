import { getters, state, mutations } from '~/store';

// destructure assign `mutations`
const { SET_COUNTER, SET_DRAWER, SET_RIGHT_DRAWER } = mutations;
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
