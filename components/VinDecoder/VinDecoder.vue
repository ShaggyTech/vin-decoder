<script lang="ts">
/* Composition API */
import { defineComponent, ref } from '@vue/composition-api';
/* Vee-Validate */
import { ValidationObserver } from 'vee-validate';
/* Components */
import BaseInputWithValidation from '@/components/base/BaseInputWithValidation.vue';
import VinResults from '@/components/VinDecoder/VinResults/VinResults.vue';
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

  const getResults = async (vinValue: string) => {
    showAlert.value = false;
    loading.value = true;

    const { DecodeVinValues } = await import('@shaggytools/nhtsa-api-wrapper');
    const Decoder = new DecodeVinValues();
    const { Results } = await Decoder.DecodeVinValues(
      vinValue
    ).catch((err: Error) => handleError(err));

    if (Results?.[0]) {
      showAlert.value = false;
      rawResults.value = Results[0];
      loading.value = false;
    }
  };

  return {
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
  components: { ValidationObserver, BaseInputWithValidation, VinResults },

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
        <base-input-with-validation
          id="VinDecoder"
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
        <v-spacer />
        <v-btn
          color="primary"
          block
          :disabled="invalid"
          @click.prevent="getResults(vin)"
        >
          Decode
        </v-btn>
      </v-card-actions>
    </v-card>
    <vin-results :raw-results.sync="rawResults" :loading.sync="loading" />
  </validation-observer>
</template>
