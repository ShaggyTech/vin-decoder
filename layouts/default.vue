<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onErrorCaptured,
} from '@nuxtjs/composition-api';
/* Icons */
import { mdiGithub } from '@mdi/js';
/* History Setup */
import { syncHistoryOnMounted } from '@/compositions/useLocalStorage';

const setupRefs = () => ({
  right: ref<boolean>(true),
  title: reactive({
    class: 'display-1',
    header: {
      innerText: 'Dubsquared - VIN',
      class: 'primary_red__--text font-weight-black',
    },
    subHeader: {
      innerText: 'Decoder',
      class: 'white__--text',
    },
  }),
});

export default defineComponent({
  setup(_, { root: { $accessor } }) {
    const icons = { mdiGithub };
    const sourceCodeURL = 'https://github.com/ShaggyTech/vin-decoder';
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
      ...setupRefs(),
      icons,
      sourceCodeURL,
    };
  },
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
      <v-row justify="center">
        <v-btn
          icon
          elevation="1"
          :href="sourceCodeURL"
          target="_blank"
          rel="noopener"
        >
          <v-icon size="32px" color="secondary lighten-2">
            {{ icons.mdiGithub }}
          </v-icon>
        </v-btn>

        <v-col class="py-1 text-center subtitle-2" cols="12">
          Made with <strong>Vue.js</strong> and <strong>Nuxt.js</strong> by
          <strong>Brandon Eichler</strong> - {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
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
