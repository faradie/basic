import $axios from '../api.js'
import mime from 'mime-types'

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

    getFile({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/modules/${payload}/download`, { responseType: 'arraybuffer' }).then((response) => {
                console.log(response)
                const types = response.headers['content-type'];
                const blob = new Blob([response.data], { type: types });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                const contentDisposition = response.headers['content-disposition'];
                let fileName = payload;
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                    if (fileNameMatch.length === 2)
                        fileName = fileNameMatch[1];
                }
                console.log(fileName)

                link.setAttribute('download', fileName+'.'+mime.extension(types));
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
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