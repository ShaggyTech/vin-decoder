<script lang="ts">
/* Composition API */
import {
  defineComponent,
  ref,
  watch,
  PropType,
  Ref
} from '@vue/composition-api';
/* Components */
import BaseInputWithValidation from '~/components/base/BaseInputWithValidation.vue';
import { Validator } from '@/types';

export default defineComponent({
  name: 'VinInput',
  components: { BaseInputWithValidation },
  props: {
    id: {
      required: true,
      type: [String, Number] as PropType<string | number>
    },
    validator: {
      required: false,
      type: Object as PropType<Validator>,
      default: () => {}
    }
  },

  setup(_, { emit }) {
    const vin: Ref<string> = ref('');

    watch(vin, (vin: string): void => emit('input', vin));

    return {
      vin
    };
  }
});
</script>

<template>
  <base-input-with-validation
    :id="id"
    v-model="vin"
    :validator="validator"
    v-bind="$attrs"
    v-on="$listeners"
  ></base-input-with-validation>
</template>
