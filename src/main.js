// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueTouch from 'vue-touch';
import Trend from 'vuetrend';
import { ClientTable } from 'vue-tables-2';
import VueTextareaAutosize from 'vue-textarea-autosize';
import mavonEditor from 'mavon-editor';
import { VueMaskDirective } from 'v-mask';
import VeeValidate,{ Validator } from 'vee-validate';
import pt_PT from 'vee-validate/dist/locale/pt_PT';
import axios from 'axios';
import Toasted from 'vue-toasted';
import VCalendar from 'v-calendar';
import VueApexCharts from 'vue-apexcharts';
import CKEditor from '@ckeditor/ckeditor5-vue';
import bFormSlider from 'vue-bootstrap-slider';
import { component as VueCodeHighlight } from 'vue-code-highlight';
import VueTour from 'vue-tour';
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import store from './store';
import router from './Routes';
import App from './App';
import layoutMixin from './mixins/layout';
import { AuthMixin } from './mixins/auth';
import config from './config';
import Widget from './components/Widget/Widget';
import Scrollspy from './documentation/pages/ScrollSpyComponent';


//COuntries
import vueCountryRegionSelect from 'vue-country-region-select'
Vue.use(vueCountryRegionSelect)

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//Dynamic title
import titleMixin from './mixins/titleMixin'

// Language VeeValidate



axios.defaults.baseURL = config.baseURLApi;
axios.defaults.headers.common['Content-Type'] = "application/json";
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

Vue.use(BootstrapVue);
Vue.use(VCalendar, {
  firstDayOfWeek: 2
});
Vue.use(VueFormWizard)
Vue.use(VueTouch);
Vue.use(Trend);
Vue.component('vue-code-highlight', VueCodeHighlight);
Vue.component('Widget', Widget);
Vue.component('Scrollspy', Scrollspy);
Vue.use(bFormSlider);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});
Vue.use(ClientTable, { theme: 'bootstrap4' });
Vue.use(VueTextareaAutosize);
Vue.use(CKEditor);
Vue.use(mavonEditor);
Vue.component('apexchart', VueApexCharts);
Vue.directive('mask', VueMaskDirective);
Vue.use(VeeValidate, { fieldsBagName: 'fieldsbag' });
Vue.mixin(layoutMixin);
Vue.mixin(AuthMixin);
Vue.use(Toasted, {duration: 10000});
Vue.use(VueTour);
Vue.use(VueSweetalert2);
Vue.mixin(titleMixin);

Vue.config.productionTip = false;

Validator.localize('pt', pt_PT);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
