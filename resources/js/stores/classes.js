import $axios from '../api.js'

const state = ()=>({
    classes:[],
    page:1
})

const mutations ={
    SET_CLASSES(state,payload){
        state.classes = payload
    }
}
const actions = {
    getClass({commit,state},payload){
        let search = typeof payload != 'undefined' ? payload : ''
        return new Promise((resolve,reject)=>{
            $axios.get(`/classes?page=${state.page}&key=${search}`).then((response)=>{
                commit('SET_CLASSES', response.data)
                resolve(response.data)
            }).catch((error)=>{
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