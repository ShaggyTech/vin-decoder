<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  name: 'AppTitleCard',
  // inheritAttrs: false,
  props: {
    header: {
      required: false,
      type: Object as PropType<Record<string, string>>,
      default: () => ({
        innerText: '',
        class: ''
      })
    },
    subHeader: {
      required: false,
      type: Object as PropType<Record<string, string>>,
      default: () => ({
        innerText: '',
        class: ''
      })
    }
  }
  // setup(_, { root: { $attrs } }) {
  //   const { ...attrs } = $attrs;

  //   return {
  //     attrs
  //   };
  // }
});
</script>

<template>
  <v-toolbar-title>
    <nuxt-link to="/">
      <span id="header" v-bind="header">{{ header.innerText }}</span>
      <span id="subheader" v-bind="subHeader">{{ subHeader.innerText }}</span>
    </nuxt-link>
  </v-toolbar-title>
</template>
