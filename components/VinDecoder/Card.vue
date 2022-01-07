<script setup lang="ts">
import { ValidationObserver } from 'vee-validate';
import { initializeComponent } from './';
import { useNuxtApp } from '#app';

const { $store: $accessor } = useNuxtApp();
const { alertMessage, loading, rawResults, validator, vin, getResults } =
  initializeComponent($accessor);
</script>

<script lang="ts">
export default {
  name: 'VinDecoder',
  components: {
    ValidationObserver,
  },
};
</script>

<template>
  <validation-observer v-slot="{ invalid }" slim>
    <v-card elevation="8" max-width="600" class="decoder-card mx-auto">
      <v-alert
        :value="alertMessage !== null"
        type="error"
        class="decoder-card__alert"
        dense
      >
        {{ alertMessage }}
      </v-alert>
      <v-card-title class="decoder-card__title headline">
        VIN Decoder
      </v-card-title>
      <v-card-text>
        <p>Enter your VIN to decode useful information about your vehicle.</p>
        <BaseInputWithValidation
          id="VinDecoderInput"
          v-model="vin"
          class="decoder-card__input"
          :validator="validator"
          counter="17"
          clearable
          label="Vehicle Identification Number (VIN)"
          outlined
          to-upper-case
          @click:clear="rawResults = null"
          @input="rawResults = null"
        />
      </v-card-text>
      <v-card-actions class="decoder-card__actions">
        <v-btn
          class="btn__get-results mx-auto my-4"
          color="success"
          :disabled="!vin || invalid"
          block
          @click.prevent="getResults(vin)"
        >
          Decode VIN
        </v-btn>
      </v-card-actions>
      <LazyVinDecoderResults
        class="decoder-card__results"
        :raw-results.sync="rawResults"
        :loading.sync="loading"
        max-width="600"
        color="primary darken-4"
      />
    </v-card>
  </validation-observer>
</template>
