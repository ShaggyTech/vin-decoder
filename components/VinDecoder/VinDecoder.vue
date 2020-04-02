<script lang="ts">
/* Composition API */
import { defineComponent, computed, ref, Ref } from '@vue/composition-api';
/* Vee-Validate */
import { ValidationObserver } from 'vee-validate';
/* Types */
import { Validator } from '@/types';
import { accessorType } from '@/store';
import { HistoryItem } from '@/store/history';

/* Components */
import BaseInputWithValidation from '@/components/base/BaseInputWithValidation.vue';
import VinResults from '@/components/VinDecoder/VinResults/VinResults.vue';
import VinHistory from '@/components/VinDecoder/VinHistory/VinHistory.vue';

type Refs = {
  vin: Ref<string | null>;
  rawResults: Ref<object | null>;
  loading: Ref<boolean>;
  alertMessage: Ref<string | null>;
  showAlert: Ref<boolean>;
};

interface SetupContext {
  refs: Refs;
  history: any; // TODO: figure out how to correctly type computed properties
  getHistoryItemIndex: (vinValue: string) => number;
  addHistoryItem: (item: HistoryItem) => void;
}

const setupRefs = (): Refs => ({
  vin: ref(null),
  rawResults: ref(null),

  loading: ref(false),
  alertMessage: ref(null),
  showAlert: ref(false)
});

const setupHistory = (store: typeof accessorType) => ({
  /* History Setup */
  history: computed(() => [...store.history.history]),

  /* Used to add an item to the store 'history' array */
  addHistoryItem: (item: HistoryItem): void => {
    store.history.addHistoryItem(item);
  },

  /* Returns the index if the given history item exists, or -1 if it does not exist */
  getHistoryItemIndex: (vinValue: string): number => {
    const isExistingItem = (historyItem: HistoryItem) => {
      return vinValue === historyItem.VIN;
    };
    return store.history.history.findIndex(isExistingItem);
  }
});

const setupVinDecoder = ({
  addHistoryItem,
  getHistoryItemIndex,
  history,
  refs
}: SetupContext) => {
  const handleError = (err: any) => {
    refs.rawResults.value = null;
    refs.alertMessage.value = `Oops! It seems an error occurred when fetching data from the API. - ${err}`;
    refs.showAlert.value = true;
    refs.loading.value = false;
    return err;
  };

  /* Called when a valid VIN is submitted */
  const getResults = async (vinValue: string) => {
    refs.showAlert.value = false;
    refs.loading.value = true;

    /* Reduce API calls by returning previously decoded results from the history */
    const historyIndex = getHistoryItemIndex(vinValue);
    if (historyIndex >= 0) {
      refs.rawResults.value = { ...history.value[historyIndex].results };
      refs.loading.value = false;
      return;
    }

    /* Fetch the results and handle any errors */
    const { DecodeVinValuesExtended } = await import(
      '@shaggytools/nhtsa-api-wrapper'
    );
    const Decoder = new DecodeVinValuesExtended();
    const { Results } = await Decoder.DecodeVinValuesExtended(
      vinValue
    ).catch((err: Error) => handleError(err));

    /* Add the results to the Vuex store history array as well as rawResults ref */
    if (Results?.[0]) {
      refs.showAlert.value = false;
      addHistoryItem({
        VIN: Results[0]?.VIN,
        results: { ...Results[0] }
      });
      refs.rawResults.value = { ...Results[0] };
      refs.loading.value = false;
    } else {
      const err = new Error(
        `Undefined -or- invalid results returned from the NHTSA API, got results of ${Results}`
      );
      handleError(err);
    }
  };

  const validator: Validator = {
    rules: { required: true, vin: true },
    immediate: false,
    vid: 'vin-input-validator',
    name: 'vin-input-validator',
    customMessages: {
      required: 'Please provide a VIN to decode.'
    }
  };

  return {
    getResults,
    history,
    ...refs,
    validator
  };
};

export default defineComponent({
  name: 'VinDecoder',
  components: {
    BaseInputWithValidation,
    ValidationObserver,
    VinHistory,
    VinResults
  },

  setup(_, { root: { $accessor } }) {
    const refs = { ...setupRefs() };
    const historySetup = setupHistory($accessor);

    return {
      ...setupVinDecoder({
        ...historySetup,
        refs
      })
    };
  }
});
</script>

<template>
  <validation-observer v-slot="{ invalid }" slim>
    <v-card elevation="8" max-width="600" class="mx-auto">
      <v-alert :value="showAlert" type="error" dense>{{
        alertMessage
      }}</v-alert>
      <v-card-title class="headline">
        VIN Decoder
      </v-card-title>
      <v-card-text>
        <p>
          Enter your VIN to decode useful information about your vehicle.
        </p>
        <base-input-with-validation
          id="VinDecoderInput"
          v-model="vin"
          :validator="validator"
          counter="17"
          clearable
          outlined
          @click:clear="rawResults = null"
          @input="rawResults = null"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="mx-auto my-4"
          color="success"
          :disabled="!vin || invalid"
          block
          @click.prevent="getResults(vin)"
        >
          Decode VIN
        </v-btn>
      </v-card-actions>
      <vin-results
        :raw-results.sync="rawResults"
        :loading.sync="loading"
        max-width="600"
        color="primary darken-4"
      />
    </v-card>

    <vin-history />
  </validation-observer>
</template>
