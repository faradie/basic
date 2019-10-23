import $axios from '../api.js'

const state = () => ({
    modules: []
})

const mutations = {
    SET_MODULES(state, payload) {
        state.modules = payload
    }
}

const actions = {
    getModules({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/modules/${payload}`).then((response) => {
                commit('SET_MODULES', response.data)
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
                dispatch('getModules').then(() => {
                    resolve(response.data)
                })
            }).catch((error) => {
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
    mutations,
    actions
}