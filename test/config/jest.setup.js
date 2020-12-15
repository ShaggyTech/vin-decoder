import { config as VTUConfig } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { rules } from '@/plugins/vee-validate';
import '@testing-library/jest-dom';

Vue.use(Vuetify);

rules();

// Stub Nuxt components
VTUConfig.stubs.Nuxt = true;
VTUConfig.stubs['nuxt-link'] = true;
VTUConfig.stubs['router-link'] = true;

const components = [
  /* App */
  {
    name: 'AppTitleCard',
    path: '../../components/app/TitleCard.vue',
  },
  /* Base */
  {
    name: 'BaseInputWithValidation',
    path: '../../components/base/InputWithValidation.vue',
  },
  /* VinDecoder */
  {
    name: 'VinDecoderCard',
    path: '../../components/VinDecoder/Card.vue',
  },
  {
    name: 'VinDecoderHistory',
    path: '../../components/VinDecoder/History.vue',
  },
  {
    name: 'VinDecoderResults',
    path: '../../components/VinDecoder/Results.vue',
  },
];

components.forEach(({ name, path }) => {
  Vue.component(`${name}`, require(path).default);
  Vue.component(`Lazy${name}`, require(path).default);
});
