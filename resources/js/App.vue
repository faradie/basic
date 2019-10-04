<template>
    <div class="wrapper">
        <app-header  />
        <app-sides v-if="isAuth" />
        <div class="content-wrapper">
            <router-view></router-view>
        </div>
        <app-footer  />
    </div>
</template>
<script>
    import { mapState, mapGetters } from 'vuex'
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'
    import Sides from './components/Sides.vue'
    export default {
        computed: {
            ...mapState(['token']),
            ...mapGetters(['isAuth'])
        },
        components: {
            'app-header': Header,
            'app-footer': Footer,
            'app-sides': Sides
        }
    }
</script>