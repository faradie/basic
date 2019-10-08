<template>
  <header class="main-header">
    <router-link :to="{ name:'index' }">
      <a class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini">
          <b>Basic</b>
        </span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg">
          <b>Basic</b>Lab
        </span>
      </a>
    </router-link>

    <nav class="navbar navbar-static-top">
      <a href="#" class="sidebar-toggle" v-if="isAuth" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#navbar-collapse"
        >
          <i class="fa fa-bars"></i>
        </button>
      </div>

      <div class="collapse navbar-collapse pull-left" id="navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              Publik
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li>
                <a href="#">Materi</a>
              </li>
              <li>
                <a href="#">View Dosen</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">

          <li v-if="isAuth" class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="/assets/img/avatar5.png" class="user-image" alt="User Image" />
              <span class="hidden-xs">{{ user.id }}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="user-header">
                <p>
                  {{ user.name }}
                  <small>{{ user.email }}</small>
                </p>
              </li>
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </div>
              </li>
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a class="btn btn-default btn-flat" @click.prevent="signOut">Logout</a>
                </div>
              </li>
            </ul>
          </li>
          <li v-else>
            <router-link :to="{ name: 'login' }">Login</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["token"],),
    ...mapState('auth', {
      user: state => state.user
    }),
    ...mapGetters(["isAuth"])
  },
  methods:{
    ...mapActions("auth", ["signout"]), 
    ...mapMutations(["CLEAR_ERRORS"]),
    signOut(){
      this.signout().then(()=>{
          this.CLEAR_ERRORS();
          this.$router.push({ name: "index" });
      })
    }
  }
};
</script>