import $axios from '../api.js'

const state = () => ({
    users: [],
    user: {
        id: '',
        name: '',
        email: '',
        phone: '',
        created: ''
    },
    page: 1,
    roles: [],
    permissions: [],

    user_role: '',
    user_permissions_state: [],

    selected_role: '',
    role_permission: []
})


const mutations = {
    SET_USERS(state, payload) {
        state.users = payload;
    },
    FILL_USER_FORM(state, payload) {
        state.user = {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            created: payload.created_at
        }
    },
    CLEAR_FORM_USER() {
        state.user = {
            id: '',
            name: '',
            email: '',
            phone: '',
            created: ''
        }
    },
    SET_USERS_PAGE(state, payload) {
        state.page = payload
    },
    CLEAR_ROLE_PERMISSION(state, payload) {
        state.role_permission = []
    },
    ASSIGN_ROLES(state, payload) {
        state.roles = payload
    },
    ASSIGN_PERMISSION(state, payload) {
        state.permissions = payload
    },

    USER_ROLE(state, payload) {
        state.user_role = payload
    },
    USER_PERMISSIONS(state, payload) {
        state.user_permissions_state = payload
    },
    GET_NEW_ROLE_PERMISSION(state, payload) {
        state.role_permission = payload
    }
}

const actions = {
    getUsers({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload : ''
        return new Promise((resolve, reject) => {
            $axios.get(`/users?page=${state.page}&key=${search}`).then((response) => {
                commit('SET_USERS', response.data)
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    getUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/users/${payload}/edit`).then((response) => {
                commit('FILL_USER_FORM', response.data.data)
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    updateUser({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            $axios.put(`/users/${payload}`, state.user).then((response) => {
                commit('CLEAR_FORM_USER')
                resolve(response.data)
            }).then((error) => {
                console.log(error)
            }).catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            })
        })
    },

    //get all role and permission
    getRoles({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/roles`).then((response) => {
                commit('ASSIGN_ROLES', response.data.data)
                resolve(response.data)
            })
        })
    },

    getAllPermission({ commit }) {
        return new Promise((resolve, reject) => {
            $axios.get(`/permissions`).then((response) => {
                commit('ASSIGN_PERMISSION', response.data.data)
                resolve(response.data)
            })
        })
    },

    getUserRole({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/roles/${payload}`).then((response) => {
                commit('USER_ROLE', response.data.data)
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },

    getUserPermissions({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/permissions/${payload}`).then((response) => {
                commit('USER_PERMISSIONS', response.data.data)
                resolve(response.data)
            })
        })
    },

    getRolePermission({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/role-permission`, { role_id: payload }).then((response) => {
                commit('GET_NEW_ROLE_PERMISSION', response.data.data)
                resolve(response.data)
            })
        })
    },
    setRolePermission({ commit }, payload) {
        return new Promise((resolve, reject) => {
            // console.log(payload)
            commit('CLEAR_ERRORS', '', {root: true})
            $axios.post(`/set-role-permissions`, payload).then((response) => {
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
