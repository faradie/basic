<template>
  <div class="container">
    <div class="register-box">
      <div class="register-logo">
        <router-link :to="{ name:'index' }">
          <a>
            <b>Basic</b>Laboratory
          </a>
        </router-link>
      </div>

      <div class="register-box-body">
        <p class="login-box-msg">Isikan data anda dengan sesuai</p>

        <div class="form-group has-feedback" :class="{'has-error': errors.id}">
          <input type="text" class="form-control" placeholder="Id Pengguna" v-model="data.id" />
          <span class="glyphicon glyphicon-credit-card form-control-feedback"></span>
          <p class="text-danger" v-if="errors.id">{{ errors.id[0] }}</p>
        </div>
        <div class="form-group has-feedback" :class="{'has-error': errors.name}">
          <input type="text" class="form-control" placeholder="Nama Lengkap" v-model="data.name" />
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
          <p class="text-danger" v-if="errors.name">{{ errors.name[0] }}</p>
        </div>
        <div class="form-group has-feedback" :class="{'has-error': errors.email}">
          <input type="email" class="form-control" placeholder="Email" v-model="data.email" />
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          <p class="text-danger" v-if="errors.email">{{ errors.email[0] }}</p>
        </div>
        <div class="form-group has-feedback" :class="{'has-error': errors.phone}">
          <input type="number" @input="filterInput" class="form-control" placeholder="No Telepon" v-model="data.phone" />
          <span class="glyphicon glyphicon-phone form-control-feedback"></span>
          <p class="text-danger" v-if="errors.phone">{{ errors.phone[0] }}</p>
        </div>
        <div class="form-group has-feedback" :class="{'has-error': errors.password}">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="data.password"
          />
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          <p class="text-danger" v-if="errors.password">{{ errors.password[0] }}</p>
        </div>
        <div class="form-group has-feedback" :class="{'has-error': errors.password_confirmation}">
          <input
            type="password"
            class="form-control"
            placeholder="Konfirmasi password"
            v-model="data.password_confirmation"
          />
          <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
          <p
            class="text-danger"
            v-if="errors.password_confirmation"
          >{{ errors.password_confirmation[0] }}</p>
        </div>
        <div class="row">
          <div class="col-xs-8">
            <router-link :to="{ name:'login' }">
              <a>Login</a>
            </router-link>
            <br />
            <a>Saya lupa password</a>
          </div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button
              type="submit"
              class="btn btn-primary btn-block btn-flat"
              @click.prevent="registerUser"
            >Register</button>
          </div>
          <!-- /.col -->
        </div>
      </div>
      <!-- /.form-box -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      data: {
        id: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: ""
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
    ...mapActions("auth", ["registers"]), //MENGISIASI FUNGSI submit() DARI VUEX AGAR DAPAT DIGUNAKAN PADA COMPONENT TERKAIT. submit() BERASAL DARI ACTION PADA FOLDER STORES/auth.js
    ...mapMutations(["CLEAR_ERRORS"]),
    registerUser() {
      this.registers(this.data).then(() => {
        this.CLEAR_ERRORS();
        this.$router.push({ name: "index" });
      });
    },
    filterInput(e){
      e.target.value = e.target.value.replace(/[^0-9]+/g, '');
    }
  },
  destroyed() {
    this.CLEAR_ERRORS();
  }
};
</script>
