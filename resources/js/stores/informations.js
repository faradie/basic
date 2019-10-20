import $axios from '../api.js'

const state = () => ({
    informations: [],
    page: 1,
    pageIndex: 1,
    information: {
        title: '',
        content: '',
        category_id: '',
        user_id: ''
    },
    categories: [],
    indexInfo: {
        id: '',
        title: '',
        content: '',
        category: '',
        writer: '',
        created_at: ''
    }
})

const mutations = {
    FILL_CLASSES(state, payload) {
        state.informations = payload
    },
    SET_CATEGORIES(state, payload) {
        state.categories = payload
    },
    CLEAR_INFORMATION_FORM(state) {
        state.information = {
            title: '',
            content: '',
            category_id: '',
            user_id: ''
        }
    },
    FILL_FORM_INFORMATION(state, payload) {
        state.information = {
            title: payload.title,
            content: payload.content,
            category_id: payload.category_id,
            user_id: payload.user_id
        }
    },
    SET_PAGE_INDEX(state, payload) {
        state.pageIndex = payload
    },
    SET_INFO_INDEX(state, payload) {
        state.indexInfo = {
            id: payload.id,
            title: payload.title,
            content: payload.content,
            category: payload.category.title,
            writer: payload.user.name,
            created_at: payload.created_at
        }
    }
}

const actions = {
    getInformations({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload : ''
        return new Promise((resolve, reject) => {
            $axios.get(`/informations?page=${state.page}&key=${search}`).then((response) => {
                commit('FILL_CLASSES', response.data)
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

    getCategories({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/categories`).then((response) => {
                commit('SET_CATEGORIES', response.data)
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

    addInformationsData({ commit, state }) {
        return new Promise((resolve, reject) => {
            $axios.post(`/informations`, state.information).then((response) => {
                commit('CLEAR_INFORMATION_FORM')
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

    editInformation({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/informations/${payload}/edit`).then((response) => {
                commit('FILL_FORM_INFORMATION', response.data.data)
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

    updateInformationData({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            $axios.put(`/informations/${payload}`, state.information).then((response) => {
                commit('CLEAR_INFORMATION_FORM')
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

    dropInformation({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.delete(`/informations/${payload}`).then((response) => {
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

    infoIndex({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload : ''
        return new Promise((resolve, reject) => {
            $axios.get(`/info-index?page=${state.pageIndex}&key=${search}`).then((response) => {
                commit('FILL_CLASSES', response.data)
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
    infoDetailIndex({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/info-detail/${payload}`).then((response) => {
                commit('SET_INFO_INDEX', response.data.data)
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}