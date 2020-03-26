<script lang="ts">
/* Composition API */
import { defineComponent, ref, watch, PropType } from '@vue/composition-api';
/* Utility Methods */
import { filterResults } from '@/utils/filterResults';
/* Types */
import { ResultsObjectType } from '@/types';

export default defineComponent({
  name: 'VinResults',
  inheritAttrs: false,
  props: {
    rawResults: {
      required: false,
      type: Object as PropType<ResultsObjectType | null>,
      default: null
    },
    loading: {
      required: false,
      type: Boolean as PropType<boolean>,
      default: false
    },
    transition: {
      required: false,
      type: String as PropType<string>,
      default: 'slide-y-transition'
    },
    tableHeight: {
      required: false,
      type: [Number, String] as PropType<number | string>,
      default: 300
    },
    maxWidth: {
      required: false,
      type: [Number, String] as PropType<number | string>,
      default: 600
    }
  },

  setup(props) {
    const results = ref<ResultsObjectType | null>(null);

    watch(
      () => props.rawResults,
      (newRawResults: ResultsObjectType | null): void => {
        results.value = newRawResults ? filterResults(newRawResults) : null;
      }
    );

    return {
      results
    };
  }
});
</script>

<template>
  <component
    :is="transition !== 'None' ? `v-${transition}` : 'div'"
    hide-on-leave
  >
    <v-skeleton-loader
      v-if="loading"
      :max-width="maxWidth"
      type="card-heading, text@7"
    >
    </v-skeleton-loader>
    <v-card
      v-else-if="results && rawResults"
      v-bind="$attrs"
      :max-width="maxWidth"
      raised
    >
      <v-card-title class="mx-auto px-2 title">
        <v-divider></v-divider>
        <span class="mx-auto px-4">
          {{ results.ModelYear }} {{ results.Make }} {{ results.Model }}
          {{ results.Series }}
        </span>
        <v-divider></v-divider>
      </v-card-title>
      <v-card-subtitle class="mx-auto px-2 title text-center">
        {{ results.VIN }}
        <v-divider></v-divider>
      </v-card-subtitle>
      <v-card-text>
        <v-simple-table
          fixed-header
          :height="tableHeight"
          :max-width="maxWidth"
        >
          <template v-slot:default>
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
