import $axios from '../api.js'

const state = () => ({
    modules: [],
})

const mutations = {
    SET_MODULES(state, payload) {
        state.modules = payload
    }
}

const actions = {
    getAllModules({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/modules`).then((response) => {
                commit('SET_MODULES', response.data.data)
                resolve(response.data)
            })
        })
    },
    submitAdd({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/modules`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                dispatch('getAllModules').then(() => {
                    resolve(response.data)
                })
            }).catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                } else if (error.response.status == 401) {
                    localStorage.setItem('token', null)
                    localStorage.removeItem('basicState')
                    commit('SET_TOKEN', null, { root: true })
                }
                console.log(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}