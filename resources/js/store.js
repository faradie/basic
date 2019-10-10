import Vue from 'vue'
import Vuex from 'vuex'

import auth from './stores/auth.js'
import courses from './stores/courses.js'
import classes from './stores/classes.js'
import users from './stores/users.js'
import categories from './stores/categories.js'

import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        courses,
        classes,
        users,
        categories
    },
    state: {
        token: localStorage.getItem('token'),
        errors: []
    },
    getters: {
        isAuth: state => {
            return state.token != "null" && state.token != null
        }
    },
    plugins: [
        createPersistedState({
            key: 'basicState',
            paths: ['auth.user'],
          }),
    ],
    mutations: {
        //SEBUAH MUTATIONS YANG BERFUNGSI UNTUK MEMANIPULASI VALUE DARI STATE token
        SET_TOKEN(state, payload) {
            state.token = payload
        },
        SET_ERRORS(state, payload) {
            state.errors = payload
        },
        CLEAR_ERRORS(state) {
            state.errors = []
        }
    }
})

export default store