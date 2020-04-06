<script lang="ts">
import { defineComponent } from '@vue/composition-api';
/* Components */
import VinDecoder from '~/components/VinDecoder/index.vue';

export default defineComponent({
  components: {
    VinDecoder
  }
});
</script>

<template>
  <v-layout column justify-center align-center>
    <v-content>
      <vin-decoder />
    </v-content>
  </v-layout>
</template>
