/* Composition API */
import { ref, Ref } from '@vue/composition-api';
/* Utilities */
import { fetchDecodeVinResults } from '@/utils/fetchDecodeVinResults';
import { handleError } from '@/utils/handleError';
/* Compositions */
import { getHistoryItemIndex } from '@/utils/getHistoryItemIndex';
/* Types */
import { DecodeVinValuesExtendedResults, Validator } from '@/types';
import { TypedVuexStore } from '@/store';

export type Refs = {
  alertMessage: Ref<string | null>;
  loading: Ref<boolean>;
  rawResults: Ref<object | null>;
  validator: Ref<Validator>;
  vin: Ref<string | null>;
};

/* config for VIN input field's validation-provider */
export const VALIDATOR: Validator = {
  rules: { required: true, vin: true },
  immediate: false,
  vid: 'vin-input-validator',
  name: 'vin-input-validator',
  customMessages: {
    required: 'Please provide a VIN to decode.'
  }
};

export const setupRefs = (): Refs => ({
  alertMessage: ref(null),
  loading: ref(false),
  rawResults: ref(null),
  validator: ref(VALIDATOR),
  vin: ref(null)
});

export const initializeComponent = (store: TypedVuexStore) => {
  /* All refs necessary for this component */
  const refs = { ...setupRefs() };

  /* Method called when a valid VIN is submitted */
  const getResults = async (
    vinValue: string | null
  ): Promise<DecodeVinValuesExtendedResults | void> => {
    /* Runtime type check */
    if (!vinValue || typeof vinValue !== 'string') {
      return;
    }

    /* Preparation */
    refs.loading.value = true;
    refs.alertMessage.value = null;

    /* Reduce API calls by returning previously decoded results from the history */
    const historyArray = store.history.history;
    const historyIndex = getHistoryItemIndex(vinValue, historyArray);
    if (historyIndex >= 0) {
      refs.loading.value = false;
      refs.rawResults.value = { ...historyArray[historyIndex].results };
      return {
        ...historyArray[historyIndex].results
      };
    }

    /* Fetch the results using the nhtsa-api-wrapper */
    const results: DecodeVinValuesExtendedResults = await fetchDecodeVinResults(
      vinValue
    ).catch(err => err);

    /* Handle any errors */
    if (results instanceof Error) {
      const errMsg =
        'Oops! It seems an error occurred when fetching data from the API';

      refs.rawResults.value = null;
      refs.alertMessage.value = errMsg;
      refs.loading.value = false;

      return handleError(results as Error, errMsg);
    }

    /* Extract and distribute the results */
    refs.rawResults.value = { ...results };
    store.history.addHistoryItem({
      VIN: results.VIN,
      results: { ...results }
    });

    /* Cleanup */
    refs.loading.value = false;
    return results;
  };

  return {
    ...refs,
    getResults
  };
};
