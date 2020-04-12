<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
/* History Setup */
import { syncHistoryOnMounted } from '@/compositions/history';
/* Types */
import { TypedVuexStore } from '@/store';

const setupRefs = () => ({
  right: ref<boolean>(true),
  title: ref<string>('ShaggyTech.com - VIN Decoder')
});

const mapState = (store: TypedVuexStore) => ({
  drawerItems: computed(() => [...store.drawerItems]),
  drawer: computed({
    get: () => store.drawer,
    set: (drawer: boolean) => store.setDrawer(drawer)
  }),
  rightDrawer: computed({
    get: () => store.rightDrawer,
    set: (rightDrawer: boolean) => store.setRightDrawer(rightDrawer)
  })
});

const mapActions = (store: TypedVuexStore) => ({
  toggleDrawer: (drawer: boolean) => {
    return store.setDrawer(!drawer);
  },
  toggleRightDrawer: (rightDrawer: boolean) => {
    return store.setRightDrawer(!rightDrawer);
  }
});

export default defineComponent({
  setup(_, { root: { $accessor } }) {
    syncHistoryOnMounted($accessor);

    return {
      ...setupRefs(),
      ...mapState($accessor),
      ...mapActions($accessor)
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
            <v-icon light>
              mdi-repeat
            </v-icon>
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
