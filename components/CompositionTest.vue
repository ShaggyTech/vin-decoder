<template>
  <div>Name: {{ fullName }}, Message: {{ message }}</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from '@vue/composition-api';
import { User } from '@/types';

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },

  setup({ user }) {
    const fullName = computed(() => `${user.firstName} ${user.lastName}`);
    const message = ref('This is a message');

    return {
      fullName,
      message
    };
  }
});
</script>

<style></style>
