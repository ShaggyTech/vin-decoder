<script lang="ts">
/* Composition API */
import {
  defineComponent,
  ref,
  watch,
  PropType,
  Ref
} from '@nuxtjs/composition-api';
/* Vee-Validate */
import { ValidationProvider } from 'vee-validate';
/* Types */
import { Validator } from '@/types';

export default defineComponent({
  name: 'BaseInputWithValidation',
  components: {
    ValidationProvider
  },
  inheritAttrs: false,
  props: {
    toUpperCase: {
      required: false,
      type: Boolean,
      default: false
    },
    /* Options for the ValidationProvider */
    validator: {
      required: false,
      type: Object as PropType<Validator>,
      default: () => {}
    }
  },

  setup(props, { emit }) {
    const inputValue: Ref<any> = ref(null);
    watch(inputValue, (newInput: string): void => {
      if (props.toUpperCase === true) {
        inputValue.value = newInput.toUpperCase();
      }
      emit('input', inputValue.value);
    });

    return { inputValue };
  }
});
</script>

<template>
  <validation-provider
    id="validator"
    v-slot="{ errors, validated }"
    v-bind="validator"
  >
    <v-text-field
      v-model="inputValue"
      v-bind="$attrs"
      :success="validated"
      :error-messages="errors"
      v-on="$listeners"
    />
  </validation-provider>
</template>
