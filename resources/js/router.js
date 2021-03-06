//IMPORT SECTION
import Vue from 'vue'

import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/auth/Login.vue'
import Register from './pages/auth/Register.vue'
import Index from './pages/Index.vue'
import NotFound from './pages/NotFound.vue'

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
import AddInformation from './pages/informations/Add.vue'
import EditInformation from './pages/informations/Edit.vue'
import InfoIndexDetail from './pages/informations/InfoIndexDetail.vue'

import Users from './pages/users/Index.vue'
import DataUsers from './pages/users/DataUsers.vue'
import UserSettings from './pages/users/UserSetting.vue'

import IndexModules from './pages/modules/Index.vue'
import ModulesData from './pages/modules/ModulesData.vue'
import ModulesAdd from './pages/modules/Add.vue'
import GetModuleView from './pages/modules/GetModuleView.vue'

import IndexCategories from './pages/categories/Index.vue'

import IndexUploads from './pages/uploads/Index.vue'
import DataUploads from './pages/uploads/DataUploads.vue'

import store from './store.js'

Vue.use(Router)

//DEFINE ROUTE
const router = new Router({
    mode: 'history',
    routes: [
        { path: '*', component: NotFound },
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
            path: '/get-modules',
            name: 'getModules',
            component: GetModuleView,
            meta: { title: 'Kumpulan Materi' }
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
            path: '/uploads',
            component: IndexUploads,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'uploads.data',
                    component: DataUploads,
                    meta: { title: 'Upload' }
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
            path: '/modules',
            component: IndexModules,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'modules.data',
                    component: ModulesData,
                    meta: { title: 'Kelola Materi' }
                },
                {
                    path: 'add',
                    name: 'modules.add',
                    component: ModulesAdd,
                    meta: { title: 'Tambah Materi' }
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
                },
                {
                    path: 'add',
                    name: 'informations.add',
                    component: AddInformation,
                    meta: { title: 'Buat Informasi' }
                },
                {
                    path: 'edit/:id',
                    name: 'informations.edit',
                    component: EditInformation,
                    meta: { title: 'Edit Informasi' }
                }
            ]
        },
        {
            path: '/categories',
            name: 'categories',
            component: IndexCategories,
            meta: { requiresAuth: true, title: 'Kelola Kategori' },

        },
        {
            path: '/info-detail/:id',
            name: 'infoIndex.detail',
            component: InfoIndexDetail,
            meta: { title: 'Detail Informasi' }
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