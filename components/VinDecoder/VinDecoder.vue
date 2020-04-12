<script lang="ts">
/* Composition API */
import { defineComponent } from '@vue/composition-api';
/* Components */
import { ValidationObserver } from 'vee-validate';
import BaseInputWithValidation from '@/components/base/BaseInputWithValidation.vue';
import VinResults from '@/components/VinDecoder/VinResults/VinResults.vue';
import VinHistory from '@/components/VinDecoder/VinHistory/VinHistory.vue';

/* Component Setup */
import { initializeComponent } from '@/components/VinDecoder/setup';

export default defineComponent({
  name: 'VinDecoder',
  components: {
    BaseInputWithValidation,
    ValidationObserver,
    VinHistory,
    VinResults
  },

  setup(_, { root: { $accessor } }) {
    return {
      ...initializeComponent($accessor)
    };
  }
});
</script>

<template>
  <validation-observer v-slot="{ invalid }" slim>
    <v-card elevation="8" max-width="600" class="mx-auto">
      <v-alert :value="alertMessage" type="error" dense>{{
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
