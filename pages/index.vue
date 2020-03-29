<script>
import VinDecoder from '~/components/VinDecoder/VinDecoder.vue';

export default {
  components: {
    VinDecoder
  }
};
</script>

<template>
  <v-layout column justify-center align-center>
    <v-content>
      <vin-decoder />
    </v-content>
  </v-layout>
</template>
