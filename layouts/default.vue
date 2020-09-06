<script lang="ts">
import { defineComponent, ref, onErrorCaptured } from '@vue/composition-api';
/* Root store setup */
import { mapRootState, mapRootActions } from '@/compositions/useRootStore';
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
      ...setupRefs(),
      ...mapRootState($accessor),
      ...mapRootActions($accessor)
    };
  }
});
</script>

<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in drawerItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="toggleDrawer(drawer)" />
      <v-spacer />
      <v-toolbar-title class="text-center" v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="toggleRightDrawer(rightDrawer)">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content class="grey lighten-1">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer app class="text-center">
      <v-col class="text-center" cols="12">
        Made with &#10084; by Brandon Eichler - &copy;
        {{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
  </v-app>
</template>
