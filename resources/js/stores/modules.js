import $axios from '../api.js'

const state = () => ({
    modules:[]
})

const mutations ={
    SET_MODULES(state,payload){
        state.modules = payload
    }
}

const actions ={
    getModules({commit},payload){
        return new Promise((resolve,reject)=>{
            $axios.get(`/modules/${payload}`).then((response)=>{
                commit('SET_MODULES',response.data)
                resolve(response.data)
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