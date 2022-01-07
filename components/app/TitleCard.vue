<script setup lang="ts">
interface Props {
  header?: Record<string, string>;
  subHeader?: Record<string, string>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  header: () => ({
    innerText: '',
    class: '',
  }),
  subHeader: () => ({
    innerText: '',
    class: '',
  }),
});
</script>

<script lang="ts">
export default {
  name: 'AppTitleCard',
};
</script>

<template>
  <v-toolbar-title>
    <nuxt-link to="/">
      <span id="Header" v-bind="header">{{ header.innerText }}</span>
      <span id="SubHeader" v-bind="subHeader">{{ subHeader.innerText }}</span>
    </nuxt-link>
  </v-toolbar-title>
</template>
