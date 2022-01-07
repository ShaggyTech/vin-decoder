<script setup lang="ts">
import {
  mapHistoryState,
  mapHistoryActions,
} from '~/compositions/useHistoryStore';

import { useNuxtApp } from '#app';

const { $store: $accessor } = useNuxtApp();
/* Computed history store properties */
const { history } = mapHistoryState($accessor);
/* Methods to interact with history store module */
const { clearHistory } = mapHistoryActions($accessor);
</script>

<script lang="ts">
export default {
  name: 'VinDecoderHistory',
};
</script>

<template>
  <client-only>
    <v-card
      v-if="history.length > 0"
      class="history-card mx-auto my-4"
      max-width="600"
    >
      <v-card-title class="history-card__title headline">
        Search History
        <v-spacer />
        <v-btn
          v-if="history.length > 0"
          x-small
          class="btn__clear-history mx-2 my-2"
          color="deep-orange darken-4"
          @click.prevent="clearHistory"
        >
          Clear History
        </v-btn>
      </v-card-title>
      <v-expansion-panels accordian focusable hover flat tile>
        <v-expansion-panel v-for="(item, key) in history" :key="key">
          <v-expansion-panel-header class="title primary darken-4">
            {{ item.VIN }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <lazy-vin-decoder-results
              :raw-results.sync="item.results"
              color="primary darken-4"
              tile
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </client-only>
</template>
