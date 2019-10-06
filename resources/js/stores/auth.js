import $axios from '../api.js'


const state = () => ({
    user: {
        id: '',
        name: '',
        email: '',
        phone: '',
        password: '',
    },
})

const mutations = {
    FILL_AUTH_POSITION(state, payload) {
        state.user = {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            password: payload.password,
        }
    }
}

const actions = {
    signout({ commit }) {
        localStorage.setItem('token', null)
        commit('SET_TOKEN', null, { root: true })

    },
    registers({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/register`, payload).then((response) => {
                resolve(response.data)
                this.$router.push({ name: 'index' })
            }).catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            })
        })
    },
    submit({ commit }, payload) {
        localStorage.setItem('token', null)
        commit('SET_TOKEN', null, { root: true })

        return new Promise((resolve, reject) => {
            $axios.post(`/login`, payload)
                .then((response) => {
                    if (response.data.status == 'success') {
                        localStorage.setItem('token', response.data.data.api_token)
                        commit('SET_TOKEN', response.data.data.api_token, { root: true })
                        commit('FILL_AUTH_POSITION', response.data.data)
                    } else {
                        commit('SET_ERRORS', { invalid: 'Id/Password Salah' }, { root: true })
                    }
                    resolve(response.data)
                })
                .catch((error) => {
                    if (error.response.status == 422) {
                        commit('SET_ERRORS', error.response.data.errors, { root: true })
                    }
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}