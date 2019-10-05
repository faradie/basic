import Vue from 'vue'
import router from './router.js'
import store from './store.js'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

new Vue({
    el: '#nf',
    router,
    store,
    components: {
        App
    }
})