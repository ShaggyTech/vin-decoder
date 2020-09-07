import { state, mutations, HistoryItem } from '~/store/history.ts';

const {
  INITIALIZE_HISTORY_STORE,
  CLEAR_HISTORY,
  ADD_HISTORY_ITEM,
  DELETE_HISTORY_ITEM
} = mutations;

let mockState = { ...state() };
const mockHistory = [
  {
    VIN: 'WVWRF7AJ8DW036494',
    results: {
      Make: 'VOLKSWAGEN',
      Model: 'Golf R',
      ModelYear: '2013'
    }
  },
  {
    VIN: 'WAUCCGFFXF1027652',
    results: {
      Make: 'AUDI',
      Model: 'A3',
      ModelYear: '2015'
    }
  }
];
beforeEach(() => {
  mockState = { ...state() };
});

describe('mutations', () => {
  test('INITIALIZE_HISTORY_STORE', () => {
    // start with empty history
    expect(mockState.history).toEqual([]);
    // fill the history store (simulate hydrating from localStorage)
    INITIALIZE_HISTORY_STORE(mockState, mockHistory);
    expect(mockState.history).toEqual(mockHistory);
  });

  test('CLEAR_HISTORY', () => {
    // start with empty history
    expect(mockState.history).toEqual([]);
    // fill the history with mock items
    mockState.history = [...mockHistory] as HistoryItem[];
    expect(mockState.history).toEqual(mockHistory);

    // clear the history and restore to empty array
    CLEAR_HISTORY(mockState);
    expect(mockState.history).toEqual([]);
  });

  test('ADD_HISTORY_ITEM', () => {
    // start with empty history
    expect(mockState.history).toEqual([]);

    // add first history item
    ADD_HISTORY_ITEM(mockState, mockHistory[1] as HistoryItem);
    expect(mockState.history).toEqual([{ ...mockHistory[1] }]);
    // add second history item, should go to beginning of array
    ADD_HISTORY_ITEM(mockState, mockHistory[0] as HistoryItem);
    expect(mockState.history).toEqual(mockHistory);
    // should ignore and not add duplicate history items into the history array
    ADD_HISTORY_ITEM(mockState, mockHistory[0] as HistoryItem);
    expect(mockState.history).toEqual(mockHistory);
  });

  test('DELETE_HISTORY_ITEM', () => {
    // start with empty history
    expect(mockState.history).toEqual([]);
    // fill the history with mock items
    mockState.history = [...mockHistory] as HistoryItem[];
    expect(mockState.history).toEqual(mockHistory);

    // delete first history item
    DELETE_HISTORY_ITEM(mockState, mockHistory[0] as HistoryItem);
    expect(mockState.history).toEqual([{ ...mockHistory[1] }]);
    // delete second history item and expect empty array
    DELETE_HISTORY_ITEM(mockState, mockHistory[1] as HistoryItem);
    expect(mockState.history).toEqual([]);
    // attempt to delete an item that no longer exists
    DELETE_HISTORY_ITEM(mockState, mockHistory[0] as HistoryItem);
    expect(mockState.history).toEqual([]);
  });
});
