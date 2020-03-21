<template>
  <v-layout column justify-center align-center>
    <v-content>
      <vin-decoder />
    </v-content>
  </v-layout>
</template>

<script>
// import TypescriptTest from '~/components/TypescriptTest.vue';
// import CompositionTest from '~/components/CompositionTest.vue';
import VinDecoder from '~/components/VinDecoder/VinDecoder.vue';

export default {
  components: {
    // TypescriptTest,
    // CompositionTest,
    VinDecoder
  }
};
</script>
