<script lang="ts">
/* Composition API */
import {
  defineComponent,
  ref,
  watch,
  PropType,
  Ref
} from '@vue/composition-api';
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
    id: {
      required: true,
      type: [String, Number] as PropType<string | number>
    },
    /* Options for the ValidationProvider */
    validator: {
      required: false,
      type: Object as PropType<Validator>,
      default: () => {}
    }
  },

  setup(_, { emit }) {
    const value: Ref<any> = ref(null);
    watch(value, (value: any): void => emit('input', value));

    return { value };
  }
});
</script>

<template>
  <validation-provider v-slot="{ errors, validated }" v-bind="validator">
    <v-checkbox
      v-if="$attrs.type === 'checkbox'"
      :key="id"
      v-model="value"
      v-bind="$attrs"
      :success="validated"
      :error-messages="errors"
      v-on="$listeners"
    />
    <v-slider
      v-else-if="$attrs.type === 'slider'"
      :key="id + 'slider'"
      v-model="value"
      v-bind="{ ...$attrs, type: 'text' }"
      :success="validated"
      :error-messages="errors"
      v-on="$listeners"
    />
    <v-textarea
      v-else-if="$attrs.type === 'textarea'"
      :key="id"
      v-model="value"
      v-bind="{ ...$attrs, type: 'text' }"
      :success="validated"
      :error-messages="errors"
      v-on="$listeners"
    />
    <v-select
      v-else-if="$attrs.type === 'select'"
      :key="id"
      v-model="value"
      v-bind="{ ...$attrs, type: 'text' }"
      :success="validator.rules && validated"
      :error-messages="errors"
      v-on="$listeners"
    />
    <v-switch
      v-else-if="$attrs.type === 'switch'"
      :key="id"
      v-model="value"
      v-bind="{ ...$attrs, type: 'text' }"
      :success="validator.rules && validated"
      :error-messages="errors"
      v-on="$listeners"
    />
    <!-- Default -->
    <v-text-field
      v-else
      :key="id"
      v-model="value"
      v-bind="$attrs"
      :success="validated"
      :error-messages="errors"
      v-on="$listeners"
    />
  </validation-provider>
</template>
