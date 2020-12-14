<script lang="ts">
import { defineComponent, ref, onErrorCaptured } from '@nuxtjs/composition-api';
/* History Setup */
import { syncHistoryOnMounted } from '@/compositions/useLocalStorage';

const setupRefs = () => ({
  right: ref<boolean>(true),
  title: ref<string>('ShaggyTech.com - VIN Decoder')
});

export default defineComponent({
  setup(_, { root: { $accessor } }) {
    syncHistoryOnMounted($accessor);

    /* istanbul ignore next */
    onErrorCaptured((err: Error, _vm: object, info: string): boolean => {
      // eslint-disable-next-line no-console
      console.error('Oops! An error occurred: ' + err.toString());
      // eslint-disable-next-line no-console
      console.error('info: ' + info);
      return false;
    });

    return {
      ...setupRefs()
    };
  }
});
</script>

<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-spacer />
      <v-toolbar-title class="text-center" v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main class="grey lighten-1">
      <nuxt />
    </v-main>
    <v-footer app class="text-center">
      <v-col class="text-center" cols="12">
        Made with &#10084; by Brandon Eichler - &copy;
        {{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
  </v-app>
</template>
