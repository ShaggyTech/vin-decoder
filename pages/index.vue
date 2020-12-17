<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'VinDecoder',
});
</script>

<template>
  <v-container column justify-center align-center>
    <vin-decoder-card />
    <VinDecoderHistory />
  </v-container>
</template>
