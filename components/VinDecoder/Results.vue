<script setup lang="ts">
/* Utility Methods */
import { filterResults } from '@/utils';
/* Types */
import { ResultsObjectType } from '@/types';

interface Props {
  rawResults?: ResultsObjectType | null;
  loading?: boolean;
  transition?: string;
  tableHeight?: number | string;
  maxWidth?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  rawResults: null,
  loading: false,
  transition: 'slide-y-transition',
  tableHeight: 300,
  maxWidth: 600,
});

const results = ref<ResultsObjectType | null>(null);

onMounted(() => {
  results.value = props.rawResults ? filterResults(props.rawResults) : null;
});

watch(
  () => props.rawResults,
  (newRawResults: ResultsObjectType | null): void => {
    results.value = newRawResults ? filterResults(newRawResults) : null;
  }
);
</script>

<script lang="ts">
export default {
  name: 'VinDecoderResults',
  inheritAttrs: false,
};
</script>

<template>
  <component
    :is="transition !== 'None' ? `v-${transition}` : 'div'"
    hide-on-leave
  >
    <v-skeleton-loader
      v-if="loading"
      class="results-loader"
      :max-width="maxWidth"
      type="card-heading, text@7"
    >
    </v-skeleton-loader>
    <v-card
      v-else-if="results && rawResults"
      v-bind="$attrs"
      class="results-card"
      :max-width="maxWidth"
      raised
    >
      <v-card-title class="results-card__title mx-auto px-2 title">
        <v-divider></v-divider>
        <span class="mx-auto px-4">
          {{ results.ModelYear }} {{ results.Make }} {{ results.Model }}
          {{ results.Series }}
        </span>
        <v-divider></v-divider>
      </v-card-title>
      <v-card-subtitle
        class="results-card__subtitle mx-auto px-2 title text-center"
      >
        {{ results.VIN }}
        <v-divider></v-divider>
      </v-card-subtitle>
      <v-card-text>
        <v-simple-table
          class="results-card__table"
          fixed-header
          :height="tableHeight"
          :max-width="maxWidth"
        >
          <template #default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, key, index) in results" :key="index">
                <td>{{ key }}</td>
                <td>{{ value }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </component>
</template>
