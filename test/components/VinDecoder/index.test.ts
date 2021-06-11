import { isRef } from '@nuxtjs/composition-api';
/* Component Setup Functions */
import {
  Refs,
  VALIDATOR,
  setupRefs,
  initializeComponent,
} from '~/components/VinDecoder';
/* Mock API Data */
import { mockRawResults } from '~/test/__mocks__/mockDecodeVinValuesExtendedResults';
/* Utility modules we want to mock via jest.spyon() */
import * as moduleFetchDecodeVinResults from '~/utils/fetchDecodeVinResults';
import * as moduleGetHistoryItemIndex from '~/utils/getHistoryItemIndex';
import * as moduleHandleError from '~/utils/handleError';
/* Types */
import {
  DecodeVinValuesExtendedResults,
  HistoryItem,
  TypedVuexStore,
} from '~/types';

/* Mock history vuex store module */
const useMockStore = (history: HistoryItem[]): unknown => {
  // eslint-disable-next-line prefer-const
  let history_ = history;
  return {
    history: {
      history: (() => history_)(),
      addHistoryItem: jest.fn().mockImplementation((item) => {
        history_.unshift(item);
      }),
    },
  };
};

const mockItem = {
  VIN: 'TESTVIN',
  results: mockRawResults,
};

describe('Module: Setup composition module for VinDecoder component', () => {
  test('VALIDATOR constant export exists', () => {
    expect(VALIDATOR).toBeDefined();
    expect(typeof VALIDATOR).toEqual('object');
  });

  describe('setupRefs exported method', () => {
    test('export exists and is of type function', () => {
      expect(setupRefs).toBeDefined();
      expect(typeof setupRefs).toEqual('function');
    });

    let refs: Refs;

    beforeEach(() => (refs = { ...setupRefs() }));

    test('returns object containing alertMessage ref with a default value of null', () => {
      expect(refs).toBeDefined();
      expect(refs.alertMessage).toBeDefined();
      expect(isRef(refs.alertMessage)).toBe(true);
      expect(refs.alertMessage.value).toEqual(null);
    });

    test('returns object containing loading ref of type boolean and a default value of false', () => {
      expect(refs).toBeDefined();
      expect(typeof refs.loading.value).toEqual('boolean');
      expect(isRef(refs.loading)).toBe(true);
      expect(refs.loading.value).toEqual(false);
    });

    test('returns object containing rawResults ref with a default value of null', () => {
      expect(refs).toBeDefined();
      expect(refs.rawResults).toBeDefined();
      expect(isRef(refs.rawResults)).toBe(true);
      expect(refs.rawResults.value).toEqual(null);
    });

    test('returns object containing validator ref with a default value equal to VALIDATOR constant', () => {
      expect(refs).toBeDefined();
      expect(refs.validator).toBeDefined();
      expect(isRef(refs.validator)).toBe(true);
      expect(refs.validator.value).toEqual(VALIDATOR);
    });

    test('returns object containing vin ref with a default value of null', () => {
      expect(refs).toBeDefined();
      expect(refs.vin).toBeDefined();
      expect(isRef(refs.vin)).toBe(true);
      expect(refs.rawResults.value).toEqual(null);
    });
  });

  describe('initializeComponent exported method', () => {
    let store: TypedVuexStore;
    const componentSetup = (history: Array<any>) => {
      store = useMockStore(history) as TypedVuexStore;
      return initializeComponent(store);
    };

    test('export exists and is of type function', () => {
      expect(initializeComponent).toBeDefined();
      expect(typeof initializeComponent).toEqual('function');
    });

    test('returns an object containing all applicable refs', () => {
      const { alertMessage, loading, rawResults, validator, vin } =
        componentSetup([]);

      expect(alertMessage).toBeDefined();
      expect(isRef(alertMessage)).toBe(true);

      expect(loading).toBeDefined();
      expect(isRef(loading)).toBe(true);

      expect(rawResults).toBeDefined();
      expect(isRef(rawResults)).toBe(true);

      expect(validator).toBeDefined();
      expect(isRef(validator)).toBe(true);

      expect(vin).toBeDefined();
      expect(isRef(vin)).toBe(true);
    });

    test('returns an object containing getResults method', () => {
      const component = componentSetup([]);
      expect(component.getResults).toBeDefined();
      expect(typeof component.getResults === 'function').toBe(true);
    });

    describe('getResults component method', () => {
      const spyFetchDecodeVinResults = jest.spyOn(
        moduleFetchDecodeVinResults,
        'fetchDecodeVinResults'
      );
      const spyGetHistoryItemIndex = jest.spyOn(
        moduleGetHistoryItemIndex,
        'getHistoryItemIndex'
      );

      jest
        .spyOn(moduleHandleError, 'handleError')
        .mockImplementation(() => undefined);

      beforeEach(() => {
        jest.clearAllMocks();
      });

      test('handles invalid or no vin argument', async () => {
        const { getResults, rawResults } = componentSetup([]);
        let results = await getResults(null);
        expect(results).toBeUndefined();
        expect(rawResults.value).toEqual(null);

        results = await getResults('');
        expect(results).toBeUndefined();
        expect(rawResults.value).toEqual(null);
      });

      test('handles valid vin argument', async () => {
        const { getResults, rawResults, loading, alertMessage } =
          componentSetup([]);

        spyGetHistoryItemIndex.mockImplementationOnce(() => -1);
        spyFetchDecodeVinResults.mockImplementationOnce(() =>
          Promise.resolve(mockRawResults as DecodeVinValuesExtendedResults)
        );

        /* rawResults should be null to start */
        expect(rawResults.value).toEqual(null);
        /* get the mock results */
        const results = await getResults(mockItem.VIN);
        expect(results).toEqual(mockItem.results);
        /* rawResults ref should now be equal to the results */
        expect(rawResults.value).toEqual(mockItem.results);
        /* loading and alertMessage refs should always return to default state at the end of the function */
        expect(loading.value).toBe(false);
        expect(alertMessage.value).toBe(null);
        /* verify item was added to the history store */
        expect(store.history.addHistoryItem).toHaveBeenCalledWith(mockItem);
        expect(store.history.history).toEqual([mockItem]);
      });

      test('handles errors from API', async () => {
        const { getResults, rawResults, loading, alertMessage } =
          componentSetup([]);

        spyGetHistoryItemIndex.mockImplementationOnce(() => -1);
        spyFetchDecodeVinResults.mockImplementationOnce(() =>
          Promise.reject(
            new Error('Sorry, no results were found or an error occurred')
          )
        );

        /* rawResults should be null to start */
        expect(rawResults.value).toEqual(null);
        /* simulate an error via __mocks__/@shaggytools/nhtsa-api-wrapper */
        const results = await getResults('mock error');
        /* getResults should gracefully return undefined */
        expect(results).toEqual(undefined);
        /* rawResults ref should not have changed */
        expect(rawResults.value).toEqual(null);
        /* loading ref should always return to default state of false */
        expect(loading.value).toBe(false);
        /* alertMessage should now be a string letting the user know what happened */
        expect(typeof alertMessage.value === 'string').toBe(true);
        /* verify nothing was added to the history store */
        expect(store.history.addHistoryItem).toHaveBeenCalledTimes(0);
        expect(store.history.history.length).toEqual(0);
      });

      test('handles errors from fetchDecodeVinResults util method', async () => {
        const { getResults, rawResults, loading, alertMessage } =
          componentSetup([]);

        spyFetchDecodeVinResults.mockImplementationOnce(() =>
          Promise.reject(
            new Error('Sorry, no results were found or an error occurred')
          )
        );
        spyGetHistoryItemIndex.mockImplementationOnce(() => -1);

        /* rawResults should be null to start */
        expect(rawResults.value).toEqual(null);
        /* simulate an error via __mocks__/@shaggytools/nhtsa-api-wrapper */
        const results = await getResults('mock empty response');
        /* getResults should gracefully return undefined */
        expect(results).toEqual(undefined);
        /* rawResults ref should not have changed */
        expect(rawResults.value).toEqual(null);
        /* loading ref should always return to default state of false */
        expect(loading.value).toBe(false);
        /* alertMessage should now be a string letting the user know what happened */
        expect(typeof alertMessage.value === 'string').toBe(true);
        /* verify nothing was added to the history store */
        expect(store.history.addHistoryItem).toHaveBeenCalledTimes(0);
        expect(store.history.history.length).toEqual(0);
      });

      test('retrieves existing item from the store before making unnecessary API calls ', async () => {
        const { getResults, rawResults, loading, alertMessage } =
          componentSetup([mockItem]);

        spyGetHistoryItemIndex.mockImplementationOnce(() => 0);

        /* rawResults should be null to start */
        expect(rawResults.value).toEqual(null);
        /* get mock results */
        const results = await getResults(mockItem.VIN);
        /* getResults should gracefully return existing */
        expect(results).toEqual(mockItem.results);
        /* rawResults ref should not have changed */
        expect(rawResults.value).toEqual(mockItem.results);
        /* loading and alertMessage refs should always return to default state of false */
        expect(loading.value).toBe(false);
        expect(alertMessage.value).toEqual(null);
        /* verify nothing was added to the history store */
        expect(store.history.addHistoryItem).toHaveBeenCalledTimes(0);
        expect(store.history.history).toEqual([mockItem]);
      });
    });
  });
});
