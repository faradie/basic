import $axios from '../api.js'

const state = () => ({
    courses: [],
    course: {
        id: '',
        name: '',
        description: '',
        status: true
    },
    page: 1
})

const mutations = {
    SET_COURSES(state, payload) {
        state.courses = payload;
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    CLEAR_FORM_COURSE(state) {
        state.course = {
            id: '',
            name: '',
            description: ''
        }
    },
    FILL_COURSE_FORM(state, payload) {
        state.course = {
            id: payload.id,
            name: payload.name,
            description: payload.description,
            status: payload.status == 1 ? true : false,
        }
    }
}

const actions = {
    getCourses({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload : ''
        return new Promise((resolve, reject) => {
            $axios.get(`/courses?page=${state.page}&key=${search}`).then((response) => {
                commit('SET_COURSES', response.data)
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
    createCourse({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            commit('CLEAR_ERRORS', '', { root: true })
            $axios.post('/courses', state.course).then((response) => {
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
    editCourse({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/courses/${payload}/edit`).then((response) => {
                commit('FILL_COURSE_FORM', response.data.data)
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
    updateCourse({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            commit('CLEAR_ERRORS', '', { root: true })
            $axios.put(`/courses/${payload}`, state.course).then((response) => {
                commit('CLEAR_FORM_COURSE')
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
    dropCourse({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.delete(`/courses/${payload}`).then((response) => {
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

    dropAllCourse({ commit, state }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/course/deleteAll`).then((response) => {
                resolve(response.data)
            }).then((error) => {
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
    actions,
    mutations
}