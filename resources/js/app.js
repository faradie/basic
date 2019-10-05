import Vue from 'vue'
import router from './router.js'
import store from './store.js'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(require('vue-moment'));

new Vue({
    el: '#nf',
    router,
    store,
    components: {
        App
    }
})