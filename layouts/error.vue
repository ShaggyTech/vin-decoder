<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  getCurrentInstance
} from '@vue/composition-api';

export default defineComponent({
  layout: 'default',
  props: {
    error: {
      type: Object as PropType<any>,
      default: null
    }
  },
  head() {
    const data = getCurrentInstance()?.$data;
    console.log('DATA', { instanceData: data });
    const title: string =
      data?.error.statusCode === 404 ? data?.pageNotFound : data?.otherError;

    return {
      title
    };
  },
  setup() {
    const pageNotFound = ref<string>('Oops! That page was not found.');
    const otherError = ref<string>('An error occurred');

    return {
      pageNotFound,
      otherError
    };
  }
});
</script>

<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
