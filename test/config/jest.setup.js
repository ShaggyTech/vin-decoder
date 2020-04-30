import CompositionApi from '@vue/composition-api';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { rules } from '@/plugins/vee-validate';

Vue.use(CompositionApi);
Vue.use(Vuetify);

rules();
