/* Composition API */
import { ref, Ref } from '@vue/composition-api';
/* Compositions */
import { historySetup, getHistoryItemIndex } from '~/compositions/history';
/* Types */
import { Validator } from '@/types';
import { TypedVuexStore } from '@/store';

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

type Refs = {
  vin: Ref<string | null>;
  rawResults: Ref<object | null>;
  loading: Ref<boolean>;
  alertMessage: Ref<string | null>;
  showAlert: Ref<boolean>;
  validator: Ref<Validator>;
};

const handleError = (err: any, refs: Refs) => {
  refs.rawResults.value = null;
  refs.alertMessage.value = `Oops! It seems an error occurred when fetching data from the API. - ${err}`;
  refs.showAlert.value = true;
  refs.loading.value = false;
  return err;
};

const setupRefs = (): Refs => ({
  vin: ref(null),
  rawResults: ref(null),
  loading: ref(false),
  alertMessage: ref(null),
  showAlert: ref(false),
  validator: ref(validator)
});

const fetchResults = async (vinValue: string, refs: Refs) => {
  /* Fetch the results and handle any errors */
  const { DecodeVinValuesExtended } = await import(
    '@shaggytools/nhtsa-api-wrapper'
  );
  const Decoder = new DecodeVinValuesExtended();

  const { Results } = await Decoder.DecodeVinValuesExtended(
    vinValue
  ).catch((err: Error) => handleError(err, refs));

  return Results;
};

export const initializeComponent = (store: TypedVuexStore) => {
  const refs = { ...setupRefs() };

  const historyMixin: ReturnType<typeof historySetup> = {
    ...historySetup(store)
  };

  /* Component Method called when a valid VIN is submitted */
  const getResults = async (vinValue: string) => {
    refs.showAlert.value = false;
    refs.loading.value = true;

    /* Reduce API calls by returning previously decoded results from the history */
    const historyArray = store.history.history;
    const historyIndex = getHistoryItemIndex(vinValue, historyArray);
    if (historyIndex >= 0) {
      refs.rawResults.value = { ...historyArray[historyIndex].results };
      refs.loading.value = false;
      return;
    }

    /* Fetch the results using the nhtsa-api-wrapper */
    const Results = await fetchResults(vinValue, refs).catch((err: Error) =>
      handleError(err, refs)
    );

    /* Add the results to the Vuex store history array as well as rawResults ref */
    if (Results?.[0]) {
      refs.showAlert.value = false;

      historyMixin.addHistoryItem({
        VIN: Results[0]?.VIN,
        results: { ...Results[0] }
      });
      refs.rawResults.value = { ...Results[0] };

      refs.loading.value = false;
    } else {
      const err = new Error(
        `Undefined -or- invalid results returned from the NHTSA API, got results of ${Results}`
      );
      handleError(err, refs);
    }
  };

  return {
    ...refs,
    ...historyMixin,
    getResults
  };
};
