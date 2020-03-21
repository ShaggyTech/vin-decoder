<script lang="ts">
/* Composition API */
import { defineComponent, ref, watch, Ref } from '@vue/composition-api';
/* Vee-Validate */
import { ValidationObserver } from 'vee-validate';
/* NHTSA API Wrapper */
import { DecodeVinValues } from '@shaggytools/nhtsa-api-wrapper';
/* Utility Methods */
import { filterResults } from '@/utils/filterResults';
/* Components */
import VinInput from '@/components/VinDecoder/VinInput/VinInput.vue';
/* Types */
import { Validator } from '@/types';

const setupVinDecoder = (): object => {
  const validator: Validator = {
    rules: { required: true, vin: true },
    immediate: false,
    vid: 'vin-input-validator',
    name: 'vin-input-validator',
    customMessages: {
      required: 'Please provide a VIN to decode.'
    }
  };

  const rawResults: Ref<object | null> = ref(null);
  const results: Ref<object | null> = ref(null);
  const vin: Ref<string | null> = ref(null);
  const alertMessage: Ref<string | null> = ref(null);
  const showAlert: Ref<boolean> = ref(false);

  watch(
    rawResults,
    rawResults =>
      (results.value = rawResults ? filterResults(rawResults) : null)
  );

  const handleError = (err: any) => {
    rawResults.value = null;
    alertMessage.value = `Oops! It seems an error occurred when fetching data from the API. - ${err}`;
    showAlert.value = true;
    return err;
  };

  const getResults = async (vinValue: string) => {
    showAlert.value = false;

    const Decoder = new DecodeVinValues();
    const { Results } = await Decoder.DecodeVinValues(
      vinValue
    ).catch((err: Error) => handleError(err));

    if (Results?.[0]) {
      showAlert.value = false;
      rawResults.value = Results[0];
    }
  };

  return {
    results,
    rawResults,
    vin,
    alertMessage,
    validator,
    getResults,
    showAlert
  };
};

export default defineComponent({
  name: 'VinDecoder',
  components: { ValidationObserver, VinInput },

  setup() {
    return { ...setupVinDecoder() };
  }
});
</script>

<template>
  <validation-observer v-slot="{ invalid }" slim>
    <v-card>
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
        <vin-input
          id="VinDecoder"
          v-model="vin"
          :validator="validator"
          counter="17"
          clearable
          outlined
          @click:clear="rawResults = null"
          @input="rawResults = null"
        />
        <div>VIN: {{ vin }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          block
          :disabled="invalid"
          @click.prevent="getResults(vin)"
        >
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="results && !invalid">
      <v-card-title class="headline">
        Results
      </v-card-title>
      <p v-if="results">{{ results }}</p>
    </v-card>
  </validation-observer>
</template>
