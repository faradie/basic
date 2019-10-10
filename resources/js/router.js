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

import IndexClasses from './pages/classes/Index.vue'
import DataClasses from './pages/classes/DataClasses.vue'
import AddClasses from './pages/classes/Add.vue'
import EditClasses from './pages/classes/Edit.vue'

import IndexInformations from './pages/informations/Index.vue'
import InformationsData from './pages/informations/InformationsData.vue'

import Users from './pages/users/Index.vue'
import DataUsers from './pages/users/DataUsers.vue'
import UserSettings from './pages/users/UserSetting.vue'

import IndexCategories from './pages/categories/Index.vue'

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
            meta: { requiresAuth: true },
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
                    path: 'edit/:id',
                    name: 'course.edit',
                    component: EditCourse,
                    meta: { title: 'Edit Matakuliah' }
                }

            ]
        },
        {
            path: '/classes',
            component: IndexClasses,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'classes.data',
                    component: DataClasses,
                    meta: { title: 'Kelola Kelas' }
                },
                {
                    path: 'add',
                    name: 'classes.add',
                    component: AddClasses,
                    meta: { title: 'Tambah Kelas' }
                },
                {
                    path: 'edit/:id',
                    name: 'classes.edit',
                    component: EditClasses,
                    meta: { title: 'Edit Kelas' }
                },
            ]
        },
        {
            path: '/users',
            component: Users,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'users.data',
                    component: DataUsers,
                    meta: { title: 'Data Pengguna' }
                },
                {
                    path: 'settings/:id',
                    name: 'user.settings',
                    component: UserSettings,
                    meta: { title: 'Atur Pengguna' }
                }
            ]
        },
        {
            path: '/informations',
            component: IndexInformations,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'informations.data',
                    component: InformationsData,
                    meta: { title: 'Data Informasi' }
                }
            ]
        },
        {
            path: '/categories',
            name: 'categories',
            component: IndexCategories,
            meta: { requiresAuth: true, title: 'Kelola Kategori' },

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