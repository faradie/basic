import Vue from 'vue'
import router from './router.js'
import store from './store.js'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';


Vue.use(BootstrapVue)
Vue.use(require('vue-moment'));
Vue.use(VueSweetalert2);

new Vue({
    el: '#nf',
    router,
    store,
    components: {
        App
    }
})
