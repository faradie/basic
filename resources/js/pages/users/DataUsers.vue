<template>
  <div class="col-md-12">
    <div class="panel">
      <div class="panel-heading">
        <button class="btn btn-danger btn-sm btn-flat" v-if="users.data && users.data.length > 0" >Hapus Semua</button>
        <div class="pull-right">
          <input type="text" class="form-control" placeholder="Cari..." v-model="search" />
        </div>
      </div>

      <div class="panel-body">
        <div class="table-responsive">
          <b-table striped hover bordered :items="users.data" :fields="fields" show-empty>
            <template v-slot:cell(idNya)="row">
              <td class="parent-row">{{ row.item.id }}</td>
            </template>
            <template v-slot:cell(name)="row">
              <td class="parent-row">{{ row.item.name }}</td>
            </template>
            <template v-slot:cell(email)="row">
              <td class="parent-row">{{ row.item.email }}</td>
            </template>
            <template v-slot:cell(phone)="row">
              <td class="parent-row">{{ row.item.phone }}</td>
            </template>
            <template v-slot:cell(created)="row">
              <td class="parent-row">{{ row.item.created_at | moment("D MMMM YYYY") }}</td>
            </template>
            <template v-slot:cell(action)="row">
              <router-link :to="{ name: 'user.settings', params: { id:row.item.id } }" class="btn btn-warning btn-sm">
                <i class="fa fa-pencil"></i>
              </router-link>
              <button class="btn btn-danger btn-sm">
                <i class="fa fa-trash"></i>
              </button>
            </template>
          </b-table>

          <div class="row">
            <div class="col-md-6">
              <p v-if="users.data">
                <i class="fa fa-bars"></i>
                {{ users.data.length }} pengguna dari {{ users.meta.total }} total pengguna
              </p>
            </div>
            <div class="col-md-6">
              <div class="pull-right">
                <b-pagination
                  v-model="page"
                  :total-rows="users.meta.total"
                  :per-page="users.meta.per_page"
                  aria-controls="users"
                  v-if="users.data && users.data.length > 0"
                ></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "DataUsers",
  methods: {
    ...mapActions("users", ["getUsers"]),
  },
  created() {
    this.getUsers();
  },
  data() {
    return {
      fields: [
        { key: "idNya", label: "ID" },
        { key: "name", label: "Nama" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Telepon" },
        { key: "created", label: "Dibuat" },
        { key: "action", label: "Lanjutan" }
      ],
      search: ""
    };
  },
  computed: {
    ...mapState("users", {
      users: state => state.users
    }),
    page: {
      get() {
        return this.$store.state.users.page;
      },
      set(val) {
        this.$store.commit("users/SET_USERS_PAGE", val);
      }
    }
  },
  watch: {
    page() {
      this.getUsers();
    },
    search() {
      this.getUsers(this.search);
    }
  }
};
</script>

<style>
</style>