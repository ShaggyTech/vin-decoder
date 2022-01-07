<script setup lang="ts">
import { ValidationProvider } from 'vee-validate';

interface Validator {
  rules?: {
    [propName: string]: any;
  };
  immediate?: boolean;
  vid?: string;
  name?: string;
  customMessages?: {
    [propName: string]: string;
  };
}

interface Props {
  toUpperCase?: boolean;
  validator?: Validator;
}

const props = withDefaults(defineProps<Props>(), {
  toUpperCase: false,
  validator: () => {
    return {} as Validator;
  },
});
const emit = defineEmits(['input', 'update:inputValue']);
const inputValue = ref('');

watchEffect((): void => {
  if (props.toUpperCase === true) {
    inputValue.value = inputValue.value.toUpperCase();
  }
  emit('update:inputValue', inputValue.value);
  emit('input', inputValue.value);
});
</script>

<script lang="ts">
export default {
  name: 'BaseInputWithValidation',
  inheritAttrs: false,

  // setup(props, { emit }) {
  //   const inputValue: Ref<any> = ref(null);
  //   watch(inputValue, (newInput: string): void => {
  //     if (props.toUpperCase === true && newInput) {
  //       inputValue.value = newInput.toUpperCase();
  //     }
  //     emit('input', inputValue.value);
  //   });

  //   return { inputValue };
  // },
};
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
