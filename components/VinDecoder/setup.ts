/* Composition API */
import { ref, Ref } from '@vue/composition-api';
/* Compositions */
import { getHistoryItemIndex } from '~/compositions/history';
/* Types */
import { Validator } from '@/types';
import { TypedVuexStore } from '@/store';

type Refs = {
  alertMessage: Ref<string | null>;
  loading: Ref<boolean>;
  rawResults: Ref<object | null>;
  validator: Ref<Validator>;
  vin: Ref<string | null>;
};

/* config for VIN input field's validation-provider */
const validator: Validator = {
  rules: { required: true, vin: true },
  immediate: false,
  vid: 'vin-input-validator',
  name: 'vin-input-validator',
  customMessages: {
    required: 'Please provide a VIN to decode.'
  }
};

const setupRefs = (): Refs => ({
  alertMessage: ref(null),
  loading: ref(false),
  rawResults: ref(null),
  validator: ref(validator),
  vin: ref(null)
});

const handleError = (err: any, refs: Refs): Error => {
  refs.rawResults.value = null;
  refs.alertMessage.value =
    'Oops! It seems an error occurred when fetching data from the API';
  refs.loading.value = false;

  return err;
};

const fetchResults = async (vinValue: string, refs: Refs) => {
  /* Fetch the results and handle any errors */
  const { DecodeVinValuesExtended } = await import(
    '@shaggytools/nhtsa-api-wrapper'
  );
  const Decoder = new DecodeVinValuesExtended();

  const response = await Decoder.DecodeVinValuesExtended(vinValue).catch(
    (err: Error): Error => handleError(err, refs)
  );

  if (
    !(response instanceof Error) &&
    response?.FetchResponse.ok &&
    response.Count > 0
  ) {
    return response.Results;
  } else {
    return null;
  }
};

export const initializeComponent = (store: TypedVuexStore) => {
  const refs = { ...setupRefs() };

  /* Component Method called when a valid VIN is submitted */
  const getResults = async (vinValue: string | null): Promise<void> => {
    if (typeof vinValue !== 'string') {
      return;
    }

    refs.alertMessage.value = null;
    refs.loading.value = true;

    /* Reduce API calls by returning previously decoded results from the history */
    const historyArray = store.history.history;
    const historyIndex = getHistoryItemIndex(vinValue, historyArray);

    if (historyIndex >= 0) {
      refs.loading.value = false;
      refs.rawResults.value = { ...historyArray[historyIndex].results };
      return;
    }

    /* Fetch the results using the nhtsa-api-wrapper */
    const results = await fetchResults(vinValue, refs);

    if (results && results[0]) {
      refs.loading.value = false;
      refs.rawResults.value = { ...results[0] };

      store.history.addHistoryItem({
        VIN: results[0].VIN,
        results: { ...results[0] }
      });
    }
  };

  return {
    ...refs,
    getResults
  };
};
