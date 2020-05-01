<script lang="ts">
import { defineComponent } from '@vue/composition-api';
/* Components */
import VinDecoder from '@/components/VinDecoder/VinDecoder.vue';
import VinHistory from '@/components/VinDecoder/VinHistory/VinHistory.vue';

export default defineComponent({
  components: {
    VinDecoder,
    VinHistory
  }
});
</script>

<template>
  <v-layout column justify-center align-center>
    <v-content>
      <vin-decoder />
      <vin-history />
    </v-content>
  </v-layout>
</template>
