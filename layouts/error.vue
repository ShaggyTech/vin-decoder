<script lang="ts">
import { defineComponent, ref, PropType } from '@vue/composition-api';

const getRefs = () => ({
  pageNotFound: ref<string>('Oops! That page was not found.'),
  otherError: ref<string>('An error occurred')
});

export default defineComponent({
  layout: 'default',
  props: {
    error: {
      type: Object as PropType<any>,
      default: null
    }
  },
  /* istanbul ignore next */
  head() {
    const statusCode = (this as any).$props.error?.statusCode;
    const { pageNotFound, otherError } = getRefs();
    const title: string =
      statusCode === 404 ? pageNotFound.value : otherError.value;

    return {
      title
    };
  },
  setup() {
    const { pageNotFound, otherError } = getRefs();

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
    <NuxtLink to="/"> To Home Page </NuxtLink>
  </v-app>
</template>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
