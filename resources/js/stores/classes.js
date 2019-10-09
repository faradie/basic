import $axios from '../api.js'

const state = () => ({
    classes: [],
    page: 1,
    lectures: [],
    courses: [],
    classField: {
        course_id: '',
        lecture_id: '',
        day: '',
        attrib: '',
        start_time: '',
        end_time: ''
    }
})

const mutations = {
    SET_CLASSES(state, payload) {
        state.classes = payload
    },
    LECTUR_DATA(state, payload) {
        state.lectures = payload
    },
    COURSES_DATA(state, payload) {
        state.courses = payload
    },
    CLEAR_FORM_CLASS(state) {
        state.classField = {
            course_id: '',
            lecture_id: '',
            day: '',
            attrib: '',
            start_time: '',
            end_time: ''
        }
    },
    FILL_CLASS_FORM(state, payload) {
        state.classField = {
            course_id: payload.course_id,
            lecture_id: payload.lecture_id,
            day: payload.day,
            attrib: payload.attrib,
            start_time: payload.start_time,
            end_time: payload.end_time
        }
    }
}
const actions = {
    getClass({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload : ''
        return new Promise((resolve, reject) => {
            $axios.get(`/classes?page=${state.page}&key=${search}`).then((response) => {
                commit('SET_CLASSES', response.data)
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },

    getCoursesAndLectures({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/classes/get-mk_ds`).then((response) => {
                commit('COURSES_DATA', response.data.courses)
                commit('LECTUR_DATA', response.data.lectur)
                resolve(response.data)
            })
        })
    },

    addClasses({ commit, state }) {
        return new Promise((resolve, reject) => {
            $axios.post(`/classes`, state.classField).then((response) => {
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

    editClass({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/classes/${payload}/edit`).then((response) => {
                commit('FILL_CLASS_FORM', response.data.data)
                resolve(response.data)
            })
        })
    },

    updateClass({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            $axios.put(`/classes/${payload}`, state.classField).then((response) => {
                commit('CLEAR_FORM_CLASS')
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
    },

    deleteClass({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.delete(`/classes/${payload}`).then((response) => {
                resolve(response.data)
            })
        })
    },

    deleteAllClasses({commit}){
        return new Promise((resolve,reject)=>{
            $axios.get(`/classes/deleteAll`).then((response)=>{
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