<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onErrorCaptured
} from '@nuxtjs/composition-api';
/* History Setup */
import { syncHistoryOnMounted } from '@/compositions/useLocalStorage';

const setupRefs = () => ({
  right: ref<boolean>(true),
  title: reactive({
    class: 'display-1',
    header: {
      innerText: 'VIN',
      class: 'primary_red__--text font-weight-black'
    },
    subHeader: {
      innerText: 'Decoder',
      class: 'white__--text'
    }
  })
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
  <v-app id="app" dark>
    <v-app-bar fixed app>
      <v-spacer />
      <AppTitleCard v-bind="title" />
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

<style lang="css">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
/* body {
  background-color: '#FFFFF';
  filter: invert(1) hue-rotate(210deg);
} */
a {
  text-decoration: none !important;
}
*::selection {
  background: yellow;
  color: black;
}

#app {
  font-family: 'Rubik', sans-serif;
}
</style>
