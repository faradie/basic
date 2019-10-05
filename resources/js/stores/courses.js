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
    CLEAR_FORM_COURSE(state) {
        state.courses = {
            id: '',
            name: '',
            description: ''
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
                console.log(error)
            })
        })
    },
    createCourse({ commit,state }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post('/courses', state.course).then((response) => {
                console.log(state.course)
                resolve(response.data)
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
    actions,
    mutations
}