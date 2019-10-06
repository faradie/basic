//IMPORT SECTION
import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/auth/Login.vue'
import Register from './pages/auth/Register.vue'
import Index from './pages/Index.vue'
import IndexCourses from './pages/courses/Index.vue'
import DataCourses from './pages/courses/DataCourses.vue'
import AddCourse from './pages/courses/Add.vue'
import EditCourse from './pages/courses/Edit.vue'
import store from './store.js'

Vue.use(Router)

//DEFINE ROUTE
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/courses',
            component: IndexCourses,
            children: [
                {
                    path: '',
                    name: 'courses.data',
                    component: DataCourses,
                    meta: { title: 'Kelola Matakuliah' }
                },
                {
                    path: 'add',
                    name: 'course.add',
                    component: AddCourse,
                    meta: { title: 'Tambah Matakuliah' }
                },
                {
                    path:'edit/:id',
                    name: 'course.edit',
                    component: EditCourse,
                    meta: { title: 'Edit Matakuliah' }
                }
            ]
        }
    ]
});

//Navigation Guards
router.beforeEach((to, from, next) => {
    store.commit('CLEAR_ERRORS')
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let auth = store.getters.isAuth
        if (!auth) {
            next({ name: 'login' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router