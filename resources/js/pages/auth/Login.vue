<!-- HTML SECTION -->
<template>
  <div class="container">
    <div class="login-box">
      <div class="login-logo">
        <router-link :to="{ name: 'index' }">
          <b>Basic</b>Laboratory
        </router-link>
      </div>
      <div class="login-box-body">
        <p class="login-box-msg">Jangan lupa baca belajar</p>

        <div class="form-group has-feedback" :class="{'has-error': errors.id}">
          <input
            type="text"
            @keyup.enter="pushLogin"
            class="form-control"
            placeholder="Id Pengguna"
            v-model="data.id"
          />
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
          <p class="text-danger" v-if="errors.id">{{ errors.id[0] }}</p>
        </div>
        <div class="form-group has-feedback" :class="{'has-error': errors.password}">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            @keyup.enter="pushLogin"
            v-model="data.password"
          />
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          <p class="text-danger" v-if="errors.password">{{ errors.password[0] }}</p>
        </div>
        <div class="alert alert-danger" v-if="errors.invalid">{{ errors.invalid }}</div>
        <div class="row">
          <div class="col-xs-8">
            <router-link :to="{ name: 'register' }">
              <a>Buat akun baru</a>
            </router-link>
            <br />
            <a href="#">Saya lupa password</a>
            <br />
          </div>
          <div class="col-xs-4">
            <button
              type="submit"
              class="btn btn-primary btn-block btn-flat"
              @click.prevent="pushLogin"
            >Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- JAVASCRIPT SECTION -->
<script>
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      data: {
        id: "",
        password: ""
      }
    };
  },
  created() {
    if (this.isAuth) {
      this.$router.push({ name: "home" });
    }
  },
  computed: {
    ...mapGetters(["isAuth"]), //MENGAMBIL GETTERS isAuth DARI VUEX
    ...mapState(["errors"])
  },
  methods: {
    ...mapActions("auth", ["submit"]),
    ...mapMutations(["CLEAR_ERRORS"]),

    pushLogin() {
      this.submit(this.data).then(() => {
        if (this.isAuth) {
          this.CLEAR_ERRORS();
          this.$router.push({ name: "home" });
          const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: "Selamat Datang!"
          });
        }
      });
    }
  },
  destroyed() {
    this.CLEAR_ERRORS();
  }
};
</script>