import $axios from '../api.js'

const state = () => ({
    datas: [],
    category: {
        id: '',
        title: '',
        description: ''
    },
    page: 1
})

const mutations = {
    FILL_CATEGORIES(state, payload) {
        state.datas = payload
    },
    CLEAR_CATEGORY_FORM(state) {
        state.category = {
            id: '',
            title: '',
            description: ''
        }
    },
    SET_FOR_UPDATE(id, title, descrip) {
        state.category = {
            id: id,
            title: title,
            description: descrip
        }
    }
}

const actions = {
    getCategories({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload : ''
        return new Promise((resolve, reject) => {
            $axios.get(`/categories?page=${state.page}&key=${search}`).then((response) => {
                commit('FILL_CATEGORIES', response.data)
                resolve(response.data)
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
    },

    addCategoryData({ commit, state }) {
        return new Promise((resolve, reject) => {
            commit('CLEAR_ERRORS', '', { root: true })
            $axios.post(`/categories`, state.category).then((response) => {
                commit('CLEAR_CATEGORY_FORM')
                resolve(response.data)
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
    },

    updateCategoryData({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            $axios.put(`/categories/${payload}`, state.category).then((response) => {
                commit('CLEAR_CATEGORY_FORM')
                resolve(response.data)
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
    },

    dropCategory({commit},payload){
        return new Promise((resolve,reject)=>{
            $axios.delete(`/categories/${payload}`).then((response)=>{
                resolve(response.data)
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