<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
/* Components */
import VinResults from '@/components/VinDecoder/VinResults/VinResults.vue';

export default defineComponent({
  name: 'VinHistory',
  components: { VinResults },

  setup(_, { root: { $accessor } }) {
    const history = computed(() => [...$accessor.history.history]);
    const clearHistory = () => $accessor.history.clearHistory();

    return {
      history,
      clearHistory
    };
  }
});
</script>

<template>
  <v-card v-if="history.length > 0" max-width="600" class="mx-auto my-4">
    <v-card-title class="headline">
      Search History
      <v-spacer />
      <v-btn
        v-if="history.length > 0"
        class="mx-2 my-2"
        color="deep-orange darken-4"
        :disabled="history.length < 1"
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
          <vin-results
            :raw-results.sync="item.results"
            color="primary darken-4"
            tile
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
