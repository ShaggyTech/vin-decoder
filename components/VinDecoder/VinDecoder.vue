<script lang="ts">
/* Composition API */
import { defineComponent, computed, ref } from '@vue/composition-api';
/* Vee-Validate */
import { ValidationObserver } from 'vee-validate';
/* Vuex Types */
import { Store } from 'vuex';
import { StoreStateRoot, HistoryItem } from '@/types/store';
/* Vuex Store Provide and Use */
import { provideStore, useStore } from '@/composables/provide-use-store';
/* Components */
import BaseInputWithValidation from '@/components/base/BaseInputWithValidation.vue';
import VinResults from '@/components/VinDecoder/VinResults/VinResults.vue';
import VinHistory from '@/components/VinDecoder/VinHistory/VinHistory.vue';
/* App Types */
import { Validator } from '@/types';

const setupVinDecoder = (storeContext: Store<StoreStateRoot>): object => {
  const validator: Validator = {
    rules: { required: true, vin: true },
    immediate: false,
    vid: 'vin-input-validator',
    name: 'vin-input-validator',
    customMessages: {
      required: 'Please provide a VIN to decode.'
    }
  };

  const vin = ref<string | null>(null);
  const rawResults = ref<object | null>(null);

  const loading = ref<boolean>(false);

  const alertMessage = ref<string | null>(null);
  const showAlert = ref<boolean>(false);

  const handleError = (err: any) => {
    rawResults.value = null;
    alertMessage.value = `Oops! It seems an error occurred when fetching data from the API. - ${err}`;
    showAlert.value = true;
    loading.value = false;
    return err;
  };

  /* Vuex Setup */
  provideStore(storeContext);
  const store = useStore() as Store<StoreStateRoot>;

  /* History Setup */
  const history = computed(() => [...store.state.history]);

  /* Used to add an item to the store 'history' array */
  const addHistoryItem = (item: HistoryItem) => {
    store.dispatch('addHistoryItem', item);
  };
  /* Returns the index if the given history item exists, or -1 if it does not exist */
  const getHistoryItemIndex = (vinValue: string): number => {
    const isExisting = (historyItem: HistoryItem) => {
      return vinValue === historyItem.VIN;
    };
    return history.value.findIndex(isExisting);
  };

  /* Called when a valid VIN is submitted */
  const getResults = async (vinValue: string) => {
    showAlert.value = false;
    loading.value = true;

    /* Reduce API calls by returning previously decoded results from the history */
    const historyIndex = getHistoryItemIndex(vinValue);
    if (historyIndex >= 0) {
      rawResults.value = { ...history.value[historyIndex].results };
      loading.value = false;
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
      showAlert.value = false;
      addHistoryItem({
        VIN: Results[0]?.VIN,
        results: { ...Results[0] }
      });
      rawResults.value = { ...Results[0] };
      loading.value = false;
    } else {
      const err = new Error(
        `Undefined -or- invalid results returned from the NHTSA API, got results of ${Results}`
      );
      handleError(err);
    }
  };

  return {
    history,
    validator,
    vin,
    rawResults,
    loading,
    alertMessage,
    showAlert,
    getResults
  };
};

export default defineComponent({
  name: 'VinDecoder',
  components: {
    ValidationObserver,
    BaseInputWithValidation,
    VinResults,
    VinHistory
  },

  setup(_, { root: { $store } }) {
    return { ...setupVinDecoder($store) };
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
        class="primary darken-4"
      />
    </v-card>

    <vin-history />
  </validation-observer>
</template>
