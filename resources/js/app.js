import Vue from 'vue'
import router from './router.js'
import store from './store.js'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.use(BootstrapVue)
Vue.use(require('vue-moment'));
Vue.use(VueSweetalert2);

new Vue({
    el: '#nf',
    router,
    store,
    components: {
        App,
        VueTimepicker 
    }
})
