<script lang="ts">
/* Composition API */
import {
  defineComponent,
  ref,
  watch,
  PropType,
  Ref
} from '@vue/composition-api';
/* Utility Methods */
import { filterResults } from '@/utils/filterResults';
/* Components */
import BaseInputWithValidation from '@/components/base/BaseInputWithValidation.vue';

export type ResultsObject = { [propName: string]: string };

export default defineComponent({
  name: 'VinResults',
  components: { BaseInputWithValidation },
  props: {
    rawResults: {
      required: false,
      type: Object as PropType<object | null>
    },
    loading: {
      required: false,
      type: Boolean as PropType<boolean>,
      default: true
    },
    transition: {
      required: false,
      type: String as PropType<string>,
      default: 'slide-y-transition'
    }
  },

  setup(props) {
    const results = ref<object | null>(null);
    const headlineResults = ref<object | null>(null);

    watch(
      () => props.rawResults as Ref<object | null>,
      (newRawResults: object | null): void => {
        results.value = newRawResults ? filterResults(newRawResults) : null;
      }
    );

    watch(
      () => results as Ref<object | null>,
      (results: object | null): void => {
        if (results) {
          const { Make, Model, ModelYear, Series, VIN }: ResultsObject = {
            ...results
          };
          headlineResults.value = { Make, Model, ModelYear, Series, VIN };
        } else {
          headlineResults.value = null;
        }
      }
    );

    return {
      results,
      headlineResults
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
      height="300px"
      type="card-heading, text@7"
    >
    </v-skeleton-loader>
    <v-card
      v-else-if="results && rawResults"
      max-width="600"
      raised
      class="mx-auto px-2 indigo"
    >
      <v-card-title class="mx-auto">
        <v-card-subtitle class="mx-auto title">
          {{ results.ModelYear }} {{ results.Make }} {{ results.Model }}
          {{ results.Series }}
          <v-divider></v-divider>
        </v-card-subtitle>
        <v-card-subtitle class="mx-auto title">
          {{ results.VIN }}
          <v-divider></v-divider>
        </v-card-subtitle>
      </v-card-title>
      <v-card-text class="px-0">
        <v-simple-table fixed-header height="300px">
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
