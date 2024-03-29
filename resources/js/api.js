import axios from 'axios';
import store from './store.js'
import router from './router.js'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)


const $axios = axios.create({
    baseURL: '/api',
    headers: {
        // Authorization: sessionStorage.getItem('token') != 'null' ? 'Bearer ' + sessionStorage.getItem('token') : '',
        'Content-Type': 'application/json'
    }
});

Vue.http.interceptors.push(function (request, next) {
    // continue to next interceptor
    next((response) => {
        if (response.status == 401) {
            localStorage.setItem('token', null)
            localStorage.removeItem('basicState')
            commit('SET_TOKEN', null, { root: true })
            auth.logout();
            $router.push({ name: 'login' })
        }
    });
    // next(function(response) {
    //     if(response.status == 401){
    //         return response
    //     }
    // });
});

$axios.interceptors.request.use(
    function (config) {
        const token = store.state.token
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);

    }
);




export default $axios;