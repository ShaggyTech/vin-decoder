<template>
  <div>Name: {{ fullName }} ||| Message: {{ message }}</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';

interface User {
  firstName: string;
  lastName: number;
}

export default defineComponent({
  props: {
    user: {
      type: Object as () => User,
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
